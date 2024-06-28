import React, { useEffect, useState } from 'react'

const Home: React.FC = () => {
  const [users, setUsers] = useState<{ name: string; uuid: string }[]>([])
  const [online, setOnline] = useState<number>(0)
  const [max, setMax] = useState<number>(0)

  const fetchData = () => {
    fetch('https://mcapi.us/server/status?ip=66aserver.zhongbai233.top&port=25591')
      .then((response) => response.json())
      .then((data) => {
        if (data.online) {
          setOnline(data.players.now)
          setMax(data.players.max)
          if (data.players.sample) {
            setUsers(
              data.players.sample.map((player: any) => ({
                name: player.name,
                uuid: player.id,
              })),
            )
          } else {
            setUsers([])
          }
        }
      })
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="m-2 w-full max-w-screen-lg rounded-lg shadow-lg md:m-4">
        <div className="rounded-t-lg bg-blue-500 p-3 text-white">
          <h1 className="text-lg font-semibold">
            当前在线人数: {online} / {max}
          </h1>
        </div>
        <div
          className="grid gap-2 rounded-b-lg bg-white p-4 shadow-inner md:gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))' }}
        >
          {users.map((user) => (
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
      </div>
    </div>
  )
}

export default Home
