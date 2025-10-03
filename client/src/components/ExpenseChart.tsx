import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const COLORS = {
  food: "hsl(25, 95%, 53%)",
  transport: "hsl(217, 91%, 60%)",
  utilities: "hsl(271, 81%, 56%)",
  entertainment: "hsl(330, 81%, 60%)",
  shopping: "hsl(142, 76%, 36%)",
  healthcare: "hsl(0, 84%, 60%)",
  other: "hsl(0, 0%, 60%)",
};

interface ExpenseChartProps {
  data: Array<{
    category: string;
    value: number;
  }>;
}

export default function ExpenseChart({ data }: ExpenseChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.category as keyof typeof COLORS] || COLORS.other} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
