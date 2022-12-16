export default function Card({suit, number}) {
    return <div className="card-container">
        <div className="card card-front">
            <div className="card-number">{number}</div>
            <div className="card-number-inverse">{number}</div>
            <img className="card-suit" src={"./res/suits/" + suit + ".png"}></img>
        </div>
        <div className="card card-back"></div>
    </div>
}