import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import Teams from '@/components/Teams';
import Result from '@/components/Result';
import PlayersList from '@/components/PlayersList';
import { usePlayers } from '@/context/PlayersContext';
import { useEffect } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';


export default function Home() {

  const [parent, enableAnimations] = useAutoAnimate();

  const { step } = usePlayers();

  useEffect(() => { }, [step])


  return (
    <>
      <Head>
        <title>sortlify</title>
        <meta name="description" content="sort players into teams" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>

        <Container sx={{ pt: 3 }}>


          {
            step === 1 && <Box >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 5, mb: 10 }}>
                <Typography color="primary" mt={1} sx={{ fontSize: { xs: '3rem', sm: '5rem' } }}>SORTLIFY</Typography>
                <Typography color="primary" mt={1}>randomly place players into teams</Typography>
              </Box>
              <Teams />
              <PlayersList />
            </Box>
          }
          {
            step === 2 && <>
              <Box ref={parent}>
                <Result />
              </Box>
            </>
          }
        </Container>
      </Box>

    </ >
  )
}
