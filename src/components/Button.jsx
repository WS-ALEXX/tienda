import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  fullWidth = false,
  ...rest
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${fullWidth ? "btn--full" : ""}`}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}
