"use client"

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormAddTask from "@/components/shared/FormAddTask";

import { MdDelete, MdEditDocument } from "react-icons/md"
import { deleteTaskById, updateTaskCompleted } from "@/lib/db/actions/task.actions"
import { DataTaskParams } from "@/types/types"
import { useRef } from "react"
import { useRouter } from "next/navigation"

function ButtonCardAction({ props }: Readonly<{ props: DataTaskParams }>) {
    const router = useRouter();
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const handleDelete = async () => {
        const deleteTaskRes = await deleteTaskById(props.id)
        if (deleteTaskRes.error) {
            toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
                variant: "destructive",
              })
        } else {
            console.log(deleteTaskRes.success?.data.res)
            router.refresh()
            if (closeButtonRef.current) {
                closeButtonRef.current.click();
            }
        }
    }

    const handleStatusTask = async () => {
        const dataStatus = !props.completed
        const resStatus = await updateTaskCompleted(props.id, dataStatus)
        if (resStatus.error) {
            console.log(resStatus.error)
        } else {
            console.log(resStatus.success?.data)
            router.refresh()
        }
    }

    return (
        <div className="flex items-center justify-between">
            <Button onClick={handleStatusTask}
                variant={"default"}
                className={`${props.completed ? 'bg-green-500 hover:bg-green-700' : 'bg-destructive hover:bg-destructive/70'} ${style.button}`} >
                {props.completed ? 'Completed' : 'Incompleted'}
            </Button>
            <div className="flex md:gap-x-2 text-gray-500 dark:text-gray-400">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="p-0 md:p-2">
                            <MdEditDocument className={style.iconSize} />
                        </Button>
                    </DialogTrigger>
                    <FormAddTask type="Update" taskId={props.id} task={props} />
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="p-0 md:p-2">
                            <MdDelete className={style.iconSize} />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] w-4/5 rounded-lg">
                        <DialogHeader className="text-start">
                            <DialogTitle>Delete Task</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete this task?
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="flex flex-row justify-end gap-x-2">
                            <DialogClose>
                                <Button ref={closeButtonRef} type="button" variant="ghost">Close</Button>
                            </DialogClose>
                            <Button onClick={handleDelete} variant={"destructive"} className="p-2">Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

const style = {
    iconSize: "cursor-pointer size-4 md:size-6 2xl:size-8",
    button: "text-white text-xs md:text-sm rounded-full px-2 md:px-4 h-6 md:h-8 xl:h-10"
}

export default ButtonCardAction