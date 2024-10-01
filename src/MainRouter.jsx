import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Page404 from "./Pages/Page404";

import Navbar from "./Components/Navbar";
import ComposeNGram from "./Pages/ComposeNGram";
import BestDecks from "./Pages/BestDecks";
import NGramStatsPage from "./Pages/NGramStatsPage";


export default function MainRouter() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<BestDecks/>} />
        <Route path="/composeNGram" element={<ComposeNGram />} />
        <Route path="/ngramStats" element={<NGramStatsPage />} />

        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}