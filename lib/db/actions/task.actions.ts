'use server'

import { AddTaskParams, DataTaskParams } from "@/types/types"
import prisma from "../db"
import { sessionData } from "@/lib/actions/AuthAction"

export const addTaskByUser = async (params: AddTaskParams) => {
    const dataSession = await sessionData()
    if (!dataSession?.id) return { error: 'Get user failed' }
    const userId = dataSession.id
    const data = { ...params, userId }
    try {
        await prisma.task.create({ data: data })
        return { success: 'Task added successfully' }
    } catch (error) {
        return { error: 'Task creation failed' }
    }
}

export const getTaskByUser = async () => {
    const data = await sessionData()
    if (!data?.id) return { error: 'Get user failed' }
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
        return { error: 'Something went wrong' }
    }
}

export const updateTaskById = async (data: DataTaskParams) => {
    try {
        const { id, ...allData } = data
        const res = await prisma.task.update({ where: { id: id }, data: allData })
        return { success: { data: res } }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}

export const updateTaskCompleted = async (taskId: string, completed: boolean) => {
    try {
        const res = await prisma.task.update({ where: { id: taskId }, data: { completed: completed } })
        return { success: { data: res } }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}

export const deleteTaskById = async (taskId: string) => {
    if (!taskId) return { error: 'Get task failed' }
    try {
        const res = await prisma.task.delete({ where: { id: taskId } })
        return { success: { data: { res } } }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}