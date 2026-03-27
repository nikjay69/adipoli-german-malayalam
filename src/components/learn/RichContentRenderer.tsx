
import React from 'react';
import type { RichElement } from '@/lib/content/types';
import { Info, Lightbulb, AlertTriangle, Table as TableIcon, List, Book } from 'lucide-react';

interface RichContentRendererProps {
  elements: RichElement[];
}

export function RichContentRenderer({ elements }: RichContentRendererProps) {
  if (!elements || elements.length === 0) return null;

  return (
    <div className="space-y-6 mt-6">
      {elements.map((el, i) => {
        switch (el.type) {
          case 'table':
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-[var(--card-border)] bg-[var(--foreground)]/5">
                {el.title && (
                  <div className="px-4 py-2 border-b border-[var(--card-border)] bg-[var(--foreground)]/5 font-semibold text-sm">
                    {el.title}
                  </div>
                )}
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-[var(--foreground)]/5 text-[var(--foreground)]/60">
                    <tr>
                      {el.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--card-border)]">
                    {el.rows.map((row, j) => (
                      <tr key={j} className="hover:bg-[var(--foreground)]/5 transition-colors">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 text-[var(--foreground)]/80">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case 'note':
            const icons = {
              info: <Info className="w-5 h-5 text-blue-400" />,
              tip: <Lightbulb className="w-5 h-5 text-amber-400" />,
              warning: <AlertTriangle className="w-5 h-5 text-red-400" />
            };
            const variants = {
              info: 'bg-blue-500/10 border-blue-500/20 text-blue-200',
              tip: 'bg-[#d4a520]/10 border-[#d4a520]/20 text-[#d4a520]',
              warning: 'bg-red-500/10 border-red-500/20 text-red-200'
            };
            return (
              <div key={i} className={`p-4 rounded-xl border ${variants[el.variant]} flex gap-3`}>
                <div className="mt-0.5">{icons[el.variant]}</div>
                <div>
                  {el.title && <div className="font-bold text-sm mb-1 uppercase tracking-wider">{el.title}</div>}
                  <p className="text-sm leading-relaxed">{el.content}</p>
                </div>
              </div>
            );

          case 'list':
            return (
              <div key={i} className="bg-[var(--foreground)]/5 rounded-xl p-4 border border-[var(--card-border)]">
                {el.title && <h3 className="font-bold text-sm mb-3 text-[var(--foreground)]/80 uppercase tracking-tight">{el.title}</h3>}
                <ul className="space-y-2">
                  {el.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-[var(--foreground)]/70">
                      <span className="text-[#e94560] font-bold">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case 'vocabulary':
            return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {el.items.map((v, j) => (
                  <div key={j} className="p-3 rounded-xl border border-[var(--card-border)] bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 transition-all flex justify-between items-center group">
                    <div>
                      <div className="font-bold text-[#e94560] text-lg">{v.german}</div>
                      <div className="text-xs text-[var(--foreground)]/40 italic">/{v.pronunciation}/</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-[var(--foreground)]/70">{v.english}</div>
                      <div className="text-xs text-[var(--foreground)]/50">{v.malayalam}</div>
                    </div>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
