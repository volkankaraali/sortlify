import React, { createContext, useContext, useState } from "react";

const PlayersContext = createContext();

export default function PlayersProvider({ children }) {

  const [players, setPlayers] = useState([]);
  const [teamsNumber, setTeamsNumber] = useState("2");
  const [step, setStep] = useState(1);

  const values = {
    players,
    setPlayers,
    teamsNumber,
    setTeamsNumber,
    step,
    setStep

  }

  return (
    <PlayersContext.Provider value={values}>
      {children}
    </PlayersContext.Provider>
  )
}

export const usePlayers = () => useContext(PlayersContext);