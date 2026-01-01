import { getCategoryColors } from '@/utils/category-colors';
import { twMerge } from 'tailwind-merge';

export default function CategoryPill({
  category,
  selected = false,
}: {
  category: string;
  selected?: boolean;
}) {
  const [base, active] = getCategoryColors(category);

  return (
    <span
      className={twMerge(
        'rounded-full px-3 py-1 text-xs font-medium',
        selected ? active : base
      )}
    >
      {category}
    </span>
  );
}
