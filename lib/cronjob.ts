import prisma from "./db/db"
import { endOfDay, startOfDay } from "date-fns";
import { SendMailReminder } from "./nodemailer";
import { Task } from "@prisma/client";

function filterTasksByUserId(tasks: Task[], userId: string): Task[] {
    return tasks.filter(task => task.userId === userId);
}

export const checkDeadline = async () => {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    try {
        const tasks = await prisma.task.findMany({
            where: {
                deadline: {
                    gte: todayStart,
                    lt: todayEnd
                }, AND: {
                    completed: false
                }
            }
        });
        const userIds: string[] = [];
        tasks.forEach(task => {
            if (!userIds.includes(task.userId)) {
                userIds.push(task.userId);
            }
        });

        const users = await Promise.all(userIds.map(userId => prisma.user.findUnique({
            where: {
                id: userId
            }
        })));
        const filteredTasks = userIds.map((user) => filterTasksByUserId(tasks, user));
        let results: string[] = [];

        for (const taskByUser of filteredTasks) {
            const dataUser = users.find(user => user?.id === taskByUser[0].userId);
            const data = {
                emailTo: dataUser!.email,
                firstName: dataUser!.firstName.charAt(0).toUpperCase() + dataUser!.firstName.slice(1),
                data: taskByUser
            };
            const result = await SendMailReminder(data);
            results.push(result);
        }

        return {
            data: results
        };
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}