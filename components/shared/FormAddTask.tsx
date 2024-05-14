"use client"

import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { addDays, format, subDays } from "date-fns";
import { useForm } from "react-hook-form"
import { addTaskSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { useRef, useState, useTransition } from "react";
import { addTaskByUser } from "@/lib/db/actions/task.actions";
import { AddTaskParams } from "@/types/types";
import ButtonSubmit from "../ui/ButtonSubmit";

function FormAddTask(props: Readonly<{ userId: string }>) {
    const { userId } = props;
    const [isPending, setTransition] = useTransition()
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const form = useForm<z.infer<typeof addTaskSchema>>({
        resolver: zodResolver(addTaskSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    function onSubmit(values: z.infer<typeof addTaskSchema>): void {
        const data: AddTaskParams = { ...values, userId }
        setTransition(async () => {
            const { error } = await addTaskByUser(data)
            if (error) return setErrorMessage(error)
            setErrorMessage(undefined)
            form.reset()
            if (closeButtonRef.current) {
                closeButtonRef.current.click();
            }
        })
    }
    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Task Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Learn NextJs" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descritin about task</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Describe about your task"
                                        className="resize-y"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="deadline"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-y-2 w-full">
                                <FormLabel>Deadline of task</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-slate-950" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date: Date) =>
                                                date > addDays(new Date, 14) || date < subDays(new Date(), 2)
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="important"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>
                                    Important Task!
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="completed"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>
                                    Completed Task!
                                </FormLabel>
                            </FormItem>
                        )}
                    />
                    {
                        errorMessage && (
                            <FormItem>
                                <FormMessage>
                                    <div className="mt-2 bg-red-500/70 text-xs text-white rounded-lg p-4" role="alert">
                                        <span className="font-bold">Error</span> {errorMessage}
                                    </div>
                                </FormMessage>
                            </FormItem>
                        )
                    }
                    <DialogFooter className="flex flex-row justify-end">
                        <DialogClose asChild>
                            <Button ref={closeButtonRef} type="button" variant="ghost">
                                Close
                            </Button>
                        </DialogClose>
                        <ButtonSubmit isPending={isPending} title="Add Task" width="w-1/3" />
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    )
}

export default FormAddTask