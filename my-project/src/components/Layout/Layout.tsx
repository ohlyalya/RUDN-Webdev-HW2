import MenuIcon from '@mui/icons-material/Dashboard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

type LayoutProps = {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        backgroundImage:
          'radial-gradient(circle at 0 0, rgba(25, 118, 210, 0.12), transparent 55%), radial-gradient(circle at 100% 100%, rgba(156, 39, 176, 0.14), transparent 55%)',
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          mb: 4,
          background: 'linear-gradient(90deg, #1976d2, #7b1fa2)',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MenuIcon />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Доска задач
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Легкое управление задачами в формате Kanban
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/board"
              variant="outlined"
              sx={{
                borderColor: 'rgba(255,255,255,0.4)',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.9)',
                  bgcolor: 'rgba(255,255,255,0.08)',
                },
              }}
            >
              Все задачи
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/create"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                bgcolor: 'rgba(255,255,255,0.18)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.26)',
                },
              }}
            >
              Новая задача
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ pb: 5 }}>{children}</Box>
      </Container>
    </Box>
  )
}

export default Layout

