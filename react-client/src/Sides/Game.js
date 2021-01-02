// Game Seite
// Importiert React Shit
import React, {Component} from 'react';
import $ from "jquery"
import { receive, send, deactivate } from '../Components/socketApi.js';
import '../Sass/Game.scss';
import TextField, {Input} from '@material/react-text-field';

// Importiert eigene Komponenten
import MyTopAppBar from '../Components/TopAppBar.js';
import { UserIcon } from '../Components/Players.js';

// Importiert MDC (Material Design Components) Komponenten
import Button from '@material/react-button';
import LinearProgress from '@material/react-linear-progress';
import { Headline2, Headline6, Overline } from '@material/react-typography';

/**
 * Game Klasse
 * ==
 * React Komonente, welche die Game Seite darstellt.
 */
class Game extends Component {

  // Initiert den Constructor (Auch hier ist alles in der Start.js besser erklärt)
  constructor(props) {
    super(props)
    this.add_nr = 0;
    this.username = props.username
    this.activeplayer = props.activeplayer
    this.players = props.players
    this.stack = props.stack
    this.moves= props.moves
    this.timer = 0
    this.leave = props.leave
    this.toRank = props.toRank
    this.state = { players: this.players, add_nr: "", timer: this.timer }
  }

  // Bevor die Seite geschlossen wird, soll der Server noch über dieses Verlassen aufgeklärt werden
  // Btw, ditt is ne Funktionsdefinition, also gleich wie: function onUnload (e) {...} , nur halt in JavaSciptischer
  onUnload = e => {
    this.leaveUser()
    send("KickPlayer", this.username)
    if (this.username === this.activeplayer) this.addNumber(1)
  }

  // Funktion wird direkt nach dem rendern ausgeführt
  componentDidMount() {
    // Deaktiviere Aktionbuttons und verstecke Fehlermeldungsfeld
    $('.add-btn').prop('disabled', true)
    $('.pass-btn').prop('disabled', true)
    $('.fail-msg').hide()
    this.nextPlayer()
    this.newStack()

    // SocketIO Event Listener
    // Gleiches Prinzip wie in Lobby.js
    receive("PlayerUpdate", (players) => {
      this.playerUpdate(players) })
    // Nächster Spieler ist dran
    receive("Next", (roundinfo) => {
      this.stack = roundinfo.stack
      this.moves = roundinfo.moves
      this.activeplayer = roundinfo.player.username
      this.nextPlayer()
      this.newStack()
    })
    // Spiel ist zuende, die Spieler sollen auf die nächste Seite "Ranks" weitergeleitet werden
    receive("GameOver", (gameinfo) => {
      this.toRank(gameinfo)
    })
    // Fehlermeldung
    receive("GameStackException", () => {
      this.nextPlayer()
      this.newStack()
      $('.fail-msg').html("Server Error!")
      $('.fail-msg').show()
    })

    window.addEventListener("beforeunload", this.onUnload)
  }

  // Vor Entrendern
  componentWillUnmount() {
    this.leaveUser()
    window.removeEventListener("beforeunload", this.onUnload)
  }

  // Deaktiviert Socket Eventlisteners
  leaveUser() {
    deactivate("PlayerUpdate")
    deactivate("Next")
    deactivate("GameOver")
  }

  // Spieler Änderung (nur verlassen, während des Spiels darf keiner mehr beitreten)
  playerUpdate(players) {
    if (players.findIndex(player => player.username===this.username)===-1) {
      this.leave()
    } else {
      this.players = players
      this.setState({players: this.players})
      this.nextPlayer()
    }
  }

  // Nächster Spieler ist am Zug
  nextPlayer() {
    if (this.activeplayer === this.username) {
      // Man selbst ist dran -> Timer wird gestartet
      this.resetTimer()
      this.validate()
    }
    this.handleButtons()
    // Transitions / Effekte bei Spielerwechsel
    this.calcClasses()
  }

