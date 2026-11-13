'use client';

import { useEffect, useState } from 'react';
import { Check, Copy, Eye, EyeOff, KeyRound, AlertCircle, Terminal, ChevronDown } from 'lucide-react';
import { POST_FIELDS } from '../blog/post-schema';

function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : label}
    </button>
  );
}

const sq = (v) => `'${v.replace(/'/g, `'\\''`)}'`; // shell single-quote

export default function BlogApiPanel() {
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(undefined); // undefined = loading, null = not configured
  const [showKey, setShowKey] = useState(false);
  const [tab, setTab] = useState('minimal');
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    setOrigin(window.location.origin);
    fetch('/api/admin/blog-api')
      .then((r) => r.json())
      .then((d) => setKey(d.key ?? null))
      .catch(() => setKey(null));
  }, []);

  const realKey = key || 'YOUR_BLOG_API_KEY';
  const shownKey = key && !showKey ? `${key.slice(0, 4)}${'•'.repeat(16)}${key.slice(-4)}` : realKey;

  const minimal = { title: 'My First API Post', content: '## Hello\n\nThis post was published through the API.' };
  const full = {
    title: 'Getting Started with FastAPI',
    category: 'Tutorial',
    date: new Date().toISOString(),
    image: '/web-development.jpg',
    link: 'https://fastapi.tiangolo.com',
    linkText: 'FastAPI Docs',
    content: '## Install\n\n```bash\npip install fastapi uvicorn\n```\n\n## Watch the tutorial\n\nhttps://www.youtube.com/watch?v=tiBeLLv5GJo',
  };

  const post = (body, k) =>
    `curl -X POST ${origin}/api/blog \\\n  -H "Content-Type: application/json" \\\n  -H "x-api-key: ${k}" \\\n  -d ${sq(JSON.stringify(body))}`;

  const commands = {
    minimal: { label: 'Create (minimal)', body: minimal },
    full: { label: 'Create (all fields)', body: full },
    format: { label: 'Get format' },
  };
  const cmd = (k) => (tab === 'format' ? `curl ${origin}/api/blog/format` : post(commands[tab].body, k));

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Terminal className="w-4 h-4" /></div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Publish via API</h4>
            <p className="text-xs text-slate-500">Create posts from scripts, n8n, Zapier or any tool using your API key.</p>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-5 border-t border-slate-100 pt-5 text-sm">
          {/* Endpoints */}
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              ['GET', '/api/blog/format', 'Field rules, Markdown guide and an example', 'bg-emerald-50 text-emerald-700'],
              ['POST', '/api/blog', 'Create a post (needs x-api-key header)', 'bg-indigo-50 text-indigo-700'],
            ].map(([method, path, desc, color]) => (
              <div key={path} className="border border-slate-200 rounded-xl p-3.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${color}`}>{method}</span>
                  <code className="text-xs font-semibold text-slate-800 break-all">{origin}{path}</code>
                </div>
                <p className="text-xs text-slate-500 mt-1.5">{desc}</p>
              </div>
            ))}
          </div>

          {/* Key */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><KeyRound className="w-3.5 h-3.5" /> API key</label>
            {key === undefined ? (
              <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ) : key === null ? (
              <div className="flex gap-2 items-start p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>No key configured. Add <code className="font-bold">BLOG_API_KEY=some-long-random-string</code> to <code className="font-bold">.env</code> and restart the server. The API stays disabled until then.</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-slate-900 rounded-lg pl-3 pr-1.5 py-1.5">
                <code className="flex-1 text-xs text-slate-100 font-mono truncate">{shownKey}</code>
                <button type="button" onClick={() => setShowKey(!showKey)} title={showKey ? 'Hide key' : 'Show key'} className="p-1.5 text-slate-400 hover:text-white">
                  {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
                <CopyButton text={key} />
              </div>
            )}
            <p className="text-[11px] text-slate-400">Keep it secret. Anyone with this key can publish posts. To rotate it, change BLOG_API_KEY in .env and restart.</p>
          </div>

          {/* curl */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(commands).map(([k, c]) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${tab === k ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <div className="rounded-xl overflow-hidden bg-slate-900">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                <span className="text-[11px] font-mono text-slate-400">terminal</span>
                {/* copied command always contains the real key, even when it is masked on screen */}
                <CopyButton text={cmd(realKey)} label="Copy curl" />
              </div>
              <pre className="p-4 text-xs leading-relaxed text-slate-100 font-mono overflow-x-auto whitespace-pre">{cmd(shownKey)}</pre>
            </div>
          </div>

          {/* Fields */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr><th className="px-3 py-2">Field</th><th className="px-3 py-2">Required</th><th className="px-3 py-2">Details</th></tr>
              </thead>
              <tbody>
                {Object.entries(POST_FIELDS).map(([name, f]) => (
                  <tr key={name} className="border-t border-slate-100">
                    <td className="px-3 py-2 font-mono font-bold text-slate-800">{name}</td>
                    <td className="px-3 py-2">{f.required ? <span className="text-red-600 font-bold">Yes</span> : <span className="text-slate-400">No</span>}</td>
                    <td className="px-3 py-2 text-slate-600">
                      {f.description}
                      {f.max && <span className="text-slate-400"> · max {f.max} chars</span>}
                      {f.default && <span className="text-slate-400"> · default: {f.default}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-3 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800"><b>201</b> Created: returns the post and its live <code>url</code></div>
            <div className="p-3 rounded-lg bg-amber-50 text-amber-800"><b>400</b> Invalid data: <code>details</code> lists each problem</div>
            <div className="p-3 rounded-lg bg-red-50 text-red-800"><b>401</b> Missing or wrong <code>x-api-key</code></div>
          </div>
        </div>
      )}
    </div>
  );
}
