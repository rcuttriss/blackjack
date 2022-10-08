import { useState, useEffect } from "react";
import Deck from './deck.js'
import {dealHand, getHandValue, addCardToHand} from './hand.js'

var deck = Deck();
var ph = dealHand(deck)
var dh = dealHand(deck)

function App() {
  console.log("RENDER")
  const [playerHand, setPlayerHand] = useState(ph)
  const [playerHandValue, setPlayerHandValue] = useState(getHandValue(playerHand))
  const [dealerHand, setDealerHand] = useState(dh)
  const [dealerHandValue, setDealerHandValue] = useState(getHandValue(dealerHand))
  const [dealerTurn, setDealerTurn] = useState(false)
  const [gameState, setGameState] = useState("ONGOING")

  useEffect(() => {
    console.log("Player Hand :: " + playerHandValue)
    console.log("Dealer Hand :: " + dealerHandValue)
    console.log("Dealer Turn :: " + dealerTurn)
    decideWinner()
  }, [dealerTurn,playerHandValue,dealerHandValue])

  useEffect( () => {
    dealerHit()
  },[dealerTurn,dealerHand])

  function handleHit() {
    console.log("PLAYER ACTION :: HIT")
    addCardToHand(deck,setPlayerHand,setPlayerHandValue)
  }

  function handleStand() {
    console.log("PLAYER ACTION :: STAND")
    setDealerTurn(true)
  }

  function dealerHit() {
    if( dealerTurn === true ) {
      if( dealerHand.length <= 5 && dealerHandValue < 17 ) {
        console.log("DEALER ACTION :: HIT :: " + dealerHandValue)
        addCardToHand(deck,setDealerHand,setDealerHandValue)
      } else {
        console.log("DEALER ACTION :: STAND :: " + dealerHandValue)
      }
    }
  }

  function decideWinner() {
    console.log("Checking for Winner...")
    // there is a winner
    if (dealerHandValue >= 17 || dealerHandValue === "BUST" || dealerHandValue === "WIN" || 
        playerHandValue === "BUST" || playerHandValue === "WIN" ) {
      console.log("Determining Winner...")
      // tie condition
      if (playerHandValue === dealerHandValue) {
        setGameState("PUSH (TIE)")
      // player win condition
      } else if (playerHandValue !== "BUST" && (playerHandValue === "WIN" || dealerHandValue === "BUST" || 
                (dealerTurn === true && dealerHandValue >= 17 && playerHandValue > dealerHandValue))) {
        setGameState("Player WIN")
      // player loss condition
      } else if (dealerHandValue === "WIN" || playerHandValue === "BUST" ||
                (dealerTurn === true && dealerHandValue >= 17 && dealerHandValue > playerHandValue)) {
        setGameState("Player LOSE")
      }
    }
  }

  return( 
  <>
    <div className="dealer-hand hand">
         {dealerHand}
         <h2>{dealerHandValue}</h2>
    </div>
    <h2>{gameState}</h2>
    <div className="player-hand hand">
         {playerHand}
         <h2>{playerHandValue}</h2>
    </div>
    <div className="button-box">
      <button className="hit_button" onClick={handleHit}>HIT</button>
      <button className="stand_button" onClick={handleStand}>STAND</button>
    </div>
  </>
  )
}

export default App;
