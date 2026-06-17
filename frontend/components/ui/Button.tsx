/**
 * Button Component
 * Props:
 * label - Text displayed inside button
 */
type ButtonProps = {
  label: string;
};

export default function Button({
  label,
}: ButtonProps) {
  return (
    <button
      className="
      bg-green-700
      text-white
      px-5
      py-2
      rounded-lg
      "
    >
      {label}
    </button>
  );
}