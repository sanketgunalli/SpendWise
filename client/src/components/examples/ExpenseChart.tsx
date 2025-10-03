import ExpenseChart from '../ExpenseChart';

export default function ExpenseChartExample() {
  const mockData = [
    { category: "food", value: 450 },
    { category: "transport", value: 280 },
    { category: "utilities", value: 180 },
    { category: "entertainment", value: 120 },
    { category: "shopping", value: 95 },
  ];

  return (
    <div className="p-4">
      <ExpenseChart data={mockData} />
    </div>
  );
}
