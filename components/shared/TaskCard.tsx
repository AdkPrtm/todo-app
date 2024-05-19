import { DataTaskParams } from "@/types/types"
import ButtonCardAction from "../ui/ButtonCardAction"
import { LocalTime } from "../ui/toLocalTime"

function TaskCard({ props }: Readonly<{ props: DataTaskParams }>) {
    return (
        <div key={props.id} className="flex flex-col h-[215px] gap-y-2 px-2 py-4 rounded-xl border-2 border-[#f9f9f914] bg-gray-300 dark:bg-[#f9f9f914]">
            <h2 className="text-lg xl:text-2xl w-full truncate font-semibold">{props.title}</h2>
            <div className="flex-grow">
                <p className="text-xs xl:text-sm line-clamp-3">{props.description}</p>
            </div>
            <LocalTime date={props.deadline}/>
            <ButtonCardAction props={props} />
        </div>
    )
}

export default TaskCard