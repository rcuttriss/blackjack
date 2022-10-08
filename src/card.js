export default function Card(props) {
    let suitURL = "./res/suits/" + props.suit + ".png"
    return <div className="card-container">
        <div className="card card-front">
            <div className="card-number">{props.number}</div>
            <div className="card-number-inverse">{props.number}</div>
            <img className="card-suit" src={suitURL}></img>
        </div>
        <div className="card card-back"></div>
    </div>
}