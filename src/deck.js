import Card from './card.js'
export default function Deck() {
    let deck = [];
    let suits = ["spade", "diamond", "club", "heart"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    // let values = ["A", "2","3","4","5"]
    for( let s in suits ) {
        for( let v in values ) {
            deck.push(
                <Card key={values[v]+suits[s]} suit={suits[s]} number={values[v]}/>
            )
        }
    }
    return deck;
}