import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import AllPlayers from './components/AllPlayers';
import NewPlayerForm from './components/NewPlayerForm';
import PlayerDetails from './components/Detail';
import SinglePlayerDelete from './components/SinglePlayer';
import './index.css';

function App() {
  const [allPlayers, setAllPlayers] = useState([]);

  async function fetchPlayers() {
    try {
      const response = await fetch(
        'https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-pt-sf/players'
      );
      const result = await response.json();
      setAllPlayers(result.data.players);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <BrowserRouter>
      <NavBar allPlayers={allPlayers} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='AllPlayers' element={<AllPlayers allPlayers={allPlayers} />} />
        <Route path='NewPlayerForm' element={<NewPlayerForm setAllPlayers={setAllPlayers} fetchPlayers={fetchPlayers} />} />
        <Route path='DeletePlayer' element={<SinglePlayerDelete />} />
        <Route path='Details/:id' element={<PlayerDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;