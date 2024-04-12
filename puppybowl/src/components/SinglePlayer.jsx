import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SinglePlayerDelete() {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch(
          "https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-pt-sf/players"
        );
        const result = await response.json();
        setPlayers(result.data.players);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPlayers();
  }, []);

  const onDelete = async (id) => {
    try {
      await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2310-fsa-et-web-pt-sf/players/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Players">
      {players.map((player) => (
        <div key={player.id} className="PCard">
          <img src={player.imageUrl} alt={player.name} />
          <div className="PDetails">
            <h2 style={{ textDecoration: "underline" }}>Name</h2>
            <h3>{player.name}</h3>
            <h2 style={{ textDecoration: "underline" }}>Breed</h2>
            <h3>{player.breed}</h3>
            <h2 style={{ textDecoration: "underline" }}>Status</h2>
            <h3 style={{ color: "red", fontWeight: "bolder" }}>{player.status}</h3>
            <button onClick={() => onDelete(player.id)} className="detailButton">
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}