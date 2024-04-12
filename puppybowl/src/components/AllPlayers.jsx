import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllPlayers({ allPlayers }) {
  const navigate = useNavigate();

  const onClick = (id) => {
    navigate(`/Details/${id}`);
  }

  return (
    <div className="Players">
      {allPlayers.map((player) => (
        <div key={player.id} className="PCard">
          <img src={player.imageUrl} alt={player.name} />

          <div className="PDetails">
            <h2 style={{ textDecoration: "underline" }}>Name</h2>
            <h3>{player.name}</h3>
            <h2 style={{ textDecoration: "underline" }}>Breed</h2>
            <h3>{player.breed}</h3>
            <h2 style={{ textDecoration: "underline" }}>Status</h2>
            <h3 style={{ color: "red", fontWeight: "bolder" }}>{player.status}</h3>
            <button onClick={() => onClick(player.id)} className="detailButton">DETAILS</button>
          </div>
        </div>
      ))}
    </div>
  )
}