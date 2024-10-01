import React, { useState } from "react";
import { Deck, nameToUrl, nameToId, idToCard, cr_cards } from "../utils/deckUtils";
import Card from "./CardComponent";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DeckComponent = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [deck, setDeck] = useState(new Deck());
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    // Vérifiez si la carte est déjà dans le deck
    const cardIndex = selectedCards.indexOf(cardId);

    if (cardIndex === -1) {
      // Si la carte n'est pas dans le deck, ajoutez-la
      if (selectedCards.length < 8) {
        setSelectedCards([...selectedCards, cardId]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The deck is full, you cannot add more than 8 cards.'
        });
      }
    } else {
      // Si la carte est déjà dans le deck, retirez-la
      const updatedSelectedCards = [...selectedCards];
      updatedSelectedCards.splice(cardIndex, 1);
      setSelectedCards(updatedSelectedCards);
    }
  };

  const renderAllCards = () => {
    return cr_cards.map((card, index) => (
      <Card
        key={index}
        id={card.id}
        name={card.name}
        imageUrl={card.iconUrls.evo || card.iconUrls.medium}
        onClick={handleCardClick}
        selected={selectedCards.includes(card.id)}
        height="120px"
        width="100px"
      />
    ));
  };

  const renderDeckCards = () => {
    if (selectedCards.length === 0) {
      return <p className="no-card-text" >No card selected</p>;
    }

    return selectedCards.map((cardId) => {
      const card = idToCard(cardId);
      return (
        <Card
          key={cardId}
          id={card.id}
          name={card.name}
          imageUrl={card.iconUrls.evo ||card.iconUrls.medium}
          onClick={handleCardClick}
          selected={true}
          height="120px"
          width="100px"
        />
      );
    });
  };

  const handleSeeNGramStats = () => {
    if (selectedCards.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select cards before proceeding to N-Gram stats.'
      });
    } else {
      // Naviguer vers la page N-Gram avec les cartes sélectionnées
      console.log("aaaaaaaaaaaaoooooooooooselectedCards:", selectedCards);
      navigate('/ngramStats', { state: { selectedCards } });
    }
  };

  return (
    <div style={{ marginLeft: "10px", marginRight: "10px" }}>
      <h1>Compose N-Gram</h1>
      <div className="compose-deck-container">
        <div className="decks-container">{renderDeckCards()}</div>
        <button className="see-ngram-button" onClick={handleSeeNGramStats}>
        See N-Gram stats
      </button>
      </div>

      <h3>All cards</h3>
      <div className="decks-container">{renderAllCards()}</div>
    </div>
  );
};

export default DeckComponent;
