import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material'
import StatusColumn from '../../components/StatusColumn/StatusColumn'
import { useTasks } from '../../hooks/useTasks'

const statusMeta = [
  { value: 0, label: 'К выполнению', color: '#1976d2' },
  { value: 1, label: 'В работе', color: '#ff9800' },
  { value: 2, label: 'Выполнено', color: '#2e7d32' },
] as const

function BoardPage() {
  const { data, isLoading, isError } = useTasks()

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: 300 }}>
        <CircularProgress />
      </Stack>
    )
  }

  if (isError || !data) {
    return <Alert severity="error">Не удалось загрузить задачи</Alert>
  }

  const totalTasks = data.length

  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h5" fontWeight={600}>
          Ваши задачи
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Всего задач: {totalTasks}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2.5,
        }}
      >
        {statusMeta.map((status) => (
          <StatusColumn
            key={status.value}
            label={status.label}
            color={status.color}
            tasks={data.filter((task) => task.status === status.value)}
          />
        ))}
      </Box>
    </Stack>
  )
}

export default BoardPage

