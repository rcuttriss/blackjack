import { useState, useEffect } from "react";
import Deck from './deck.js'
import AceValueSelection from "./AceValueSelection.js";

let deck = Deck();
console.log("DECK")
console.log(deck);
function App() {
  const [aceValues, setAceValues] = useState([]);
  const [playerHand, setPlayerHand] = useState([dealCard(deck),dealCard(deck)]);
  const [dealerHand, setDealerHand] = useState([dealCard(deck),dealCard(deck)]);
  const [playerHandValue, setPlayerHandValue] = useState(0);
  const [dealerHandValue, setDealerHandValue] = useState(0);
  const [dealerTurn, setDealerTurn] = useState(false);
  const [gameState, setGameState] = useState("ONGOING");
  const [actionsOver, setActionsOver] = useState(false);

  useEffect(() => {
    console.log("Updating dealer hand value...");
    setDealerHandValue(getHandValue(dealerHand));
    console.log("Updating player hand value...");
    setPlayerHandValue(getHandValue(playerHand));
  }, [dealerHand, playerHand, aceValues]);

  useEffect( () => {
    console.log("useEffect() :: calling dealerAction()")
    dealerAction()
  },[dealerTurn,dealerHand])

  useEffect(() => {
    console.log("useEffect() :: calling decideWinner()")
    decideWinner()
  }, [dealerTurn,playerHand,dealerHand,actionsOver,gameState])

  function handleAceSelect(selectedValue) {
    setAceValues((prev) => {
      return [...prev, selectedValue]
    });
  }

  function handlePlayerHit() {
    console.log("handlePlayerHit() :: HIT")
    if( dealerTurn === false ) {
      addCardToHand(deck,setPlayerHand,setPlayerHandValue);
    }
  }

  function handlePlayerStand() {
    console.log("handlePlayerStand() :: STAND");
    setDealerTurn(true);
    setActionsOver(true);
  }

  function dealerAction() {
    if( dealerTurn === true && actionsOver === false ) {
      if( dealerHand.length <= 5 && dealerHandValue < 17 ) {
        console.log("dealerAction() :: HIT :: " + dealerHandValue)
        addCardToHand(deck,setDealerHand,setDealerHandValue)
      } else {
        console.log("dealerAction() :: STAND :: " + dealerHandValue)
        setActionsOver(true);
      }
    }
  }

  function decideWinner() {
    console.log("decideWinner() :: Checking for Winner...")
    let playerStatus = checkHandValid(playerHand);
    let dealerStatus = checkHandValid(dealerHand);
    if ( (playerStatus === 2 && dealerHandValue !== 21) || 
      (playerStatus === 1 && playerHandValue > dealerHandValue && actionsOver === true) || dealerStatus === 0) {
      console.log("decideWinner() :: Player Win")
      setGameState("Player WIN");
    } else if ( dealerStatus === 2 || (dealerStatus === 1 && playerHandValue < dealerHandValue && actionsOver === true) || 
      playerStatus === 0) {
      console.log("decideWinner() :: Player Lose")
      setGameState("Player LOSE")
    } else if ( playerHandValue === dealerHandValue && actionsOver ) {
      console.log("decideWinner() :: Push/Tie")
      setGameState("PUSH (TIE)")
    } else {
      console.log("decideWinner() :: No winner, continuing game...")
    }
  }

  function dealCard( deck ) {
    let randomIndex = Math.ceil(Math.random() * deck.length) % deck.length;
    let randomCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    console.log(deck)
    console.log(randomCard)
    return randomCard
  }
  
  function getHandValue( hand ){
    let output = 0;
    // Check if the hand contains an ace
    let containsAce = false;
    let aceCount = 0;
    for (let c in hand) {
      if (hand[c].props.number === "A") {
        containsAce = true;
        ++aceCount;
      }
    }

    // If the hand does not contain an ace, return the total value of the hand
    if( !containsAce ) {
      for(let c in hand){
          let cardVal = hand[c].props.number;
          if (cardVal === "K" || cardVal === "Q" || cardVal === "J") 
            cardVal = 10;
          else cardVal = parseInt(hand[c].props.number);
          output += cardVal;
      }
      // Set the new hand value in the state
      if (hand === playerHand) {
        setPlayerHandValue(output);
      } else if (hand === dealerHand) {
        setDealerHandValue(output);
      }
      return output;
    }

    // The hand contains an ace, check if the value has been set
    if( aceValues.length < aceCount ) {
      // The value of the ace has not been set, return 0
      return 0;
    }

    // The value of the ace has been set, calculate the hand value
    aceCount = 0;
    for(let c in hand){
        let cardVal = hand[c].props.number;
        if( cardVal === "K" || cardVal === "Q" || cardVal === "J" ) 
          cardVal = 10;
        else if( cardVal === "A" ) {
          cardVal = aceValues[aceCount];
          ++aceCount;
        }
        else cardVal = parseInt(hand[c].props.number);
        output += cardVal;
    }
    console.log(output);
    // Set the new hand value in the state
    if (hand === playerHand) {
      setPlayerHandValue(output);
    } else if (hand === dealerHand) {
      setDealerHandValue(output);
    }
    return output;
  }
  
  function getHandSize( hand ) {
    return hand.length;
  }
  
  function checkHandValid( hand ) {
    // 0 == invalid/busted hand
    // 1 == valid hand
    // 2 == won hand, this hand is the winner of the game
    // -1 == an invalid (and also unintentional by design) hand, if this returns something is wrong with game logic
    let handSize = getHandSize(hand);
    let handValue = getHandValue(hand);
  
    if( handValue > 21 ) {
        return 0;
    } else if( (handValue < 21 && handSize < 5) || (handValue === 21 && handSize > 2) ) {
        return 1;
    } else if( (handValue === 21 && handSize === 2) || handSize === 5 ) {
        return 2;
    } else {
        return -1;
    }
  }
  
  function addCardToHand( deck, setHand, setHandValue ) {
    let newCard = dealCard(deck)
    setHand(prevHand => {
      if ( checkHandValid(prevHand) !== 1) return prevHand
      let newHand = [...prevHand, newCard]
      setHandValue(getHandValue(newHand))
      return newHand
    })
  }

  return( 
  <>
    <div className="dealer-hand hand">
         {dealerHand}
         <h1>{dealerHandValue}</h1>
    </div>
    <h2 className="gameState">{gameState}</h2>
    <div className="player-hand hand">
         {playerHand}
         <h1>{playerHandValue}</h1>
    </div>
    <div className="button-box">
        <button className="hit_button" onClick={handlePlayerHit}>HIT</button>
        <button className="stand_button" onClick={handlePlayerStand}>STAND</button>
    </div>
    <AceValueSelection onSelect={handleAceSelect} />
  </>
  )
}

export default App;