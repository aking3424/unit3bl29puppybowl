import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPlayerForm = ({ setAllPlayers, fetchPlayers }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fsa-puppy-bowl.herokuapp.com/api/2306-fsa-et-web-pt-sf/players',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            breed,
            status,
            imageUrl,
          }),
        }
      );
      if (response.ok) {
        const result = await response.json();
        const newPlayer = result.data.newPlayer;
        setAllPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
        fetchPlayers();
        setTimeout(() => {
          navigate('/AllPlayers');
        }, 0);
      } else {
        console.error('Failed to create a new player');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="PCardSubmit">
      <h1>New Player Form</h1>
      <form onSubmit={handleSubmit}>
        <label className="labels">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="labels">
          Breed:
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="labels">
          Status:
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="labels">
          Image:
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit" className="detailButton">
          Add Player
        </button>
      </form>
    </div>
  );
};

export default NewPlayerForm;