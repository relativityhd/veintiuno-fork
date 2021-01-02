// Startseite
// Importiert React Shit, JQuery, Socket Modul und CSS (Sass)
import React, {Component} from 'react';
import $ from "jquery"
import { receive, send, deactivate } from '../Components/socketApi.js';
import '../Sass/Start.scss';

// Importiert eigene Komponenten
import MyTopAppBar from '../Components/TopAppBar.js';

// Importiert MDC (Material Design Components) Komponenten
import TextField, {Input} from '@material/react-text-field';
import Button from '@material/react-button';
import { Headline1, Overline } from '@material/react-typography';
import LinearProgress from '@material/react-linear-progress';

/**
 * Start Komonente
 * ==
 * React Komonente, welche die Start Seite darstellt
 */
class Start extends Component {

  // Definiere Komponenten Variablen
  constructor(props) {
    // "probs" sind die übergebenen Parameter beim Aufruf der Klasse
    super(props)
    this.username = ""
    this.setUsername = props.setUsername
    this.toLobby = props.toLobby
    // "state" ist eine sehr wichtige Variable. React ist "stateful". Das bedeutet, dass sobald ein Wert
    // dieses States sich ändert Komponenten welche durch diesen State beeinflusst werden neu gerendert werden
    // Der Wert von state wird mit this.setState(myobj) geändert
    this.state = {username: this.username}
  }

  // Sobald die Komponente gerendert ist, wird diese Funktion aufgerufen
  componentDidMount() {
    // Versteckt die Loading Progress Bar und deaktiviert den Join Button
    $('.progress-bar').hide()
    $('.join-btn').prop('disabled', true)

    // Setze die Socket Event Listener auf
    // Der Event Listener ist dafür dar, auf Events zu reagieren, die er vom Sever empfängt
    // Repsonse ob ein Benutzername schon benutzt wurde (valid==false beduetet er wurde schon benutzt)
    receive("ValidUsername", (valid) => { this.validResponse(valid) })
    // Gehe zur Lobby Seite, sollte der Spieler in der Spielerliste der Lobby sein
    receive("ToLobby", (players) => {
      let userInGame = players.findIndex(player => player.username === this.username)
      if (userInGame !== -1) this.toLobby(players) })
    // Fehlermeldung bei Lobby Beitritt
    receive("LobbyError", (error_msg) => { this.joinGameError(error_msg) })
  }

  // Bevor die Komponente "entrendert" wird (Sozusagen beendet, weil die nächste Seite aufgerufen wird),
  // müssen die Socket Eventlistener ausgeschaltet werden
  componentWillUnmount() {
    deactivate("ValidUsername")
    deactivate("ToLobby")
    deactivate("LobbyError")
  }

  // Bei jedem Tastendruck soll die Gültigkeit des eingegebenen Inputs überprüft werden
  onTipp (e) {
      this.username = e.currentTarget.value.replace(/\W/g, '')
      this.setState({username: this.username})
    if (e.currentTarget.value.match(/^(XA12){1}(\d)+$/g)) {
      this.failGame("Username '" + this.username + "' is reserved for the computer.")
      $('.join-btn').prop('disabled', true)
    } else if (this.validate()) {
        send("ProofUsername", this.username)
        $('.join-btn').prop('disabled', true)
    } else {
      $('.join-btn').prop('disabled', true)
    }
  }

  validResponse (valid) {
    // Überprüfter Nutzername ist auch letzter eingegebener Nutzername und ist valid
    if (valid) {
      this.failGame("")
      $('.join-btn').prop('disabled', false);
    } else {
      this.failGame("Username '" + this.username + "' is already taken.")
      $('.join-btn').prop('disabled', true)
    }
  }

  // Überprüfe ob der eingegebene Input 0 ist
  validate () {
    return (!["", " ", 0, null, undefined].includes(this.username) && this.username.length) ? true : false
  }

  // Versuche Lobby beizutreten
  joinGame() {
    if (this.validate()) {
      // Zeige Loading Progress Bar, deaktiviere Benutzerinput und Join Button
      $('.progress-bar').show()
      $('.username-inp').prop('disabled', true)
      $('.join-btn').prop('disabled', true)
      send("JoinLobby", this.username)
      this.setUsername(this.username)
    } else {
      this.failGame("Your need to enter a username first!")
    }
  }

  // Fehler beim Beitreten
  joinGameError(error_msg) {
    this.failGame(error_msg)
    $('.progress-bar').hide()
    $('.username-inp').prop('disabled', false)
  }

  // Konnte keinem Spiel joinen
  failGame(msg) {
    $('.fail-msg').html(msg)
  }

  // UX: Sobald der Spieler im Benutzerinput Enter drückt wird automatisch
  // virtuell der JoinButton gedrückt, bzw. seine Aktion ausgeführt
  _handleKeyDown(e) {
    if (e.key === 'Enter') { this.joinGame() }
  }

  // HTML React render Inhalt
  render () {
    return (
      <div>
        <MyTopAppBar/>
        <div className="Wrapper">
          <div className="Lobby">
            <Headline1 className="headline">Let's join a game</Headline1>
            <div className="interaction" >
              <TextField className="username-field" label='Enter Username'>
                <Input
                  className="username-inp"
                  value={this.state.username}
                  onChange={(e) => {this.onTipp(e)}}
                  onKeyDown={(e) => {this._handleKeyDown(e)}} />
              </TextField>
              <div className="btn-wrapper">
                <Button className="join-btn"
                  raised={true}
                  onClick={() => {this.joinGame()}}
                >Join a Game!</Button>
                </div>
            </div>
            <LinearProgress className="progress-bar" indeterminate={true} />
            <Overline className="fail-msg"></Overline>
          </div>
        </div>
      </div>
    )
  }
}

// Exportiere Startseite als Modul
export default Start;
