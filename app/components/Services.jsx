import Image from "next/image";

const Services = ({ name, text, image }) => {
  return (
    <main className="flex flex-col justify-center items-center w-full">
      <p className="py-1 px-4 rounded-full border text-lg font-semibold shadow">
        {name}
      </p>
      <p className="mt-10 max-w-2xl font-light">{text}</p>
      <div className="rounded-2xl relative mt-10">
        <Image src={image} alt="services" />
      </div>
    </main>
  );
};

export default Services;
