import { usePlayers } from '@/context/PlayersContext';
import { Box, Button, Card, List, ListItem, Typography } from '@mui/material';
import React, { useState } from 'react';
import palette from '@/theme/palette';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import LoadingIcon from '@/constants/icons/LoadingIcon';

export default function Result() {

  const [parent, enableAnimations] = useAutoAnimate();

  const { players, teamsNumber, setStep } = usePlayers();

  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);

  function shuffleArray(array) {

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


  function assignPlayersToTeams(numTeams, playersList) {

    shuffleArray(playersList);

    const teamSize = playersList.length / teamsNumber;
    const teams = [];

    for (let i = 0; i < teamsNumber; i++) {
      teams.push({
        team: i + 1,
        teamMembers: playersList.slice(i * teamSize, (i + 1) * teamSize)
      });
    }

    return teams;
  }


  const generateTeams = () => {
    setLoading(true);
    const result = assignPlayersToTeams(teamsNumber, players)
    setTeams(result)
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }


  return (
    <Box sx={{ mb: 3 }}>
      <Button onClick={() => setStep(1)}> {"<"} before step </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 5 }}>
        <Box
          loading='lazy'
          component={"img"}
          src="/images/select-logo.png"
          alt="pick player"
          sx={{ width: { xs: 320, sm: 600, md: 700 } }}
        />

        <Box mb={2}>

          <Button variant="contained" onClick={generateTeams}>
            assign players to teams
          </Button>
        </Box>
      </Box>

      <Box ref={parent} sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 2 }}>
        {
          loading
            ? <LoadingIcon />
            : teams?.map((teamObj, i) => (
              <Card key={i} sx={{ p: 2, width: 300 }}>
                <Typography variant="h6">Team {teamObj.team}</Typography>
                <List  >
                  {teamObj?.teamMembers.map((player) => (
                    <ListItem key={player.id} sx={{ color: palette.dark.grey[900], backgroundColor: palette.dark.primary.main, mb: 1, borderRadius: 1 }} >{player.name}</ListItem>
                  ))}
                </List>
              </Card>

            ))
        }
      </Box>
    </Box>
  )
}
