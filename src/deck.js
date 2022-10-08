import Card from './card.js'
export default function Deck() {
    var deck = [];
    var suits = ["spade", "diamond", "club", "heart"];
    var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    for( let s in suits ) {
        for( let v in values ) {
            deck.push(
                <Card key={suits[s]+values[v]} suit={suits[s]} number={values[v]}/>
            )
        }
    }
    return deck;
}