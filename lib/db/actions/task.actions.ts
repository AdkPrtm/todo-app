'use server'

import { AddTaskParams } from "@/types/types"
import prisma from "../db"
import { sessionData } from "@/lib/actions/AuthAction"

export const addTaskByUser = async (params: AddTaskParams) => {
    try {
        await prisma.task.create({ data: params })
        return { success: 'Task added successfully' }
    } catch (error) {
        return { error: 'Task creation failed' }
    }
}

export const getTaskByUser = async () => {
    const data = await sessionData()
    if (!data?.id) return { error: 'Get id failed' }
    try {
        const res = await prisma.task.findMany({
            where: {
                userId: data?.id
            },
            orderBy: {
                deadline: 'asc'
            },
            select: {
                id: true,
                title: true,
                description: true,
                deadline: true,
                important: true,
                completed: true,
            }
        })
        return { success: { data: { res } } }
    } catch (error) {
        return { error: 'Get task failed' }
    }
}