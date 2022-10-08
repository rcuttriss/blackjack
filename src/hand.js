function dealCard( deck ) {
    let randomIndex = Math.ceil(Math.random() * deck.length);
    let randomCard = deck[randomIndex];
    deck.splice(randomIndex, 1);
    return randomCard
}

export function dealHand( deck ) {
    return [dealCard(deck),dealCard(deck)]
}

export function getHandValue( hand ){
    let output = 0
    for(let c in hand){
        let cardVal = hand[c].props.number
        if (cardVal === "K" || cardVal === "Q" || cardVal === "J") cardVal = 10
        else if (cardVal === 'A') cardVal = 11
        output += parseInt(cardVal)
        if (output > 21) return "BUST"
    }
    if (output === 21 || hand.length === 5) return "WIN"
    return output.toString()
}

export function handleAce() {
    
}

export function addCardToHand( deck, setHand, setHandValue ) {
    let newCard = dealCard(deck)
    setHand(prevHand => {
      let phv = getHandValue(prevHand);
      if ( prevHand.length >= 5 || phv === "BUST" || phv === "WIN" ) return prevHand
      let newHand = [...prevHand, newCard]
      setHandValue(getHandValue(newHand))
      return newHand
    })
}

