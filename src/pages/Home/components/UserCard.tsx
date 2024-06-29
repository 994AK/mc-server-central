import React from 'react'

import { User } from './FetchData'

interface UserCardProps {
  user: User
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <div className="text-center">
    <img
      className="mx-auto size-12 rounded-full md:size-16"
      src={`https://mc-heads.net/avatar/${user.name}`}
      alt={`${user.name} Avatar`}
    />
    <h1 className="mt-2 break-words text-sm text-gray-800 md:text-lg">{user.name}</h1>
  </div>
)

export default UserCard
