import { useEffect, useState } from 'react'

export interface User {
  name: string
  uuid: string
}

export interface ServerStatus {
  online: number
  max: number
  users: User[]
}

const useFetchData = () => {
  const [utopiaStatus, setUtopiaStatus] = useState<ServerStatus>({ online: 0, max: 0, users: [] })
  const [pureStatus, setPureStatus] = useState<ServerStatus>({ online: 0, max: 0, users: [] })

  const fetchUtopiaData = () => {
    fetch('http://localhost:4556/api/users/list')
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          const { players } = data.data
          setUtopiaStatus({
            online: players.now,
            max: players.max,
            users: players.sample.map((player: any) => ({
              name: player.name,
              uuid: player.name,
            })),
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

  return { utopiaStatus, pureStatus }
}

export default useFetchData
