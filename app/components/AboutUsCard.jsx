const AboutUsCard = ({ number, text, numberColor }) => {
  return (
    <main className="bg-swSecondary100 rounded-3xl py-2 px-4 md:py-7 md:px-10 text-swLightGray text-center">
      <p className={`${numberColor && numberColor} text-xl md:text-7xl font-medium mb-3 md:mb-5`}>
        {number}
      </p>
      <p className="font-light max-w-[8rem] text-xs md:text-sm">{text}</p>
    </main>
  );
};

export default AboutUsCard;
