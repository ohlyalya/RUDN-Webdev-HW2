export type TaskStatus = 0 | 1 | 2

export type Task = {
  id: number
  title: string
  description?: string
  createdAt: string
  status: TaskStatus
}

