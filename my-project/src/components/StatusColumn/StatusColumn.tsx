import { Box, Paper, Stack, Typography } from '@mui/material'
import type { Task } from '../../types'
import TaskCard from '../TaskCard/TaskCard'

type StatusColumnProps = {
  label: string
  color?: string
  tasks: Task[]
}

function StatusColumn({ label, color = '#1976d2', tasks }: StatusColumnProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        bgcolor: 'rgba(255,255,255,0.9)',
        borderRadius: 2,
        p: 2.5,
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        border: '1px solid rgba(145, 158, 171, 0.12)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {label}
        </Typography>
        <Box
          sx={{
            px: 1.2,
            py: 0.3,
            borderRadius: 999,
            bgcolor: `${color}1f`,
            color,
            fontSize: 12,
            fontWeight: 500,
          }}
        >
          {tasks.length} шт.
        </Box>
      </Stack>
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1.5}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Нет задач
            </Typography>
          )}
        </Stack>
      </Box>
    </Paper>
  )
}

export default StatusColumn

