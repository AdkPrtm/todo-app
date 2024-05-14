import TaskComponent from '@/components/shared/TaskComponent'
import { getTaskByUser } from '@/lib/db/actions/task.actions'
import { DataTaskParams, EnumTaskComponent } from '@/types/types'

async function ImportantPage() {
  const task = await getTaskByUser()
  const filteredData = task.success?.data.res.filter(item => item.important === true);
  const result: DataTaskParams[] | undefined = filteredData
  return (
    <TaskComponent typeTask={EnumTaskComponent.Important} dataTask={result} />
  )
}

export default ImportantPage