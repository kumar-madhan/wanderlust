const CATEGORY_COLORS: Record<string, [string, string]> = {
  Nature: ['bg-green-100 text-green-800', 'bg-green-600 text-white'],
  Travel: ['bg-blue-100 text-blue-800', 'bg-blue-600 text-white'],
  Adventure: ['bg-orange-100 text-orange-800', 'bg-orange-600 text-white'],
  Featured: ['bg-purple-100 text-purple-800', 'bg-purple-600 text-white'],
};

export const categories = Object.keys(CATEGORY_COLORS);

export function getCategoryColors(category: string): [string, string] {
  return (
    CATEGORY_COLORS[category] ?? [
      'bg-gray-100 text-gray-800',
      'bg-gray-600 text-white',
    ]
  );
}
