import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import CategoryBadge from "./CategoryBadge";
import { format } from "date-fns";

interface Expense {
  id: string;
  description: string;
  amount: string;
  category: "food" | "transport" | "utilities" | "entertainment" | "shopping" | "healthcare" | "other";
  date: Date;
}

interface ExpenseTableProps {
  expenses: Expense[];
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
}

export default function ExpenseTable({ expenses, onEdit, onDelete }: ExpenseTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center" data-testid="empty-state-expenses">
        <p className="text-muted-foreground mb-2">No expenses yet</p>
        <p className="text-sm text-muted-foreground">Add your first expense to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} data-testid={`row-expense-${expense.id}`}>
              <TableCell className="text-muted-foreground">
                {format(expense.date, "MMM dd, yyyy")}
              </TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>
                <CategoryBadge category={expense.category} />
              </TableCell>
              <TableCell className="text-right font-mono font-bold">
                ${parseFloat(expense.amount).toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onEdit?.(expense)}
                    data-testid={`button-edit-${expense.id}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete?.(expense.id)}
                    data-testid={`button-delete-${expense.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
