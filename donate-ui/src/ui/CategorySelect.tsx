// components/filters/CategorySelect.tsx
import * as React from "react";

export type Category = { id: number; name: string; count?: number };

type Props = {
  options: Category[]; // [{id, name, count?}, ...]
  value: { id: number; name: string } | null; // seçili id (yoksa null)
  onChangeCategory: (id: { id: number; name: string } | null) => void;
  label?: string;
};

export function CategorySelect({
  options,
  value,
  onChangeCategory,
  label = "Category",
}: Props) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 pr-9 text-sm
                     shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
          value={value?.id ?? ""}
          onChange={(e) => {
            const v = e.target.value;

            if (v === "") return onChangeCategory(null);

            const selected = options.find((option) => option.id === Number(v));
            if (!selected) return onChangeCategory(null);

            onChangeCategory({ id: selected.id, name: selected.name });
          }}
        >
          <option value="">None</option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
          ▾
        </span>
      </div>
    </div>
  );
}
