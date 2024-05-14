import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import NavLinkFragment from "./NavLink";
import ButtonSignOut from "../ui/ButtonSignOut";
import { sessionData } from "@/lib/actions/AuthAction";

async function Sidebar() {
    const data = await sessionData()
    return (
        <>
            <div className="hidden lg:flex flex-col col-span-1 justify-between bg-[#f3f6f4] dark:bg-[#212121] py-10 h-full rounded-3xl border-2 border-[#f9f9f914]">
                <div className="flex items-center justify-center gap-x-3">
                    <Image src={`/images/${data?.avatar ?? 'avatar.jpg' }`} height={100} width={100} priority={true} alt="avatarImage" className="rounded-full size-[50px] xl:size-[65px] 2xl:size-[80px] object-cover" />
                    <h1 className="text-base xl:text-2xl font-semibold w-min">{data?.email ? `${data.firstName} ${data.lastName}` : 'ToDo\nApp'}</h1>
                </div>
                <NavLinkFragment />
                <ButtonSignOut loggedIn={!!data?.email} />
            </div >
            <div className="flex lg:hidden justify-between col-span-6 w-full p-6 items-center">
                <h1 className="font-bold">TODO APP</h1>
                <Sheet>
                    <SheetTrigger>
                        <MdMenu size={30} />
                    </SheetTrigger>
                    <SheetContent>
                        <div className="h-full flex flex-col justify-between">
                            <div className="flex items-center gap-x-4 mt-8">
                                <h1 className="text-end font-medium text-xl line-clamp-2">{data?.name ?? 'Your\nName'}</h1>
                                <Image src="/images/avatar.jpg" alt="userImage" width={100} height={100} className="size-16 rounded-full object-cover" />
                            </div>
                            <NavLinkFragment small={true} />
                            <ButtonSignOut loggedIn={!!data?.email} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default Sidebar