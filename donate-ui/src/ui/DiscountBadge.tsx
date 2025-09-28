import { Tag } from "lucide-react";

type DiscountBadgeProps = {
  discount: number;
  normalPrice: number;
};

export function DiscountBadge({ discount, normalPrice }: DiscountBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-amber-500 px-2.5 py-1 
                  text-xs font-semibold text-white shadow`}
    >
      <Tag className="h-3.5 w-3.5" aria-hidden />
      <span>
        {discount !== 0
          ? `${(normalPrice - discount).toFixed(2)}₺ Save`
          : "Free"}
      </span>
    </span>
  );
}
