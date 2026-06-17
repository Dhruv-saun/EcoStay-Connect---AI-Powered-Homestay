/**
 * Toast Component
 * Props:
 * message - Notification message displayed to user
 */
type ToastProps = {
  message: string;
};
export default function Toast({
  message,
}: ToastProps) {
  return (
    <div
      className="
      fixed
      top-6
      right-6
      bg-green-700
      text-white
      px-6
      py-3
      rounded-lg
      shadow-lg
      "
    >
      {message}
    </div>
  );
}