import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ScrollButton from "../Components/ScrollButton";
import axios from "axios";
import CardComponent from "../Components/CardComponent";
import { Deck, idToCard } from "../utils/deckUtils";
import { UserData } from "../utils/Data";
import LineChart from "../Components/LineChart";
import StatsTable from "../Components/StatsComponent";

const NGramStatsPage = () => {
  const location = useLocation();
  const {
    state: { selectedCards },
  } = location;
  const [ngramStatistics, setNGramStatistics] = useState([]);
  const [ngramMonthsStats, setNGramMonthsStats] = useState([]);
  const [ngramWeeksStats, setNGramWeeksStats] = useState([]);
  const [granularity, setGranularity] = useState("all");
  const [showWeekSelect, setShowWeekSelect] = useState(false);
  const [showMonthSelect, setShowMonthSelect] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedK, setSelectedK] = useState(100);
  const [selectedFilter, setSelectedFilter] = useState("W");
  const [ngramMonthData, setNgramMonthData] = useState({
    labels: [],
    datasets: [],
  });
  const [ngramWeekData, setNgramWeekData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setNgramMonthData(() => ({
      labels: ngramMonthsStats.map((stats) => stats.month + "/" + stats.year),
      datasets: [
        {
          label: "Number of uses per month",
          data: ngramMonthsStats.map((stats) => stats.uses),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }));
    setNgramWeekData(() => ({
      labels: ngramWeeksStats.map((stats) => stats.week + "/" + stats.year),
      datasets: [
        {
          label: "Number of uses per week",
          data: ngramWeeksStats.map((stats) => stats.uses),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    }));
  }, [ngramMonthsStats]);

  const navigate = useNavigate();
  useEffect(() => {
    applyFilters();
  }, [selectedCards, granularity, selectedWeek, selectedMonth, selectedK, selectedFilter]);

  useEffect(() => {
    fetchWeekStats();
    fetchMonthStats();
  }, [selectedCards, selectedK, selectedFilter]);

  function fetchWeekStats() {
    let deck = new Deck();
    selectedCards.forEach((card) => deck.addCard(card));
    // Define the API endpoint
    const apiUrl = `http://localhost:5001/ngram/${deck.icards()}/week/-1/${selectedK}/${selectedFilter}`;
    // Make a request to the API endpoint
    axios
      .get(apiUrl)

      .then((response) => {
        setNGramWeeksStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }

  function fetchMonthStats() {
    let deck = new Deck();
    selectedCards.forEach((card) => deck.addCard(card));
    // Define the API endpoint
    const apiUrl = `http://localhost:5001/ngram/${deck.icards()}/month/-1/${selectedK}/${selectedFilter}`;

    // Make a request to the API endpoint
    axios
      .get(apiUrl)

      .then((response) => {
        setNGramMonthsStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }

  function applyFilters() {
    let deck = new Deck();
    selectedCards.forEach((card) => deck.addCard(card));
    // Define the API endpoint
    let apiUrl = "";
    if (granularity === "all") {
      apiUrl = `http://localhost:5001/ngram/${deck.icards()}/${granularity}/1`;
    } else if (granularity === "week") {
      apiUrl = `http://localhost:5001/ngram/${deck.icards()}/${granularity}/${selectedWeek}`;
    } else if (granularity === "month") {
      apiUrl = `http://localhost:5001/ngram/${deck.icards()}/${granularity}/${selectedMonth}`;
    }
    apiUrl += `/${selectedK}/${selectedFilter}`;

    // Make a request to the API endpoint
    axios
      .get(apiUrl)
      .then((response) => {
        setNGramStatistics(response.data);
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

  // Function to handle card click
  const onCardClick = (id) => {
    const selectedCards = [id];
    navigate("/ngramStats", { state: { selectedCards } });
  };

  return (
    <div className="body">
      <header>Header</header>
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
            Filtrer par <hr className="horizontal_line" />
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

          {/* <button className="apply_button" onClick={handleApplyFilters}>
            Apply filters
          </button> */}
          <button className="reinitialiser_button" onClick={handleResetFilters}>
            Reset filters
          </button>
        </aside>
        <main>
          <div className="ngram-cards-container">
            {/* Afficher les cartes sélectionnées */}
            {selectedCards.map((card, index) => (
              <div key={index}>
                <CardComponent
                  id={card}
                  name={idToCard(card).name}
                  imageUrl={
                    idToCard(card).iconUrls.evo ||
                    idToCard(card).iconUrls.medium
                  }
                  onClick={() => {
                    onCardClick(card);
                  }}
                  height="150px"
                  width="130px"
                />
              </div>
            ))}
          </div>
          <div className="ngram-statistics-container">
            <h1>Statistics of this {selectedCards.length}-Gram</h1>
            {ngramStatistics.length === 0 ? (
              <p className="no-stats-text">
                No statistics available for this {selectedCards.length}-Gram
              </p>
            ) : (
              ngramStatistics.map((stats, index) => (
                <>
                <div key={index}>
                  <StatsTable stats={stats} isBestDeck={false} />
                  </div>
                </>
              ))
            )}
            <div className="ngram-statistics-graphs-container">
              <div style={{ width: 500 }}>
                <LineChart chartData={ngramMonthData} />
              </div>
              <div style={{ width: 500 }}>
                <LineChart chartData={ngramWeekData} />
              </div>
            </div>
          </div>
        </main>
        <aside className="right">
          <ScrollButton />
        </aside>
      </div>
      <footer></footer>
    </div>
  );
};

export default NGramStatsPage;
