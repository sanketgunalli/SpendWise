import CategoryBadge from '../CategoryBadge';

export default function CategoryBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2 p-4">
      <CategoryBadge category="food" />
      <CategoryBadge category="transport" />
      <CategoryBadge category="utilities" />
      <CategoryBadge category="entertainment" />
      <CategoryBadge category="shopping" />
      <CategoryBadge category="healthcare" />
      <CategoryBadge category="other" />
    </div>
  );
}
