"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  forgetThread,
  getChatAgent,
  getHistory,
  getOrCreateThread,
  savedThreadId,
  sendMessage,
  streamReply,
} from "@/lib/chat";

const TOOL_ACTIVITY = {
  list_services: "Checking our services",
  search_projects: "Looking through projects",
  search_blog_posts: "Searching articles",
  get_blog_post: "Reading the article",
  top_blog_posts: "Finding popular articles",
  search_faqs: "Checking FAQs",
  create_inquiry: "Submitting your inquiry",
};

let nextId = 0;
const uid = () => `l${Date.now()}-${nextId++}`;

/**
 * State for the website AI chat. Messages: { id, role: "user" | "assistant", text, error?, pending? }.
 * `activity` is what the assistant is doing right now ("Looking through projects…").
 */
export function useStudioChat() {
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [busy, setBusy] = useState(false);
  const [activity, setActivity] = useState(null);
  const loaded = useRef(false);
  const closeStream = useRef(null);

  useEffect(() => () => closeStream.current?.(), []);

  // Called when the chat first opens: agent info + the visitor's previous conversation.
  const load = useCallback(async () => {
    if (loaded.current) return;
    loaded.current = true;
    getChatAgent().then(setAgent).catch(() => {});
    const id = savedThreadId();
    if (!id) return;
    try {
      setMessages(await getHistory(id));
    } catch (err) {
      if (err.status === 404) forgetThread(); // conversation expired or was removed
    }
  }, []);

  const updateReply = (id, patch) => setMessages((list) => list.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const send = useCallback(async (raw) => {
    const content = raw.trim();
    if (!content || busy) return;
    const replyId = uid();
    setMessages((list) => [
      ...list,
      { id: uid(), role: "user", text: content },
      { id: replyId, role: "assistant", text: "", pending: true },
    ]);
    setBusy(true);

    const fail = (message) => {
      updateReply(replyId, { pending: false, error: message });
      setActivity(null);
      setBusy(false);
    };

    let run;
    try {
      try {
        run = await sendMessage(await getOrCreateThread(), content);
      } catch (err) {
        if (err.status !== 404) throw err;
        forgetThread(); // saved conversation no longer exists: start a fresh one
        run = await sendMessage(await getOrCreateThread(), content);
      }
    } catch (err) {
      return fail(err.message);
    }

    closeStream.current = streamReply(run.stream_url, {
      onText: (text) => updateReply(replyId, { text }),
      onTool: (name) => setActivity(name ? TOOL_ACTIVITY[name] || "Working on it" : null),
      onDone: (text) => {
        updateReply(replyId, { text, pending: false });
        setActivity(null);
        setBusy(false);
      },
      onError: fail,
    });
  }, [busy]);

  const reset = useCallback(() => {
    closeStream.current?.();
    forgetThread();
    setMessages([]);
    setActivity(null);
    setBusy(false);
  }, []);

  return { agent, messages, busy, activity, load, send, reset };
}
