import React, { useState, useEffect } from "react";
import ScrollButton from "../Components/ScrollButton";
import {
  Deck,
  nameToUrl,
  nameToId,
  idToCard,
  cr_cards,
} from "../utils/deckUtils";
import CardComponent from "../Components/CardComponent";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import StatsTable from "../Components/StatsComponent";

// Function to handle deck click
const onDeckClick = (deck, navigate) => {
  const selectedCards = deck.idcards();
  navigate("/ngramStats", { state: { selectedCards } });
};

// Component to display deck information
const DeckCard = ({ deck, stats }) => {
  const navigate = useNavigate();

  return (
    <div className="deck-card" onClick={() => onDeckClick(deck, navigate)}>
      <div className="deck-info">
        <div className="cards-container">
          {deck.cards().map(([name, imageUrl, evo], index) => (
            <CardComponent
              key={index}
              name={name}
              imageUrl={evo || imageUrl}
              height="120px"
              width="100px"
            />
          ))}
        </div>
      </div>
      <div className="stats-info-container">
        {/* <p>Win Rate: {stats.winRate.toFixed(2)}%</p>
        <p>Wins: {stats.wins}</p>
        <p>Uses: {stats.uses}</p>
        <p>Max Clan Trophies: {stats.maxClanTrophies}</p> */}
        <StatsTable stats={stats} />
      </div>
    </div>
  );
};

// Function to generate deck from API data
const generateDeckFromAPI = (apiData) => {
  const deck = new Deck();
  apiData.forEach((cardData) => {
    deck.addHexCard(cardData);
  });

  const stats = {
    winRate: Math.random() * 100,
  };

  return { deck, stats };
};

function BestDecks() {
  const [bestCards, setBestCards] = useState([]);
  const [granularity, setGranularity] = useState("all");
  const [showWeekSelect, setShowWeekSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedK, setSelectedK] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState("W");

  useEffect(() => {
    applyFilters();
  }, [granularity, selectedWeek, selectedMonth, selectedK, selectedFilter]);

  function applyFilters() {
    let url = `http://localhost:5001/bestDeck/${granularity}`;
    if (granularity === "week") {
      url += `/${selectedWeek}`;
    } else if (granularity === "month") {
      url += `/${selectedMonth}`;
    } else if (granularity === "all") {
      url += `/1`;
    }
    url += `/${selectedK}/${selectedFilter}`;
    console.log("URL:", url); 
    Axios.get(url)
      .then((response) => {
        console.log("Response from API:", response.data);
        // const sortedDecks = response.data.sort(
        //   (a, b) => b.wins / b.uses - a.wins / a.uses
        // );
        setBestCards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }

  const handleGranularityChange = (value) => {
    setGranularity(value);
    setShowWeekSelect(value === "week");
    setShowMonthSelect(value === "month");
  };

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };
  // const handleApplyFilters = () => {
  //   applyFilters();
  // };

  const handleResetFilters = () => {
    setGranularity("all");
    setShowWeekSelect(false);
    setShowMonthSelect(false);
    setSelectedWeek(1);
    setSelectedMonth(1);
    setSelectedK(100);
    setSelectedFilter("W");
    applyFilters(); 
  };

  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
          <p
            style={{
              color: "gray",
              fontSize: "15px",
              marginTop: "70px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "left",
              whiteSpace: "nowrap",
              fontWeight: "bold",
            }}
          >
            Filter by <hr className="horizontal_line" />
          </p>

          <select
            className="styledSelect"
            onChange={(e) => handleGranularityChange(e.target.value)}
            value={granularity}
          >
            <option value="all">Select the granularity(Default All)</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>

          {showWeekSelect && (
            <select
              className="styledSelect"
              onChange={(e) => handleWeekChange(e.target.value)}
              value={selectedWeek}
            >
              {[...Array(52)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {"Week " + (index + 1)}
                </option>
              ))}
            </select>
          )}

          {showMonthSelect && (
            <select
              className="styledSelect"
              onChange={(e) => handleMonthChange(e.target.value)}
              value={selectedMonth}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          )}

          <select
            className="styledSelect"
            onChange={(e) => setSelectedK(e.target.value)}
            value={selectedK}
          >
            <option value="100">Select K value of TopK(Default 100)</option>
            <option value="50">50</option>
            <option value="150">150</option>
          </select>

          <select
            className="styledSelect"
            onChange={(e) => setSelectedFilter(e.target.value)}
            value={selectedFilter}
          >
            <option value="W">Select Filter value of TopK(Default Wins)</option>
            <option value="U">Uses</option>
            <option value="AVG">Average deck difference</option>
            <option value="P">Number of distinct players </option>
          </select>
          <button className="reinitialiser_button" onClick={handleResetFilters}>
            Reset filters
          </button>
        </aside>
        <main style={{ marginTop: "30px" }}>
          <h1> Best Clash Royale Decks</h1>

          {bestCards.length === 0 ? (
            <p className="no-deck-text">
              No deck found for the selected period
            </p>
          ) : (
            bestCards.map((deckData, index) => (
              <DeckCard
                key={index}
                deck={generateDeckFromAPI(deckData.combination).deck}
                stats={{
                  wins: deckData.wins,
                  uses: deckData.uses,
                  max_clan_trophies: deckData.max_clan_trophies,
                  avg_deck_diff: deckData.avg_deck_diff,
                  distinct_player_count: deckData.distinct_player_count,
                }}
              />
            ))
          )}
        </main>
        <aside className="right">
          <ScrollButton />
        </aside>
      </div>
      <footer></footer>
    </div>
  );
}

export default BestDecks;
