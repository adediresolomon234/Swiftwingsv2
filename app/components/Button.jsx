const Button = ({ onClick, bgColor, textColor, label, startIcon, endIcon }) => {
  return (
    <button
      onClick={onClick}
      className={`${bgColor ? bgColor : "bg-white"} ${
        textColor ? textColor : "text-gray-400"
      } py-3 px-6 rounded-full flex items-center gap-2`}
    >
      <span>{startIcon}</span>
      <span>{label}</span>
      <span>{endIcon}</span>
    </button>
  );
};

export default Button;
