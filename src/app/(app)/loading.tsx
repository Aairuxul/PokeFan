export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex items-center gap-3 text-gray-500">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        Chargement…
      </div>
    </div>
  );
}