  // Stack hat sich verändert
  newStack() {
    $('.stack-line').html(this.stack.join(', '))
    $('.stack-sum').html(this.stack[this.stack.length-1])
    // Bounce Effekt 
    $('.stack-sum').addClass('stack-sum-transition')
    setTimeout(() => {
      $('.stack-sum').removeClass('stack-sum-transition')
    }, 200)
    
    this.handleButtons()
    this.validate()
  }

  // Funktion, welche nach jedem Spielerwechsel die Positionen der einzelnen Icons neu berechnet
  calcClasses() {
    let len = this.players.length
    let act = this.players.findIndex(p => p.username === this.activeplayer)

    // ToDO
    if (act !== -1) {
      this.players.forEach((player, index) => {
        let gcard = $('#gcard-'+player.username.replace(/\W/g, ''))
        if (gcard.length) {
          // Formular = (Len + Act - Index) % LEN
          let pos = (len + act - index) % len
          // Is Active
          if (pos === 0) {
            gcard.removeClass("faded")
            gcard.addClass("active")
            gcard.css({"top": "630px", "left": "calc(50% - 55px)"})
          } else {
            gcard.removeClass("active")
            gcard.addClass("faded")
            if ((len===2 && pos===1) || (len===4 && pos===2) || (len===6 && pos===3)) {
              gcard.css({"top": "100px", "left": "calc(50% - 55px)"})

            } else if ((len===3 && pos===1) || (len===5 && pos===2) || (len===6 && pos===2)) {
              gcard.css({"top": "200px", "left": "calc(30% - 55px)"})

            } else if ((len===3 && pos===2) || (len===5 && pos===3) || (len===6 && pos===4)) {
              gcard.css({"top": "200px", "left": "calc(70% - 55px)"})

            } else if ((len===4 && pos===1) || (len===5 && pos===1) || (len===6 && pos===1)) {
              gcard.css({"top": "380px", "left": "calc(20% - 55px)"})

            } else if ((len===4 && pos===3) || (len===5 && pos===4) || (len===6 && pos===5)) {
              gcard.css({"top": "380px", "left": "calc(80% - 55px)"})
            }
          }
        }
      })
    }
  }

  // Im folgenden: Timer Funktionen (möglicherweise instabil, sollte man Änderungen vornehmen!)
  resetTimer() {
    this.timer = 60
    this.runTimer()
  }

  unsetTimer() {
    this.timer = -1
    this.setState({timer: 0})
    $('.pass-progress').hide()
  }
  // ToDO
  runTimer() {
    if (this.timer <= 0 || this.username !== this.activeplayer) {
      this.unsetTimer()
    } else {
      setTimeout(() => {
        this.timer-=0.1
        if (this.timer <= 0 && this.timer > -1) {
          if (this.stack.length <= 1 || (this.moves < 3 && this.activeplayer === this.username)) this.addNumber(1)
          else if (this.activeplayer === this.username) this.sendPass()
          this.unsetTimer()
        } else {
          this.setState({timer: this.timer})
          if (this.username === this.activeplayer && this.timer > 0) this.runTimer()
        }
      }, 100)
    }
  }

