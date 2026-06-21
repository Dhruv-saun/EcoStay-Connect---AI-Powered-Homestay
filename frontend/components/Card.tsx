type CardProps = {
  title: string;
  location: string;
  price: string;
};
export default function Card({
  title,
  location,
  price,
}: CardProps) {
  return (
    <div
      className="
      rounded-xl
      shadow-xl
      border
      border-gray-300
      dark:border-gray-500
      bg-white
      dark:bg-neutral-900
      text-black
      dark:text-white
      p-6
      w-full
      transition
      "
    >
      <div
        className="
        h-40
        bg-green-200
        dark:bg-green-900
        rounded-lg
        mb-4
        border
        border-gray-300
        dark:border-gray-500
        "
      />
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
      <p className="mt-2">
        📍 {location}
      </p>
      <p
        className="
        font-semibold
        mt-2
        text-green-700
        dark:text-green-400
        "
      >
        {price}
      </p>
    </div>
  );
}