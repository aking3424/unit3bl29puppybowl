import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = ({ allPlayers }) => {
  const [searchText, setSearchText] = useState('');
  const [matchingNames, setMatchingNames] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    const filteredNames = allPlayers
      .filter((player) => player.name.toLowerCase().includes(inputText.toLowerCase()))
      .map((player) => player.name);

    setMatchingNames(filteredNames);
    setDropdownOpen(true); 
  };

  const handleNameClick = (selectedName) => {
    const selectedPlayer = allPlayers.find((player) => player.name === selectedName);

    if (selectedPlayer) {
      navigate(`/Details/${selectedPlayer.id}`);
      setDropdownOpen(false); 
    }
  };

  useEffect(() => {
    if (!searchText) {
      setMatchingNames([]);
      setDropdownOpen(false);
    }
  }, [searchText]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a puppy..."
        value={searchText}
        onChange={handleInputChange}
      />

      {dropdownOpen && matchingNames.length > 0 && (
        <ul className="dropdown">
          {matchingNames.map((name) => (
            <li key={name} onClick={() => handleNameClick(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;