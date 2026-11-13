'use client';

import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import {
  Heading2, Heading3, Bold, Code, SquareCode, Image as ImageIcon, Youtube,
  Smartphone, Link2, List, ListOrdered, Quote, Table, Eye, PenLine, Columns2
} from 'lucide-react';
import Markdown from '../blog/Markdown';
import { readingTime } from '../blog/posts-format';

// [label, icon, before, after, placeholder] - wraps the selection or inserts the placeholder
const TOOLS = [
  ['Heading', Heading2, '\n## ', '\n', 'Section heading'],
  ['Sub-heading', Heading3, '\n### ', '\n', 'Sub-heading'],
  ['Bold', Bold, '**', '**', 'bold text'],
  ['Inline code', Code, '`', '`', 'code'],
  ['Code block', SquareCode, '\n```python\n', '\n```\n', 'print("Hello")'],
  ['Image', ImageIcon, '\n![', '](/web-development.jpg)\n', 'Image caption'],
  ['YouTube video', Youtube, '\n\n', '\n\n', 'https://www.youtube.com/watch?v=VIDEO_ID'],
  ['YouTube Short', Smartphone, '\n\n', '\n\n', 'https://www.youtube.com/shorts/SHORT_ID'],
  ['Link', Link2, '[', '](https://)', 'link text'],
  ['Bullet list', List, '\n- ', '\n', 'List item'],
  ['Numbered list', ListOrdered, '\n1. ', '\n', 'First step'],
  ['Quote / tip', Quote, '\n> ', '\n', 'Tip or important note'],
  ['Table', Table, '\n| Column | Column |\n| --- | --- |\n| ', ' | Value |\n', 'Value'],
];

const toLocalInput = (date) =>
  new Date(new Date(date).getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

const inputCls = 'w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-800 rounded-lg outline-none';
const labelCls = 'text-xs font-bold text-slate-500 uppercase tracking-widest';

export default function BlogEditor({ item, categories }) {
  const [content, setContent] = useState(item?.content || '');
  const [image, setImage] = useState(item?.image || '');
  const [tab, setTab] = useState('write');
  const textareaRef = useRef(null);

  const insert = (before, after, placeholder) => {
    const el = textareaRef.current;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = content.slice(start, end) || placeholder;
    setContent(content.slice(0, start) + before + selected + after + content.slice(end));
    // select the inserted text so it can be typed over
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  // Grow the textarea with its content so only the page scrolls, never the editor
  const autoSize = () => {
    const el = textareaRef.current;
    if (!el || el.offsetParent === null) return; // hidden in preview mode
    const scrollY = window.scrollY; // collapsing to 'auto' briefly shortens the page; keep the reader's place
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
    window.scrollTo(0, scrollY);
  };
  useLayoutEffect(autoSize, [content, tab]);
  useEffect(() => {
    window.addEventListener('resize', autoSize);
    return () => window.removeEventListener('resize', autoSize);
  }, []);

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const showWrite = tab !== 'preview';
  const showPreview = tab !== 'write';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6 text-sm items-start">
      {/* Main column: title + editor */}
      <div className="space-y-5 min-w-0">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
          <label className={labelCls}>Title</label>
          <input name="title" type="text" maxLength={200} defaultValue={item?.title || ''} placeholder="e.g. How we built a trading bot with Celery" className="w-full mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 placeholder:text-slate-300 outline-none" required />
        </div>

        {/* no overflow-hidden here: it would stop the toolbar from sticking while the page scrolls */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs">
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-slate-50/95 backdrop-blur border-b border-slate-200 rounded-t-2xl">
            <div className="flex flex-wrap gap-0.5">
              {TOOLS.map(([label, Icon, before, after, placeholder]) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  disabled={!showWrite}
                  onClick={() => insert(before, after, placeholder)}
                  className="p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-white disabled:opacity-30 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-[11px] text-slate-400 font-semibold hidden sm:inline">{words} words · {readingTime(content)} min read</span>
              <div className="flex bg-white border border-slate-200 rounded-lg p-0.5">
                {[['write', PenLine, 'Write'], ['split', Columns2, 'Split'], ['preview', Eye, 'Preview']].map(([key, Icon, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-colors ${key === 'split' ? 'hidden lg:flex' : ''} ${tab === key ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    <Icon className="w-3.5 h-3.5" /> {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={tab === 'split' ? 'grid lg:grid-cols-2 divide-x divide-slate-200' : ''}>
            {/* textarea stays mounted (hidden in preview) so FormData always includes content */}
            <textarea
              ref={textareaRef}
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInvalid={() => setTab('write')}
              required
              placeholder={'Start writing...\n\n## Introduction\n\nUse the toolbar for code blocks, images and YouTube videos.'}
              className={`block w-full min-h-[60vh] min-w-0 px-5 py-4 font-mono text-[13.5px] leading-relaxed text-slate-800 bg-transparent outline-none resize-none overflow-hidden rounded-b-2xl ${showWrite ? '' : 'hidden'}`}
            />
            {showPreview && (
              <div className="min-w-0 px-6 sm:px-8 py-4 min-h-[60vh] text-[16px] leading-[1.8] text-zinc-700 bg-[#fcfcfd] rounded-b-2xl">
                {content.trim() ? <Markdown>{content}</Markdown> : <p className="text-slate-400 py-10 text-center">Nothing to preview yet.</p>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar: post settings */}
      <aside className="space-y-5 xl:sticky xl:top-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <h4 className="font-bold text-slate-900">Post settings</h4>
          <div className="space-y-1">
            <label className={labelCls}>Category</label>
            <input name="category" type="text" list="blog-categories" maxLength={50} defaultValue={item?.category || 'Tutorial'} className={inputCls} required />
            <datalist id="blog-categories">
              {[...new Set([...categories, 'Tutorial', 'Case Study', 'Tech Update', 'Announcement'])].map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>
          <div className="space-y-1">
            <label className={labelCls}>Publish date</label>
            <input name="date" type="datetime-local" defaultValue={toLocalInput(item?.date || Date.now())} className={inputCls} required />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-xs">
          <h4 className="font-bold text-slate-900">Cover image</h4>
          <div className="aspect-[16/10] rounded-xl border border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center">
            {image ? <img src={image} alt="Cover preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-8 h-8 text-slate-300" />}
          </div>
          <input name="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="/web-development.jpg or https://..." className={inputCls} />
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-xs">
          <div>
            <h4 className="font-bold text-slate-900">Call-to-action button</h4>
            <p className="text-xs text-slate-500 mt-0.5">Shown at the end of the article. Optional.</p>
          </div>
          <div className="space-y-1">
            <label className={labelCls}>Link</label>
            <input name="link" type="url" defaultValue={item?.link || ''} placeholder="https://github.com/..." className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className={labelCls}>Button text</label>
            <input name="linkText" type="text" maxLength={50} defaultValue={item?.linkText || 'Read More'} className={inputCls} />
          </div>
        </div>
      </aside>
    </div>
  );
}
