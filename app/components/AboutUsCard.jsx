const AboutUsCard = ({ number, text, numberColor }) => {
  return (
    <main className="bg-swSecondary200 rounded-3xl py-2 px-4 md:py-7 md:px-10 text-swLightGray text-center">
      <p
        className={`${
          numberColor && numberColor
        } text-xl md:text-7xl font-medium mb-3 md:mb-5`}
      >
        {number}
      </p>
      <div className="font-light max-w-[8rem] text-xs md:text-sm">{text}</div>
    </main>
  );
};

export default AboutUsCard;
