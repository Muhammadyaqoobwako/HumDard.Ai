import primaryLogo from "../assets/Primary Logo.png";

function BrandLogo({ size = "md", className = "", rounded = true }) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  const resolvedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <img
      src={primaryLogo}
      alt="HumDard AI logo"
      className={`${resolvedSize} w-auto object-contain ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
}

export default BrandLogo;
