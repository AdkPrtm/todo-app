import { DataTaskParams } from "@/types/types"
import { MdDelete, MdEditDocument } from "react-icons/md"
import { formattedDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function TaskCard({ props }: Readonly<{ props: DataTaskParams }>) {
    return (
        <div key={props.id} className="flex flex-col h-[215px] gap-y-2 px-2 py-4 rounded-xl border-2 border-[#f9f9f914] bg-gray-300 dark:bg-[#f9f9f914]">
            <h2 className="text-lg xl:text-2xl font-semibold">{props.title}</h2>
            <p className="text-xs xl:text-sm text-black/80 dark:text-white/80 line-clamp-3 h-full">{props.description}</p>
            <p className="text-xs xl:text-sm">{formattedDate(props.deadline)}</p>
            <div className="flex items-center justify-between">
                <Button variant={"default"} className={`${props.completed ? 'bg-green-500 hover:bg-green-700' : 'bg-destructive hover:bg-destructive/70'} ${style.button}`} >{props.completed ? 'Completed' : 'Incompleted'}</Button>
                <div className="flex md:gap-x-2 text-gray-500 dark:text-gray-400">
                    <MdEditDocument className={style.iconSize} />
                    <MdDelete className={style.iconSize} />
                </div>
            </div>
        </div>
    )
}

const style = {
    iconSize: "cursor-pointer size-4 md:size-6 2xl:size-8",
    button: "text-white text-xs md:text-sm rounded-full px-2 md:px-4 h-6 md:h-8 xl:h-10"
}
export default TaskCard