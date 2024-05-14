"use client"
import React from 'react'
import { Button } from "../ui/button";
import { SignOutServer } from "@/lib/actions/AuthAction";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation'

type ButtonProps = {
    loggedIn: boolean
}
function ButtonSignOut(props: Readonly<ButtonProps>) {
    const router = useRouter()
    const handleClick = async () => {
        if (props.loggedIn) {
            await SignOutServer()
        } else {
            router.push("/signin")
        }
    };
    return (
        <Button className={style.signout} onClick={handleClick}>
            {
                props.loggedIn ?
                    <FaSignOutAlt className={style.iconSize} />
                    :
                    <FaSignInAlt className={style.iconSize} />
            }
            <h2 className={style.textH2}>{props.loggedIn ? 'Sign Out' : 'Sign In'}</h2>
        </Button>
    )
}

const style = {
    signout: "flex items-center justify-center bg-transparent hover:bg-transparent gap-2 text-gray-400 hover:text-black hover:dark:text-white cursor-pointer transition duration-300 ease-in-out",
    textH2: "text-sm xl:text-lg",
    iconSize: "size-6 2xl:size-8",
}

export default ButtonSignOut