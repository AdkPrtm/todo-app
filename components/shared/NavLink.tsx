'use client'

import { NavLink } from "@/constants/constants"
import { usePathname } from "next/navigation"
import ThemeSwitch from "./ThemeSwitcher";
import Link from "next/link";
import { MdOutlineBedtime } from "react-icons/md";

type NavLinkProps = {
    small?: boolean
}
function NavLinkFragment({ small }: Readonly<NavLinkProps>) {
    const pathname = usePathname()
    return (
        <div className="flex flex-col text-gray-400">
            {NavLink.map((item) => {
                const isActive = item.route === pathname
                return (
                    <Link key={item.route} href={item.route} className={style.textH2}>
                        <div className={`${style.navLink} ${small ? 'justify-end' : 'items-center'} ${isActive && style.activeNav}`}>
                            <div className={`flex ${small && 'flex-row-reverse'} gap-x-2`}>
                                <item.icons className={style.iconSize} />
                                {item.name}
                            </div>
                        </div>
                    </Link>
                )
            })}
            <div className={`flex ${small && 'flex-row-reverse'} items-center justify-between px-3 xl:px-6 py-3`}>
                <div className={style.theme}>
                    <MdOutlineBedtime className={style.iconSize} />
                    <h2 className={style.textH2}>Theme</h2>
                </div>
                <ThemeSwitch />
            </div>
        </div >
    )
}
const style = {
    navLink: `flex items-center gap-x-2 px-3 xl:px-6 py-3 hover:dark:text-white hover:text-blac hover:border-l-[3px] hover:border-[#27AE60] hover:bg-gray-300 hover:dark:bg-[#f9f9f914] hover:bg-gray-30 cursor-pointer transition duration-300 ease-in-out`,
    textH2: "text-sm xl:text-lg",
    iconSize: "size-6 2xl:size-8",
    activeNav: "text-black dark:text-white border-l-[3px] border-[#27AE60] bg-gray-300 dark:bg-[#f9f9f914]",
    theme: "flex items-center gap-x-2"
}
export default NavLinkFragment