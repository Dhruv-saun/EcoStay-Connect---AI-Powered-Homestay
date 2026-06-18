"use client";
import {
createContext,
useContext,
useState,
} from "react";
const ThemeContext =
createContext<any>(null);
export function ThemeProvider({
children,
}: {
children: React.ReactNode;
}) {
const [
darkMode,
setDarkMode,
] = useState(false);
return (
<ThemeContext.Provider
value={{
darkMode,
setDarkMode,
}}
>
<div
className={
darkMode
? "dark bg-black text-white min-h-screen"
: "bg-white text-black min-h-screen"
}
>
{children}
</div>
</ThemeContext.Provider>
);
}
export function useTheme() {
return useContext(
ThemeContext
);
}