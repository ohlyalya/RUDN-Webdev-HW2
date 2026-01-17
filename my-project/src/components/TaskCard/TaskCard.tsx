import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { Task } from '../../types'

type TaskCardProps = {
  task: Task
}

function TaskCard({ task }: TaskCardProps) {
  const createdAt = new Date(task.createdAt).toLocaleDateString()

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        border: '1px solid rgba(145, 158, 171, 0.16)',
        '&:hover': {
          boxShadow: 4,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardActionArea component={RouterLink} to={`/tasks/${task.id}`}>
        <CardContent sx={{ py: 1.5 }}>
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="overline" color="text.secondary">
                #{task.id}
              </Typography>
              <Typography variant="caption" color="text.disabled">
                {createdAt}
              </Typography>
            </Stack>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {task.title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default TaskCard