  // Überorüft, ob der derzeitige Benutzer Input valid ist
  validate () {
    // Nur der Spieler der gerade am Zug ist, darf etwas eingeben
    this.handleButtons()
    if (this.username === this.activeplayer) {
      $('.fail-msg').hide()
      // Eingegebene Zahl muss zwischen inklusive 1 und 9 sein, außerdem darf der Stack nicht länger als 6 werden.
      if (this.add_nr < 10 && this.add_nr > 0) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  // Bei jedem Tastendruck ins Inputfeld wird der Input überprüft
  onTipp (e) {
    // Lässt nur eine einzige Zahl zu -> wer 5 und dann 9 eintippt bekommt 9 anstatt 59 angezeigt
    let pot_nr = e.currentTarget.value.slice(-1)
    // Lang lebe RegEx!
    if (pot_nr.match(new RegExp("^[123456789]{1}$"))){
      this.add_nr = parseInt(pot_nr)
      this.setState({add_nr: pot_nr})
    } else if (pot_nr === "") {
      this.add_nr = 0
      this.setState({add_nr: ""})
    }
    this.validate()
  }

  // Füge eine Nummer dem Stack hinzu
  addNumber(nmb) {
    console.log("Adding a number: ", this.add_nr.toString())
    $('.fail-msg').hide()
    if (this.validate()) {
      this.timer = -1
      send("UserAction", this.add_nr.toString())
      this.disableActions()
    } else if (nmb) {
      send("UserAction", nmb)
      this.disableActions()
    } else if (this.username !== this.activeplayer) {
      $('.fail-msg').html("It is not your turn!")
      $('.fail-msg').show()
    } else {
      $('.fail-msg').html("Invalid Input!")
      $('.fail-msg').show()
    }
  }

  // Passe
  sendPass(){
    console.log("Sending Pass, however")
    $('.fail-msg').hide()
    if (this.username === this.activeplayer) {
      this.timer = -1
      send("UserAction", "0")
      this.disableActions()
    } else {
      $('.fail-msg').html("It is not your turn!")
      $('.fail-msg').show()
    }
  }

  // Deaktiviere alle Buttons
  disableActions() {
    $('.act-btn').prop('disabled', true)
    $('.username-inp').prop('disabled', true)
    $('.pass-btn').prop('disabled', true)
    $('.pass-progress').hide()
  }

  // Aktiviert und Deaktiviert die einzelnen Buttons
  handleButtons() {
    // Wenn Spieler dran nicht dran ist -> Alles deaktivieren
    if (this.username !== this.activeplayer) {
      this.disableActions()
    // Wenn Spieler dran ist: Input aktivieren, restliche Buttons überprüfen
    } else {
      $('.username-inp').prop('disabled', false)
      $('.pass-progress').show()

      // Add Button
      if (this.add_nr < 10 && this.add_nr > 0) {
        $('.act-btn').prop('disabled', false)
      } else {
        $('.act-btn').prop('disabled', true)
      }

      // Pass Button
      if (this.stack.length >= 2 && this.moves >= 3) {
        $('.pass-btn').prop('disabled', false)
      } else {
        $('.pass-btn').prop('disabled', true)
      }

    }
  }

  // UX: Sobald der Spieler im Benutzerinput Enter drückt wird automatisch
  // virtuell der JoinButton gedrückt, bzw. seine Aktion ausgeführt
  _handleKeyDown(e) {
    if (e.key === 'Enter') { this.addNumber() }
  }
  

  // Render Befehl wird bei jedem "DOM"-Render ausgeführt 
  render() {
    // Render muss folgendes returnen [ja mit den runden Klammern!]: (<div>[Hier eigenes HTML/React]</div>)
    return (
      <div>
        <MyTopAppBar/>
        <div className="Wrapper no-center">
          <div className="players">{
            // Rendert alle Spieler
            this.state.players.map((player, i) => {
              return (<UserIcon username={player.username} isAi={player.ai} key={i} isSelf={this.username===player.username} />)
            })}
          </div>
          <div className="Game">
            <div className="game-interaction">
              <Headline2 className="stack-sum"></Headline2>
              <Headline6 className="stack-line"></Headline6>
              <div className="action-wrapper">
                <TextField className="number-field" label='Enter Number'>
                  <Input
                    className="username-inp"
                    value={this.state.add_nr}
                    onKeyDown={(e) => {this._handleKeyDown(e)}}
                    onChange={(e) => {this.onTipp(e)}} />
                </TextField>

                <Button
                  className="act-btn add-btn"
                  raised={true}
                  onClick={() => {this.addNumber()}}>
                    ADD
                </Button>

                <Button
                  className="act-btn pass-btn"
                  raised={true}
                  onClick={() => {this.sendPass()}}>
                    PASS
                </Button>
                
                <LinearProgress className="pass-progress" buffer={(60-this.state.timer) / 60} progress={0} bufferingDots={false} indeterminate={false} />
                <Overline className="fail-msg"></Overline>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
