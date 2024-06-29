// /pages/WhitelistAdd.tsx
import { Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
}

const WhitelistAdd: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('http://localhost:4556/api/users/status?status=0')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
        setLoading(false)
      })
  }, [])

  const handleApprove = (userId: string) => {
    fetch(`http://localhost:4556/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 200) {
          setUsers(users.filter((user) => user.id !== userId))
        } else {
          console.error('Error approving user:', data.message)
        }
      })
      .catch((error) => {
        console.error('Error approving user:', error)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="m-2.5 flex w-full max-w-screen-lg flex-col gap-5 rounded-lg bg-white p-4 shadow-md md:m-4">
        <div className="text-center text-3xl text-blue-600">待审核白名单 ({users.length}人)</div>
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <ul className="h-3/5 list-none overflow-y-scroll">
            {users.map((user, index) => (
              <li
                key={user.id}
                className={`flex items-center justify-between p-4 ${index < users.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <span className="text-lg">{user.name}</span>
                <Button variant="contained" color="primary" onClick={() => handleApprove(user.id)}>
                  审核
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default WhitelistAdd
