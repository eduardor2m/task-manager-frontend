import { NavBar } from '@/components/NavBar'
import { TaskCard } from '@/components/TaskCard'
import styles from '@/styles/pages/Home.module.scss'

type Task = {
  title: string
  description: string
  category: string
  date: string
  status: string
}

async function getTasks(): Promise<Task[]> {
  const response = await fetch('http://localhost:9090/api/task')
  const data = await response.json().then((data) => {
    const tasks: Task[] = data.map((task: any) => {
      return {
        title: task.title,
        description: task.description,
        category: task.category,
        date: task.date,
        status: task.status,
      }
    })
    return tasks
  })
  return data
}

export default async function Home() {
  const tasks = await getTasks()
  return (
    <main className={styles.container}>
      <NavBar
        data={{
          username: 'John Doe',
        }}
      />
      <section className={styles.list_tasks}>
        <h1 className={styles.title}>Tarefas</h1>
        <section className={styles.wrapper_tasks}>
          {tasks.map((task) => (
            <TaskCard key={task.title} data={task} />
          ))}
        </section>
      </section>
    </main>
  )
}
