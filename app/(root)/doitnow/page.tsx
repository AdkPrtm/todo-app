import TaskComponent from '@/components/shared/TaskComponent'
import { getTaskByUser } from '@/lib/db/actions/task.actions'
import { DataTaskParams, EnumTaskComponent } from '@/types/types'

async function DoItNowPage() {
  const task = await getTaskByUser()
  const filteredData = task.success?.data.res.filter(item => item.completed === false);
  const result: DataTaskParams[] | undefined = filteredData
  return (
    <TaskComponent typeTask={EnumTaskComponent.DoiItNow} dataTask={result} />
  )
}

export default DoItNowPage