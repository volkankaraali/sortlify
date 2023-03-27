import { usePlayers } from '@/context/PlayersContext'
import { Box, Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React from 'react'

export default function Teams() {

  const { teamsNumber, setTeamsNumber } = usePlayers();

  const handleChange = (event) => setTeamsNumber(event.target.value);;

  return (
    <Card
      sx={{ p: 2 }}
    >
      <Typography color="primary" sx={{ fontWeight: 'bold' }}>how many teams will be?</Typography>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={teamsNumber}
          onChange={handleChange}
        >
          <FormControlLabel value="2" control={<Radio />} label="2 teams" />
          <FormControlLabel value="3" control={<Radio />} label="3 teams" />
          <FormControlLabel value="4" control={<Radio />} label="4 teams" />
          <FormControlLabel value="5" control={<Radio />} label="5 teams" />
        </RadioGroup>
      </FormControl>
    </Card>
  )
}
