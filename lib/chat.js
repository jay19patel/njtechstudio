/**
 * Website AI chat client for the Django backend's public chat API (/api/ai/public).
 * Visitors don't log in; the chat id kept in localStorage is their key to the conversation.
 */
import { API_BASE_URL } from "./api";

const PUBLIC_API = `${API_BASE_URL}/api/ai/public`;
const THREAD_KEY = "nj_chat_thread";

async function call(path, options = {}) {
  let res;
  try {
    res = await fetch(`${PUBLIC_API}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw Object.assign(new Error("Can't reach the assistant. Check your connection and try again."), { status: 0 });
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message =
      res.status === 429
        ? "You're sending messages too quickly. Please wait a moment and try again."
        : data.message || "Something went wrong. Please try again.";
    throw Object.assign(new Error(message), { status: res.status });
  }
  return data;
}

export const savedThreadId = () => localStorage.getItem(THREAD_KEY);
export const forgetThread = () => localStorage.removeItem(THREAD_KEY);

export const getChatAgent = () => call("/agent");

export async function getOrCreateThread() {
  let id = savedThreadId();
  if (!id) {
    id = (await call("/threads", { method: "POST" })).thread_id;
    localStorage.setItem(THREAD_KEY, id);
  }
  return id;
}

/** Past messages, as the widget shows them. A failed reply comes back as an error bubble. */
export async function getHistory(threadId) {
  const { items } = await call(`/threads/${threadId}/messages?limit=100`);
  return items.flatMap((m) => {
    const msg = { id: `m${m.id}`, role: m.role, text: m.content };
    return m.run_status === "failed" ? [msg, { id: `e${m.id}`, role: "assistant", error: m.run_error }] : [msg];
  });
}

export const sendMessage = (threadId, content) =>
  call(`/threads/${threadId}/messages`, { method: "POST", body: JSON.stringify({ content }) });

/**
 * Follow one reply's Server-Sent Events. Returns close().
 * handlers: onText(fullText), onTool(name | null), onDone(finalText), onError(message)
 */
export function streamReply(streamUrl, { onText, onTool, onDone, onError }) {
  const source = new EventSource(new URL(streamUrl, API_BASE_URL).href);
  const data = (e) => {
    try { return JSON.parse(e.data); } catch { return {}; }
  };
  let text = "";
  let finished = false;
  const finish = () => { finished = true; source.close(); };

  source.addEventListener("token", (e) => { text += data(e).text || ""; onText(text); });
  source.addEventListener("tool_start", (e) => onTool(data(e).name));
  source.addEventListener("tool_end", () => { text = ""; onTool(null); }); // the answer restarts after a tool
  source.addEventListener("done", (e) => { finish(); onDone(data(e).content ?? text); });
  source.addEventListener("error", (e) => {
    if (finished) return;
    if (e.data) { finish(); onError(data(e).message || "The assistant failed to respond."); }
    else if (source.readyState === EventSource.CLOSED) { finish(); onError("Connection lost. Please try again."); }
    // Otherwise a network blip: the browser reconnects and resumes on its own.
  });
  return finish;
}
