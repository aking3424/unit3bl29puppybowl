import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const PlayerDetails = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayerDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-pt-sf/players/${id}`
        );
        if (!response.ok) {
          console.error('Failed to fetch player details');
          return;
        }
        const result = await response.json();
        if (result && result.data && result.data.player) {
          setPlayer(result.data.player);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    if (id) {
      fetchPlayerDetails();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!player) {
    return <div>No player details available</div>;
  }

  return (
    <div className="PCardDetail">
      <img src={player.imageUrl} alt={player.name} />
      <h2 style={{ textDecoration: "underline" }}>Name</h2>
      <h3>{player.name}</h3>
      <h2 style={{ textDecoration: "underline" }}>Breed</h2>
      <h3>{player.breed}</h3>
      <h2 style={{ textDecoration: "underline" }}>Status</h2>
      <h3 style={{ color: "red", fontWeight: "bolder" }}>{player.status}</h3>
      <button className="detailButton">
        <Link to="/AllPlayers">Go Back</Link>
      </button>
    </div>
  );
};

export default PlayerDetails;