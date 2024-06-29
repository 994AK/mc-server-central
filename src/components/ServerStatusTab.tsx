import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import React from 'react'

import { ServerStatus } from './FetchData'
import UserCard from './UserCard'

interface ServerStatusTabProps {
  value: string
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
  utopiaStatus: ServerStatus
  pureStatus: ServerStatus
}

const ServerStatusTab: React.FC<ServerStatusTabProps> = ({ value, handleChange, utopiaStatus, pureStatus }) => (
  <TabContext value={value}>
    <Box sx={{ backgroundColor: 'transparent' }}>
      <TabList
        onChange={handleChange}
        aria-label="server status tabs"
        sx={{
          backgroundColor: 'transparent',
          '& .MuiTabs-indicator': { backgroundColor: 'wheat' },
          marginBottom: '5px',
        }}
      >
        <Tab
          label={`乌托邦3.11 (${utopiaStatus.online})`}
          value="1"
          disableRipple
          sx={{ fontSize: '1.2rem', '&.Mui-selected': { color: 'white' } }}
        />
        <Tab
          label={`纯净服1.21 (${pureStatus.online})`}
          value="2"
          disableRipple
          sx={{ fontSize: '1.2rem', '&.Mui-selected': { color: 'white' } }}
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
          <UserCard key={user.uuid} user={user} />
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
          <UserCard key={user.uuid} user={user} />
        ))}
      </div>
    </TabPanel>
  </TabContext>
)

export default ServerStatusTab
