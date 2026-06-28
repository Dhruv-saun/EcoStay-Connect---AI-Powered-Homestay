import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

export default function Home() {
return (
<main className="pt-32">

<Navbar />

<Hero />

{/* DESTINATIONS */}

<section
className="
max-w-[1400px]
mx-auto
px-10
mt-16
"
>

<div className="flex justify-between mb-10">

<div>

<h2 className="text-4xl font-black">
🌿 Popular Destinations
</h2>

<p className="text-gray-500 mt-2">
Explore the beauty of nature
</p>

</div>

<button
className="
text-green-600
font-bold
"
>
View All →
</button>

</div>


<div
className="
grid
grid-cols-5
gap-6
"
>

<Card
title="Manali"
location="32 Homestays"
price=""
image="/images/manali.jpg"
/>

<Card
title="Nainital"
location="28 Homestays"
price=""
image="/images/nainital.jpg"
/>

<Card
title="Rishikesh"
location="35 Homestays"
price=""
image="/images/forest.jpg"
/>

<Card
title="Munnar"
location="24 Homestays"
price=""
image="/images/munnar.jpg"
/>

<Card
title="Kasol"
location="18 Homestays"
price=""
image="/images/kasol.jpg"
/>

</div>

</section>



{/* FEATURES */}

<section
className="
max-w-[1400px]
mx-auto
mt-14
rounded-[35px]
bg-[#edf4e8]
p-10
grid
grid-cols-4
gap-10
"
>

<div>
<h3 className="text-2xl font-bold">
🌿 Eco Friendly
</h3>

<p className="mt-2">
Sustainable stays
</p>
</div>

<div>
<h3 className="text-2xl font-bold">
🛡 Trusted Stays
</h3>

<p className="mt-2">
Verified homestays
</p>
</div>

<div>
<h3 className="text-2xl font-bold">
👥 Local Experiences
</h3>

<p className="mt-2">
Travel with locals
</p>
</div>

<div>
<h3 className="text-2xl font-bold">
❤️ Communities
</h3>

<p className="mt-2">
Support local culture
</p>
</div>

</section>

<Footer />

</main>
);
}