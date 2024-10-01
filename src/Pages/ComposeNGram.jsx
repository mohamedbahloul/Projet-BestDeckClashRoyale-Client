import React from 'react'
import ScrollButton from "../Components/ScrollButton";
import DeckComponent from '../Components/DeckComponent';


function ComposeNGram() {
  return (
    <div className="body">
      <header>header</header>
      <div className="main">
        <aside className="left">
        </aside>
        <main>
          <DeckComponent />



        </main>
        <aside className="right">
          <ScrollButton />
        </aside>
      </div>
      <footer>
      </footer>
    </div>
  );
}

export default ComposeNGram