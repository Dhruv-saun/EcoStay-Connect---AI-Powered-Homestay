/**
 * Input Component
 * Props:
 * placeholder - Placeholder text shown inside input field
 */
type InputProps = {
  placeholder: string;
};

export default function Input({
  placeholder,
}: InputProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="
      border
      rounded-lg
      px-4
      py-3
      w-full
      "
    />
  );
}