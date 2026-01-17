import {
  Alert,
  Button,
  ButtonGroup,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTaskById, useTaskMutations } from '../../hooks/useTasks'
import type { TaskStatus } from '../../types'

const statusLabels: Record<TaskStatus, string> = {
  0: 'К выполнению',
  1: 'В работе',
  2: 'Выполнено',
}

function TaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const taskId = useMemo(() => (id ? Number(id) : undefined), [id])
  const { data: task, isLoading, isError } = useTaskById(taskId)
  const { updateStatus, removeTask } = useTaskMutations()

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError || !task) {
    return <Alert severity="error">Задача не найдена</Alert>
  }

  const handleStatusChange = (status: TaskStatus) => {
    updateStatus.mutate({ id: task.id, status })
  }

  const handleDelete = () => {
    removeTask.mutate(task.id, {
      onSuccess: () => {
        navigate('/board')
      },
    })
  }

  const createdAt = new Date(task.createdAt).toLocaleString()

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        bgcolor: '#ffffff',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid rgba(145, 158, 171, 0.16)',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant="overline" color="text.secondary">
            Задача #{task.id}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {task.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Создано: {createdAt}
          </Typography>
        </Stack>
        <Chip label={statusLabels[task.status]} color={task.status === 2 ? 'success' : 'default'} />
      </Stack>

      <Divider />

      <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight={600}>
          Описание
        </Typography>
        <Typography variant="body1" color={task.description ? 'text.primary' : 'text.secondary'}>
          {task.description || 'Описание не указано'}
        </Typography>
      </Stack>

      <Divider />

      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="subtitle1">Статус</Typography>
        <ButtonGroup variant="outlined">
          {([0, 1, 2] as TaskStatus[]).map((status) => (
            <Button
              key={status}
              variant={status === task.status ? 'contained' : 'outlined'}
              onClick={() => handleStatusChange(status)}
              disabled={updateStatus.isPending}
            >
              {statusLabels[status]}
            </Button>
          ))}
        </ButtonGroup>
      </Stack>

      <Button
        color="error"
        variant="contained"
        onClick={handleDelete}
        disabled={removeTask.isPending}
        sx={{ alignSelf: 'flex-start' }}
      >
        Удалить задачу
      </Button>
    </Paper>
  )
}

export default TaskPage

