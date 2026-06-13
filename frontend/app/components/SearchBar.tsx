export default function SearchBar() {
  return (
    <section className="p-10">
      <div
        className="
        max-w-4xl
        mx-auto
        flex
        gap-4
        "
      >
        <input
          type="text"
          placeholder="Search destination..."
          className="
          flex-1
          border
          rounded-lg
          p-4
          "
        />
        <button
          className="
          bg-green-700
          text-white
          px-8
          rounded-lg
          "
        >
        Coming Soon
        </button>
      </div>
    </section>
  );
}