import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

interface WhitelistFormProps {
  onSubmit: (id: string) => void
}

const WhitelistForm: React.FC<WhitelistFormProps> = ({ onSubmit }) => {
  const [whitelistId, setWhitelistId] = useState<string>('')

  const handleSubmit = () => {
    if (whitelistId.trim()) {
      onSubmit(whitelistId)
      setWhitelistId('')
    } else {
      // Handle empty input case
    }
  }

  return (
    <div className="flex items-center justify-center gap-3.5">
      <TextField
        label="输入ID添加白名单"
        variant="outlined"
        value={whitelistId}
        sx={{ height: 56, borderRight: 'transparent' }}
        onChange={(e) => setWhitelistId(e.target.value)}
      />
      <Button onClick={handleSubmit} size="large" sx={{ fontSize: 18 }}>
        提交
      </Button>
    </div>
  )
}

export default WhitelistForm
