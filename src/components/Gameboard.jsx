import React, { useEffect, useState } from "react";
import cplusplus from "../assets/cplusplusicon.png";
import js from "../assets/jsicon.png";
import css from "../assets/cssicon.png";
import py from "../assets/pythonicon.png";
import react from "../assets/reacticon.png";
import vue from "../assets/vueicon.png";
import html from "../assets/htmlicon.png";
import node from "../assets/nodeicon.png";
import figma from "../assets/figmaicon.png";
import Card from "./Card";

const Gameboard = () => {
  const [cards, setCards] = useState([]);
  const [one, setOne] = useState(null);
  const [two, setTwo] = useState(null);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timing, setTiming] = useState(false);
  const [counter, setCounter] = useState(0);

  const memoryCards = [
    { name: "Javascript", src: js },
    { name: "C++", src: cplusplus },
    { name: "Python", src: py },
    { name: "CSS", src: css },
    { name: "React", src: react },
    { name: "Vue", src: vue },
    { name: "HTML", src: html },
    { name: "Nodejs", src: node },
    { name: "Figma", src: figma },
  ];

  const generateDeck = () => {
    return [...memoryCards, ...memoryCards]
      .map((card) => ({
        ...card,
        id: Math.random(),
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(generateDeck());
  }, []);

  const shuffleDeck = () => {
    setCards(generateDeck);
    setTime(0);
    setTiming(false);
    setWon(false);
    setCounter(0);
  };

  const handleTiming = () => {
    setTiming((prev) => !prev);
  };

  useEffect(() => {
    let timer;
    if (timing) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timing]);

  const handleCardClick = (clickedId) => {
    const cardClicked = cards.find((card) => card.id === clickedId);

    if (!one) {
      setOne(cardClicked);
    } else if (!two && cardClicked.id !== one.id) {
      setTwo(cardClicked);
    }

    const updatedCards = cards.map((card) => {
      if (card.id === clickedId) {
        return { ...card, flipped: true };
      } else {
        return card;
      }
    });
    setCards(updatedCards);
  };

  useEffect(() => {
    if (!one || !two) return;
    setCounter((prev) => prev + 1);

    if (one.src === two.src) {
      const updated = cards.map((card) => {
        if (card.src === one.src) {
          return { ...card, matched: true };
        } else {
          return card;
        }
      });
      setCards(updated);
      setOne(null);
      setTwo(null);
    } else {
      const updated = cards.map((card) => {
        if (card.id === one.id || card.id === two.id) {
          return { ...card, flipped: false };
        } else {
          return card;
        }
      });

      setTimeout(() => {
        setCards(updated);
        setOne(null);
        setTwo(null);
      }, 500);
    }
  }, [one, two]);

  useEffect(() => {
    if (cards.length && cards.every((card) => card.matched)) {
      setWon(true);
      setTiming(false);
      setCounter(0);
    }
  }, [cards]);

  return (
    <div className="card-wrapper">
      {won === true && (
        <p style={{ color: "white", fontSize: "40px" }}>Good job!</p>
      )}
      <div className="p-wrapper">
        <p className="timer">{time}s</p>
        <p className="counter">Attempts: {counter}</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            onClick={() => handleCardClick(card.id)}
            key={card.id}
            src={card.src}
            name={card.name}
            flipped={card.flipped}
          />
        ))}
      </div>
      <div className="buttons">
        <button onClick={handleTiming}>
          {timing === true ? "Stop Timer" : "Start Timer"}
        </button>
        <button onClick={shuffleDeck}>Shuffle</button>
      </div>
    </div>
  );
};

export default Gameboard;
