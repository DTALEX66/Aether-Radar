'use client';

import { useEffect, useState } from 'react';
import type { Entity } from '../lib/data';

const STORAGE_KEY = 'aether-radar-tool-stack';

function readStack(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function writeStack(ids: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
  window.dispatchEvent(new CustomEvent('aether-stack-updated'));
}

export function AddToStackButton({ entity, compact = false }: { entity: Entity; compact?: boolean }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const update = () => setSelected(readStack().includes(entity.id));
    update();
    window.addEventListener('storage', update);
    window.addEventListener('aether-stack-updated', update);
    return () => {
      window.removeEventListener('storage', update);
      window.removeEventListener('aether-stack-updated', update);
    };
  }, [entity.id]);

  const toggle = () => {
    const stack = readStack();
    if (stack.includes(entity.id)) {
      writeStack(stack.filter((id) => id !== entity.id));
      setSelected(false);
      return;
    }
    writeStack([...stack, entity.id]);
    setSelected(true);
  };

  return (
    <button
      className={compact
        ? 'rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-blue-300'
        : 'rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800'}
      onClick={toggle}
      type="button"
      aria-pressed={selected}
    >
      {selected ? '已加入工具栈' : '加入工具栈'}
    </button>
  );
}
