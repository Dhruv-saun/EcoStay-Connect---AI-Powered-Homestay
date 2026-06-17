/**
 * Modal Component
 * Props:
 * title - Heading displayed in modal
 */
type ModalProps = {
  title: string;
};
export default function Modal({
  title,
}: ModalProps) {
  return (
    <div
      className="
      relative
      flex
      items-center
      justify-center
      "
    >
      <div
        className="
        bg-white
        border
        rounded-xl
        p-8
        w-[450px]
        "
      >
        <h2
          className="
          text-2xl
          font-bold
          "
        >
          {title}
        </h2>
        <p className="mt-4">
          Modal Content
        </p>
        <button
          className="
          mt-6
          bg-green-700
          text-white
          px-5
          py-2
          rounded-lg
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}