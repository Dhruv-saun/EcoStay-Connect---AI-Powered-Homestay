import Image from "next/image";

export default function Card({
    title,
    location,
    price,
    image,
    }: any) {

    return (

  <div
    className="
    bg-white
    rounded-3xl
    overflow-hidden
    shadow-md
    hover:shadow-xl
    duration-300
    "
  >

  <div
    className="
    relative
    w-full
    h-[220px]
    "
  >

  <Image
    src={image}
    alt={title}
    fill
    className="
    object-cover
    "
  />

  </div>


  <div className="p-5">

  <h3
    className="
    text-2xl
    font-bold
    text-black
    "
  >
    {title}
  </h3>

  <p
    className="
    mt-2
    text-gray-600
    "
  >
    {location}
  </p>

  {price && (

  <p
    className="
    mt-3
    text-green-700
    font-semibold
    "
  >
    {price}
  </p>

  )}

  </div>

</div>

);

}