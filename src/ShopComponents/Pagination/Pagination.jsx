// src/ShopComponents/Pagination/Pagination.jsx
export default function Pagination({ pagination, onPageChange }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        disabled={!pagination.prev}
        onClick={() => onPageChange(pagination.prev)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Prev
      </button>

      <span>Page {pagination.current}</span>

      <button
        disabled={!pagination.next}
        onClick={() => onPageChange(pagination.next)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
