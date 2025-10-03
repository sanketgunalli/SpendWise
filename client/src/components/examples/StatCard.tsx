import StatCard from '../StatCard';
import { Wallet, TrendingUp, Calendar, PieChart } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-4">
      <StatCard
        title="Total Expenses"
        value="$2,845.50"
        icon={Wallet}
        trend={{ value: "12%", isPositive: false }}
      />
      <StatCard
        title="This Month"
        value="$1,234.00"
        icon={Calendar}
        trend={{ value: "8%", isPositive: true }}
      />
      <StatCard
        title="Average/Day"
        value="$41.13"
        icon={TrendingUp}
      />
      <StatCard
        title="Categories"
        value="5"
        icon={PieChart}
      />
    </div>
  );
}
