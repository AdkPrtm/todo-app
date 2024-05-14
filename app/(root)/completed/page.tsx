import TaskComponent from '@/components/shared/TaskComponent'
import { getTaskByUser } from '@/lib/db/actions/task.actions'
import { DataTaskParams, EnumTaskComponent } from '@/types/types'

async function CompletedPage() {
  const task = await getTaskByUser()
  const filteredData = task.success?.data.res.filter(item => item.completed === true);
  const result: DataTaskParams[] | undefined = filteredData
  return (
    <TaskComponent typeTask={EnumTaskComponent.Completed} dataTask={result} />
  )
}

export default CompletedPage