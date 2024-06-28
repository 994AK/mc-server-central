import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface User {
  name: string
  uuid: string
}

interface ServerStatus {
  online: number
  max: number
  users: User[]
}

const Home: React.FC = () => {
  const [utopiaStatus, setUtopiaStatus] = useState<ServerStatus>({ online: 0, max: 0, users: [] })
  const [pureStatus, setPureStatus] = useState<ServerStatus>({ online: 0, max: 0, users: [] })
  const [value, setValue] = useState<string>('1')
  const navigate = useNavigate()
  const location = useLocation()

  const fetchUtopiaData = () => {
    fetch('https://mcapi.us/server/status?ip=66aserver.zhongbai233.top&port=25591')
      .then((response) => response.json())
      .then((data) => {
        if (data.online) {
          setUtopiaStatus({
            online: data.players.now,
            max: data.players.max,
            users: data.players.sample
              ? data.players.sample.map((player: any) => ({
                  name: player.name,
                  uuid: player.id !== '00000000-0000-0000-0000-000000000000' ? player.id : player.name,
                }))
              : [],
          })
        }
      })
  }

  const fetchPureData = () => {
    fetch('https://mcapi.us/server/status?ip=66aserver.zhongbai233.top&port=25592')
      .then((response) => response.json())
      .then((data) => {
        if (data.online) {
          setPureStatus({
            online: data.players.now,
            max: data.players.max,
            users: data.players.sample
              ? data.players.sample.map((player: any) => ({
                  name: player.name,
                  uuid: player.id !== '00000000-0000-0000-0000-000000000000' ? player.id : player.name,
                }))
              : [],
          })
        }
      })
  }

  useEffect(() => {
    fetchUtopiaData()
    fetchPureData()
    const interval = setInterval(() => {
      fetchUtopiaData()
      fetchPureData()
    }, 10000)

    return () => clearInterval(interval)
  }, [])

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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="m-2 w-full max-w-screen-lg md:m-4">
        <TabContext value={value}>
          <Box
            sx={{
              backgroundColor: 'transparent',
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{
                backgroundColor: 'transparent',
                '& .MuiTabs-indicator': {
                  backgroundColor: 'wheat',
                },
                marginBottom: '5px',
              }}
            >
              <Tab
                label={`乌托邦3.11 (${utopiaStatus.online})`}
                value="1"
                disableRipple
                sx={{
                  fontSize: '1.2rem',
                  '&.Mui-selected': {
                    color: 'white', // 选中时的颜色
                  },
                }}
              />
              <Tab
                label={`纯净服1.21 (${pureStatus.online})`}
                value="2"
                disableRipple
                sx={{
                  fontSize: '1.2rem',
                  '&.Mui-selected': {
                    color: 'white', // 选中时的颜色
                  },
                }}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <div className="rounded-t-lg bg-blue-500 p-3 text-white">
              <h1 className="text-lg font-semibold">
                当前在线人数: {utopiaStatus.online} / {utopiaStatus.max}
              </h1>
            </div>
            <div
              className="grid gap-2 rounded-b-lg bg-white p-4 shadow-inner md:gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}
            >
              {utopiaStatus.users.map((user) => (
                <div key={user.uuid} className="text-center">
                  <img
                    className="mx-auto size-12 rounded-full md:size-16"
                    src={`https://mc-heads.net/avatar/${user.name}`}
                    alt={`${user.name} Avatar`}
                  />
                  <h1 className="mt-2 break-words text-sm text-gray-800 md:text-lg">{user.name}</h1>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <div className="rounded-t-lg bg-blue-500 p-3 text-white">
              <h1 className="text-lg font-semibold">
                当前在线人数: {pureStatus.online} / {pureStatus.max}
              </h1>
            </div>
            <div
              className="grid gap-2 rounded-b-lg bg-white p-4 shadow-inner md:gap-4"
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}
            >
              {pureStatus.users.map((user) => (
                <div key={user.uuid} className="text-center">
                  <img
                    className="mx-auto size-12 rounded-full md:size-16"
                    src={`https://mc-heads.net/avatar/${user.name}`}
                    alt={`${user.name} Avatar`}
                  />
                  <h1 className="mt-2 break-words text-sm text-gray-800 md:text-lg">{user.name}</h1>
                </div>
              ))}
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  )
}

export default Home
