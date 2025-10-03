import { useState } from "react";
import { Wallet, Calendar, TrendingUp, PieChart } from "lucide-react";
import StatCard from "@/components/StatCard";
import ExpenseTable from "@/components/ExpenseTable";
import ExpenseChart from "@/components/ExpenseChart";
import AddExpenseDialog from "@/components/AddExpenseDialog";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

// TODO: Remove mock functionality - replace with real data from API
const mockExpenses = [
  {
    id: "1",
    description: "Grocery shopping at Whole Foods",
    amount: "125.50",
    category: "food" as const,
    date: new Date("2024-01-15"),
  },
  {
    id: "2",
    description: "Uber ride to downtown",
    amount: "18.75",
    category: "transport" as const,
    date: new Date("2024-01-14"),
  },
  {
    id: "3",
    description: "Monthly electricity bill",
    amount: "89.00",
    category: "utilities" as const,
    date: new Date("2024-01-13"),
  },
  {
    id: "4",
    description: "Movie tickets",
    amount: "32.00",
    category: "entertainment" as const,
    date: new Date("2024-01-12"),
  },
  {
    id: "5",
    description: "New running shoes",
    amount: "95.00",
    category: "shopping" as const,
    date: new Date("2024-01-10"),
  },
];

const mockChartData = [
  { category: "food", value: 450 },
  { category: "transport", value: 280 },
  { category: "utilities", value: 180 },
  { category: "entertainment", value: 120 },
  { category: "shopping", value: 195 },
];

export default function Dashboard() {
  const [expenses, setExpenses] = useState(mockExpenses);

  const handleAddExpense = (expense: { amount: string; category: string; description: string; date: string }) => {
    const newExpense = {
      id: Date.now().toString(),
      description: expense.description,
      amount: expense.amount,
      category: expense.category as any,
      date: new Date(expense.date),
    };
    setExpenses([newExpense, ...expenses]);
    console.log("Added expense:", newExpense);
  };

  const handleEditExpense = (expense: any) => {
    console.log("Edit expense:", expense);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
    console.log("Deleted expense:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold" data-testid="text-app-title">Expense Tracker</h1>
          </div>
          <div className="flex items-center gap-2">
            <AddExpenseDialog onSubmit={handleAddExpense} />
            <ThemeToggle />
            <Button variant="ghost" data-testid="button-logout">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-muted-foreground">Track and manage your expenses</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Expenses"
              value="$1,225.25"
              icon={Wallet}
              trend={{ value: "12%", isPositive: false }}
            />
            <StatCard
              title="This Month"
              value="$1,225.25"
              icon={Calendar}
              trend={{ value: "8%", isPositive: true }}
            />
            <StatCard
              title="Average/Day"
              value="$40.84"
              icon={TrendingUp}
            />
            <StatCard
              title="Categories"
              value="5"
              icon={PieChart}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ExpenseChart data={mockChartData} />
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
              <ExpenseTable
                expenses={expenses}
                onEdit={handleEditExpense}
                onDelete={handleDeleteExpense}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
