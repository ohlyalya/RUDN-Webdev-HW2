import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { Task, TaskStatus } from '../types'

const CUSTOM_TASKS_KEY = 'customTasks'

type ApiTodo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const tasksKey = ['tasks']

const mapApiToTask = (item: ApiTodo): Task => ({
  id: item.id,
  title: item.title,
  description: item.title,
  createdAt: new Date(Date.now() - item.id * 12 * 60 * 60 * 1000).toISOString(),
  status: item.completed ? 2 : 0,
})

const getStoredTasks = (): Task[] => {
  if (typeof localStorage === 'undefined') return []
  try {
    const raw = localStorage.getItem(CUSTOM_TASKS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Task[]
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to read custom tasks from storage', error)
    return []
  }
}

const saveStoredTasks = (tasks: Task[]) => {
  if (typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(tasks))
  } catch (error) {
    console.error('Failed to save custom tasks', error)
  }
}

const mergeTasks = (apiTasks: Task[]) => {
  const stored = getStoredTasks()
  const merged = new Map<number, Task>()

  apiTasks.forEach((task) => merged.set(task.id, task))
  // Stored tasks have priority (custom задачи и изменённые статусы)
  stored.forEach((task) => merged.set(task.id, task))

  return Array.from(merged.values())
}

const fetchTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get<ApiTodo[]>('https://jsonplaceholder.typicode.com/todos?_limit=20')
  const apiTasks = data.map(mapApiToTask)
  return mergeTasks(apiTasks)
}

export const useTasks = () =>
  useQuery({
    queryKey: tasksKey,
    queryFn: fetchTasks,
    staleTime: 5 * 60 * 1000,
  })

export const useTaskById = (id?: number) =>
  useQuery({
    queryKey: tasksKey,
    queryFn: fetchTasks,
    select: (tasks) => tasks.find((task) => task.id === id),
    enabled: id !== undefined,
  })

export const useTaskMutations = () => {
  const queryClient = useQueryClient()

  const persistCache = () => {
    const cached = queryClient.getQueryData<Task[]>(tasksKey) ?? []
    saveStoredTasks(cached)
  }

  const createTask = useMutation({
    mutationFn: async (payload: { title: string; description?: string }) => {
      const tasks =
        queryClient.getQueryData<Task[]>(tasksKey) ??
        (await queryClient.fetchQuery({ queryKey: tasksKey, queryFn: fetchTasks }))
      const safeTasks = tasks ?? []
      const nextId = safeTasks.reduce((max, task) => Math.max(max, task.id), 0) + 1
      return {
        id: nextId,
        title: payload.title,
        description: payload.description,
        createdAt: new Date().toISOString(),
        status: 0 as TaskStatus,
      }
    },
    onSuccess: (task) => {
      queryClient.setQueryData<Task[]>(tasksKey, (prev = []) => [...prev, task])
      persistCache()
    },
  })

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: TaskStatus }) => ({ id, status }),
    onSuccess: ({ id, status }) => {
      queryClient.setQueryData<Task[]>(tasksKey, (prev = []) =>
        prev.map((task) => (task.id === id ? { ...task, status } : task)),
      )
      persistCache()
    },
  })

  const removeTask = useMutation({
    mutationFn: async (id: number) => id,
    onSuccess: (id) => {
      queryClient.setQueryData<Task[]>(tasksKey, (prev = []) => prev.filter((task) => task.id !== id))
      persistCache()
    },
  })

  return { createTask, updateStatus, removeTask }
}

