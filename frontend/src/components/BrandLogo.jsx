import primaryLogo from "../assets/Primary Logo.png";

function BrandLogo({ size = "md", className = "", rounded = true }) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const resolvedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <img
      src={primaryLogo}
      alt="HumDard AI logo"
      className={`${resolvedSize} ${rounded ? "rounded-2xl" : ""} object-cover ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
}

export default BrandLogo;
