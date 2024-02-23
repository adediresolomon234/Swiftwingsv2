const Button = ({
  onClick,
  bgColor,
  textColor,
  label,
  startIcon,
  endIcon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${bgColor ? bgColor : "bg-white"} ${
        textColor ? textColor : "text-gray-400"
      } py-3 px-6 rounded-full flex justify-center items-center gap-2`}
    >
      <span>{startIcon}</span>
      <span className="text-center">{label}</span>
      <span>{endIcon}</span>
    </button>
  );
};

export default Button;
