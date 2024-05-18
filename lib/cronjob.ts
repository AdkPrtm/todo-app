import prisma from "./db/db"
import { addDays, format, subDays } from "date-fns";
export const checkDeadline = async () => {
    const dateTomorrow = addDays(new Date(), 1)
    console.log(dateTomorrow)
    const res = await prisma.task.findMany({
        where: {
            deadline: dateTomorrow
        }
    })
    console.log(res)
}