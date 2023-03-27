import { Alert, Box, Button, Card, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { usePlayers } from '@/context/PlayersContext'
import { nanoid } from 'nanoid';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Modal from './Modal';
import palette from '@/theme/palette';

export default function PlayersList() {


  const { players, setPlayers, teamsNumber, setStep } = usePlayers();

  // for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [parent, enableAnimations] = useAutoAnimate();

  const [name, setName] = useState("")
  const ref = useRef();

  const handlePlayerName = (e) => {
    e.preventDefault();

    if (name !== "") {
      setPlayers([...players, { id: nanoid(), name }])
      setName("")
      ref.current.focus();
    }
  }

  const handleDeletePlayer = (id) => setPlayers(players.filter(item => item.id !== id))

  const handleAllClear = () => setPlayers([]);

  const handleClassify = () => players.length % teamsNumber === 0 ? setStep(2) : setOpen(true);


  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <Typography color="primary" sx={{ fontWeight: 'bold', mb: 2 }}>add players</Typography>
      <Box sx={{ display: 'flex' }}>
        <Box component={"form"} onSubmit={handlePlayerName} sx={{ display: 'flex' }}>
          <TextField
            inputRef={ref}
            size='small'
            variant="outlined"
            id="outlined-start-adornment"
            label="type player name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            onSubmit={(event) => {
              setName(event.target.value);
            }}
          />
          <Button onClick={handlePlayerName} variant='outlined' size='small' sx={{ ml: 1 }}>add</Button>
        </Box>



      </Box>


      <Box sx={{ mt: 2, }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="primary" >players ({players.length}) </Typography>

          {
            players.length > 0 && <Button onClick={handleAllClear} size='small' variant='outlined' >clear all</Button>
          }
        </Box>
        <Box sx={{ py: 1 }}>
          {
            players.length === 0 && <Alert severity="warning">you need to add player.</Alert>
          }
          <Grid container spacing={2} ref={parent}>
            {
              players.map(item => (
                <Grid key={item.id} item md={4}>
                  <Card sx={{ px: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: `1px solid ${palette.dark.primary.main}` }}>
                    <Typography>{item.name}</Typography>
                    <IconButton onClick={() => handleDeletePlayer(item.id)} aria-label="delete">
                      <ClearIcon />
                    </IconButton>
                  </Card>
                </Grid>
              ))
            }
          </Grid>

        </Box>
      </Box >
      <Button onClick={handleClassify} variant='contained' sx={{ mt: 3 }} disabled={players.length > 0 ? false : true}>next step  {'>'}</Button>

      <Modal open={open} handleClose={handleClose} context={`your players numbers aren't enough for teams. you created ${teamsNumber} teams and your players are ${players.length}.`} acceptText="np, go on." rejectionText="okay, i will add" rejectFunc={handleClose} acceptFunc={() => setStep(2)} />
    </Card >
  )
}
