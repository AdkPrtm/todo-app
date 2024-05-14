'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeSwitch() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <button
            onClick={toggleTheme}
            className={`relative w-8 xl:w-16 h-4 xl:h-8 flex items-center cursor-pointer rounded-full p-1 ${resolvedTheme === "dark" ? "bg-teal-500" : "bg-gray-900"}`}>
            <FiMoon className="fill-white w-[15px] h-[15px]"></FiMoon>
            <div
                id="toggleBtnTheme"
                className={`bg-white absolute w-3 xl:w-6 h-3 xl:h-6 rounded-full shadow-custom shadow-md ${resolvedTheme === "dark"
                        ? " transition-transform translate-x-0"
                        : " transition-transform translate-x-3 xl:translate-x-6 2xl:translate-x-8"
                    }`}
            ></div>
            <FiSun className="fill-white ml-auto w-[15px] h-[15px]"></FiSun>
        </button>
    );
}