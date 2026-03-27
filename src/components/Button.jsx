import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  const baseStyles =
    "px-5 py-2.5 rounded-lg font-medium transition-all duration-200";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
    secondary:
      "bg-gray-100 text-gray-700 hover:bg-gray-200",
    outline:
      "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;