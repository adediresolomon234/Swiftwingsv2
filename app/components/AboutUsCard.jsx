const AboutUsCard = ({ number, text, numberColor }) => {
  return (
    <main className="bg-swBgGray rounded-3xl py-7 px-10 text-swLightGray text-center">
      <p className={`${numberColor && numberColor} text-7xl font-medium mb-5`}>
        {number}
      </p>
      <p className="font-light max-w-[9rem]">{text}</p>
    </main>
  );
};

export default AboutUsCard;
