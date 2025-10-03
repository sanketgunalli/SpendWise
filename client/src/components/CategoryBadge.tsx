import { Badge } from "@/components/ui/badge";
import { Utensils, Car, Zap, Gamepad2, ShoppingBag, Heart, MoreHorizontal } from "lucide-react";

const categoryConfig = {
  food: { icon: Utensils, color: "bg-[hsl(25,95%,53%)]", label: "Food" },
  transport: { icon: Car, color: "bg-[hsl(217,91%,60%)]", label: "Transport" },
  utilities: { icon: Zap, color: "bg-[hsl(271,81%,56%)]", label: "Utilities" },
  entertainment: { icon: Gamepad2, color: "bg-[hsl(330,81%,60%)]", label: "Entertainment" },
  shopping: { icon: ShoppingBag, color: "bg-[hsl(142,76%,36%)]", label: "Shopping" },
  healthcare: { icon: Heart, color: "bg-[hsl(0,84%,60%)]", label: "Healthcare" },
  other: { icon: MoreHorizontal, color: "bg-muted", label: "Other" },
};

interface CategoryBadgeProps {
  category: keyof typeof categoryConfig;
  showIcon?: boolean;
}

export default function CategoryBadge({ category, showIcon = true }: CategoryBadgeProps) {
  const config = categoryConfig[category] || categoryConfig.other;
  const Icon = config.icon;

  return (
    <Badge 
      className={`${config.color} text-white border-none gap-1.5 font-medium`}
      data-testid={`badge-category-${category}`}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      <span>{config.label}</span>
    </Badge>
  );
}
