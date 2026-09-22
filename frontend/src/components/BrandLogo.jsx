import { useTheme } from "../contexts/ThemeContext";

function BrandLogo({ size = "md", className = "", rounded = true }) {
  const { darkMode } = useTheme();
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  const resolvedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <img
      src="/favicon.svg"
      alt="HumDard AI logo"
      className={`${resolvedSize} w-auto object-contain brand-logo ${rounded ? "rounded-xl" : ""} ${darkMode ? "brand-logo-dark" : "brand-logo-light"} ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
}

export default BrandLogo;
