"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { getTaskByUser } from "@/lib/db/actions/task.actions";
import { DataTaskParams } from "@/types/types";

interface GlobalState {
    tasksData: DataTaskParams[] | undefined;
    completedTasks: DataTaskParams[];
    importantTasks: DataTaskParams[];
    incompleteTasks: DataTaskParams[];
    isLoading: boolean;
    errorMessage: string | undefined;
}

const defaultGlobalState: GlobalState = {
    tasksData: undefined,
    completedTasks: [],
    importantTasks: [],
    incompleteTasks: [],
    isLoading: false,
    errorMessage: '',
};

export const GlobalContext = createContext(defaultGlobalState);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const session = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [tasksData, setTasksData] = useState<DataTaskParams[] | undefined>([])
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    
    const allTask = async () => {
        setIsLoading(true);
        let res
        try {
            res = await getTaskByUser()
            const result: DataTaskParams[] | undefined = res.success?.data.res
            setTasksData(result)
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(res?.error)
        }
    }

    const completedTasks = tasksData!.filter((task) => task.completed === true);
    const importantTasks = tasksData!.filter((task) => task.important === true);
    const incompleteTasks = tasksData!.filter((task) => task.completed === false);

    useEffect(() => {
        if (session.data?.user.id) allTask()
    }, [session.data?.user.id])

    const contextValue: GlobalState = useMemo(() => ({
        tasksData,
        completedTasks,
        importantTasks,
        incompleteTasks,
        isLoading,
        errorMessage,
    }), [tasksData, completedTasks, importantTasks, incompleteTasks, isLoading, errorMessage]);

    return <GlobalContext.Provider value={contextValue}>
        {children}
    </GlobalContext.Provider>
};

export const useGlobalContext = () => useContext(GlobalContext)
