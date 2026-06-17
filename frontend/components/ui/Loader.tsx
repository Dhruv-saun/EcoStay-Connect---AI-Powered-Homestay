/**
 * Loader Component
 * Displays a loading spinner
 */
export default function Loader() {
  return (
    <div
      className="
      flex
      justify-center
      items-center
      "
    >
      <div
        className="
        w-12
        h-12
        border-4
        border-green-700
        border-t-transparent
        rounded-full
        animate-spin
        "
      />
    </div>
  );
}