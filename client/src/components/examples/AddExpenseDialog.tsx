import AddExpenseDialog from '../AddExpenseDialog';

export default function AddExpenseDialogExample() {
  return (
    <div className="p-4">
      <AddExpenseDialog
        onSubmit={(expense) => console.log('New expense:', expense)}
      />
    </div>
  );
}
