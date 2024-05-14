import { FaPlus } from "react-icons/fa6"
import TaskCard from "./TaskCard"
import { EnumTaskComponent, DataTaskParams } from "@/types/types"
import { Dialog, DialogTrigger, } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import FormAddTask from "./FormAddTask"
import { sessionData } from "@/lib/actions/AuthAction"

async function TaskComponent({ typeTask, dataTask }: Readonly<{ typeTask: EnumTaskComponent, dataTask: DataTaskParams[] | undefined }>) {
    const data = await sessionData()
    return (
        <div className={style.entireBackgroundTask}>
            <div className={style.sideTask}>
                {/* <div className="flex justify-between"> */}
                    <h1 className="text-lg xl:text-5xl font-semibold relative pb-4">{typeTask}
                        <div className="absolute bottom-0 left-0 w-20 h-1 rounded-md bg-green-500"></div>
                    </h1>
                    {/* <FaSquarePlus className="cursor-pointer size-6 2xl:size-8" /> */}
                {/* </div> */}
                <div className={style.listOfTask}>
                    {dataTask!.map((todo) => {
                        return (
                            <TaskCard key={todo.id} props={todo} />
                        )
                    })}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className={style.addNewTask}>
                                <FaPlus />
                                <h2>Add new task</h2>
                            </Button>
                        </DialogTrigger>
                        <FormAddTask userId={data?.id ?? ''} />
                    </Dialog>
                </div>
            </div>
        </div >
    )
}

const style = {
    entireBackgroundTask: "col-span-6 lg:col-span-5 max-lg:h-[calc(100vh-24px)] overflow-hidden",
    sideTask: "flex flex-col col-span-1 bg-[#f3f6f4] dark:bg-[#212121] p-10 h-full rounded-3xl border-2 border-[#f9f9f914]",
    listOfTask: "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 py-8 overflow-y-auto no-scrollbar",
    addNewTask: "flex flex-col md:flex-row justify-center items-center h-[215px] font-semibold text-md text-black dark:text-white gap-y-2 md:gap-y-0 md:gap-x-2 px-2 py-4 rounded-xl border-2 cursor-pointer border-[#f9f9f914] bg-gray-300 hover:bg-gray-400 dark:bg-[#f9f9f914] hover:dark:bg-[#f9f9f923]",
}

export default TaskComponent