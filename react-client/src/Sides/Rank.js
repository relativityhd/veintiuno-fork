// Rank Page
// Importiert React Shit
import React, {Component} from 'react';
import { receive, send, deactivate } from '../Components/socketApi.js';
import '../Sass/Rank.scss'

// Importiert eigene Komponenten
import MyTopAppBar from '../Components/TopAppBar';
import {UserCardWinner, UserCardOther } from '../Components/PlayerCardsRank';

// Importiert MDC (Material Design Components) Komponenten
import Button from '@material/react-button';
import { Headline1, Headline4 } from '@material/react-typography';


/**
 * Rank Klasse
 * ==
 * React Komonente, welche die Rank Seite darstellt.
 */
class Rank extends Component {
    
  // Initiert den Constructor (In Start.js besser erklärt)
  constructor(props) {
    super(props)
    this.gameinfo = props.gameinfo
    this.besties = []
    this.state = {winner: this.gameinfo.winner, besties: this.besties}
    this.leave = props.leave
  }

  // Sobald die Komponente gerendert wurde wird diese Funktion direkt aufgerufen
  componentDidMount() {
    // Sobald ein Response für die Bestenliste reinkommt, soll diese gerendert werden (stateful!)
    receive("RanksRes", (besties) => {
      this.besties = besties
      this.setState({besties: this.besties})
    })

    // Deaktiviere den Socket Event Listener
    window.addEventListener("beforeunload", function (event) {
      deactivate("RanksRes")
    })

    // Frage Bestenliste vom Server an
    send("RanksReq")
  }

  // Deaktiviere Socket Event Listener
  // ToDO: Wo liegt der unterschied zu z 40
  componentWillUnmount() {
    deactivate("RanksRes")
  }

  // Render Befehl wird bei jedem "DOM"-Render ausgeführt 
  render() {
    return (     
      <div>
        <MyTopAppBar isGold={true} />
        <div className="Wrapper">
          <Headline1 className="headlineColor">AND THE WINNER IS...</Headline1>
          <UserCardWinner username={this.state.winner.username} />
          <Button className="back-btn"
                  raised={true}
                  onClick={() => {this.leave()}}
                >New Game</Button>
          <Headline4 className="hall-of-game-title">Hall of Game:</Headline4>
          <div className="rangliste">
            { // rendert die Bestenliste
            this.state.besties.map((player, index) => (
              <UserCardOther rankPos = {index+1} username={player.username} wins={player.score} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Rank;
