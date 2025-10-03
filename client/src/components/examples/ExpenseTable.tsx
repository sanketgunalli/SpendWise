import ExpenseTable from '../ExpenseTable';

export default function ExpenseTableExample() {
  const mockExpenses = [
    {
      id: "1",
      description: "Grocery shopping",
      amount: "125.50",
      category: "food" as const,
      date: new Date("2024-01-15"),
    },
    {
      id: "2",
      description: "Uber ride",
      amount: "18.75",
      category: "transport" as const,
      date: new Date("2024-01-14"),
    },
    {
      id: "3",
      description: "Electricity bill",
      amount: "89.00",
      category: "utilities" as const,
      date: new Date("2024-01-13"),
    },
  ];

  return (
    <div className="p-4">
      <ExpenseTable
        expenses={mockExpenses}
        onEdit={(expense) => console.log('Edit expense:', expense)}
        onDelete={(id) => console.log('Delete expense:', id)}
      />
    </div>
  );
}
