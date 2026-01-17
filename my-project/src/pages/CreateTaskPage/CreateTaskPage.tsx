import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskMutations } from '../../hooks/useTasks'

function CreateTaskPage() {
  const navigate = useNavigate()
  const { createTask } = useTaskMutations()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!title.trim()) {
      return
    }
    createTask.mutate(
      { title: title.trim(), description: description.trim() || undefined },
      {
        onSuccess: (task) => {
          navigate(`/tasks/${task.id}`)
        },
      },
    )
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        bgcolor: '#ffffff',
        borderRadius: 3,
        maxWidth: 640,
        mx: 'auto',
        border: '1px solid rgba(145, 158, 171, 0.16)',
      }}
    >
      <Stack component="form" spacing={3} onSubmit={handleSubmit}>
        <Stack spacing={0.5}>
          <Typography variant="h5" fontWeight={600}>
            Создание задачи
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Укажите краткое название и при необходимости подробное описание задачи.
          </Typography>
        </Stack>

        <TextField
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          helperText="Например: Подготовить отчёт за квартал"
        />

        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          minRows={3}
          fullWidth
          placeholder="Добавьте детали, критерии готовности, ссылки и т.д."
        />

        <Button
          type="submit"
          variant="contained"
          disabled={createTask.isPending || !title.trim()}
          sx={{ alignSelf: 'flex-start', textTransform: 'none', px: 3 }}
        >
          Создать
        </Button>

        {createTask.isError && <Alert severity="error">Не удалось создать задачу</Alert>}
      </Stack>
    </Paper>
  )
}

export default CreateTaskPage

