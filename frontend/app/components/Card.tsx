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
      shadow-lg
      p-6
      w-full
      "
    >
      <div
        className="
        h-40
        bg-green-200
        rounded-lg
        mb-4
        "
      />
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
      <p>
        📍 {location}
      </p>
      <p className="font-semibold">
        {price}
      </p>
    </div>
  );
}