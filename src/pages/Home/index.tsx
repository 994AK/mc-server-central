// /pages/Home.tsx
import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import useFetchData from './components/FetchData'
import ServerStatusTab from './components/ServerStatusTab'
import WhitelistForm from './components/WhitelistForm'

const Home: React.FC = () => {
  const { utopiaStatus, pureStatus } = useFetchData()
  const [value, setValue] = useState<string>('1')
  const [open, setOpen] = useState<boolean>(false)
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tab = params.get('tab')
    if (tab) {
      setValue(tab)
    }
  }, [location.search])

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    const params = new URLSearchParams(location.search)
    params.set('tab', newValue)
    navigate({ search: params.toString() })
  }

  const handleWhitelistSubmit = (id: string) => {
    fetch('http://localhost:3000/users/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setAlertMessage(data.message)
          setAlertSeverity('success')
        } else {
          setAlertMessage(data.message)
          setAlertSeverity('error')
        }
        setOpen(true)
      })
      .catch(() => {
        setAlertMessage('提交失败')
        setAlertSeverity('error')
        setOpen(true)
      })
  }

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="m-2.5 flex w-full max-w-screen-lg flex-col gap-5 rounded-lg bg-white p-4 shadow-md md:m-4">
        <div className="text-center text-3xl text-blue-600">添加白名单</div>

        <WhitelistForm onSubmit={handleWhitelistSubmit} />
      </div>

      <div className="m-2 w-full max-w-screen-lg md:m-4">
        <ServerStatusTab
          value={value}
          handleChange={handleChange}
          utopiaStatus={utopiaStatus}
          pureStatus={pureStatus}
        />
      </div>

      <Snackbar
        open={open}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Home
