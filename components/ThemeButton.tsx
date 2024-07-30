import { useState, useEffect } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMode = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!mounted) return null;

  return (
    <button type="button" onClick={() => toggleMode()} className="icon_btn">
      {theme === "dark" ? <MdLightMode /> : <MdDarkMode />}
    </button>
  );
};

export default ThemeButton;