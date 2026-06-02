"use client";

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface CrudTableProps<T extends { id: string }> {
  items: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
}

export default function CrudTable<T extends { id: string }>({
  items,
  columns,
  onEdit,
  onDelete,
}: CrudTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-gray-100 bg-light-gray">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-4 py-3 font-medium text-navy">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3 font-medium text-navy">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                  {col.render
                    ? col.render(item)
                    : String((item as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="text-sm text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Delete this item?")) onDelete(item.id);
                    }}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && (
        <p className="p-8 text-center text-sm text-gray-500">No items yet. Add one above.</p>
      )}
    </div>
  );
}
