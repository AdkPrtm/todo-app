import TaskComponent from "@/components/shared/TaskComponent"
import { getTaskByUser } from "@/lib/db/actions/task.actions"
import { EnumTaskComponent, DataTaskParams } from "@/types/types"


export default async function Home() {
  const task = await getTaskByUser()
  const result: DataTaskParams[] | undefined = task.success?.data.res
  // const {tasksData} = useGlobalContext() //Client Component
  return (
    <TaskComponent typeTask={EnumTaskComponent.AllTask} dataTask={result} />
    // const { tasksData } = useGlobalContext()
    // return (
    //   <TaskComponent typeTask={EnumTaskComponent.AllTask} dataTask={tasksData} />
    // )
  )
}
