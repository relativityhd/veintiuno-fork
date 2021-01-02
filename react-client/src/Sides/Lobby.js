// Lobby Page
// Importiert React Shit
import React, {Component} from 'react';
import $ from "jquery"
import { receive, send, deactivate } from '../Components/socketApi.js';
import '../Sass/Lobby.scss';

// Importiert eigene Komponenten
import MyTopAppBar from '../Components/TopAppBar';
import { OwnCard, UserCard, AICard } from '../Components/PlayerCards';

// Importiert MDC (Material Design Components) Komponenten
import { Cell, Grid, Row } from '@material/react-layout-grid';
import { Headline3, Overline, Subtitle1 } from '@material/react-typography';
import LinearProgress from '@material/react-linear-progress';

/**
 * Lobby Klasse
 * ==
 * React Komonente, welche die Lobby Seite darstellt.
 */
class Lobby extends Component {

  // Sachen zum Konstruktor und zur React Komponente an sich sind in Start.js besser erklärt!
  constructor(props) {
    super(props)
    this.username = props.username
    this.lobbyPlayers = props.players
    this.isAdmin = false
    this.leave = props.leave
    this.toGame = props.toGame
    this.state = {players: this.lobbyPlayers, time: "Loading Lobby information...", isAdmin: this.isAdmin}

    // Timer variablen
    this.changed_status = 0
    this.countdownStarted = false
    this.gameStarts = false
  }


  // Bevor die Seite geschlossen wird, soll der Server noch über dieses Verlassen aufgeklärt werden
  // Das ist eine Funktionsdefinition, also gleich wie: function onUnload (e) {...} , nur halt in Java Script
  onUnload = e => {
    this.leaveUser()
    send("KickPlayer", this.username)
  }

  // Funktion wird direkt nach dem rendern ausgeführt
  componentDidMount() {
    // Verstecke Zeit Progress Bar
    $('.progress-bar-lobby').hide()
    // Intitiere Player Karten
    this.playerUpdate(this.lobbyPlayers)

    // Aktiviere Scoket Event Listener (Kurze Erklräung zum Event Listener in Start.js)
    // Immer wenn ein Spieler hinzukommt oder leavt wird ein PlayerUpdate ausgeführt
    receive("PlayerUpdate", (players) => {
      this.playerUpdate(players) })
    // Sollte es zu einem Fehler beim hinzufügen der AI kommen, wird eine Fehlermeldung angezeigt
    receive("AIError", (error_msg) => {
      this.changeStatus(error_msg) })
    // Wechsel zur Game Seite
    receive("ToGame", (gameinfo) => {
      let userInGame = gameinfo.playerList.findIndex(player => player.username === this.username)
      if (userInGame !== -1) this.toGame(gameinfo.player.username, gameinfo.playerList, gameinfo.stack, gameinfo.moves)
      else this.leave()
    })

    // Vor Seiten Verlassen
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
    deactivate("AIError")
    deactivate("ToGame")
  }

  // Spieleränderung -- Immer wenn ein Spieler joint oder leavt
  playerUpdate(players) {
    // Wenn der Spieler nicht mehr in der Lobby ist, so wird er zurück zum Start gelenkt. (Passiert z.B. wenn der Spieler gekickt wurde)
    if (players.findIndex(player => player.username===this.username)===-1) {
      this.leave()
    } else {
      // Rerendert die PlayerCards und setzt die Statusbenachichtigung
      this.lobbyPlayers = players
      // Sobald zwei oder mehr Spieler in der Lobby sind, ist der Lobby Leader dazu in der Lage das Spiel zu starten
      let time = this.lobbyPlayers.length >= 2 ? "Waiting for Lobby Leader to start..." : "Waiting for Players..."
      this.setState({players: this.lobbyPlayers, time: time})
      $('.member-count').html(this.lobbyPlayers.length+"/6")

      // Nur relevant für den Lobby Leader -> wichtig für den Timer
      if (this.lobbyPlayers.length < 2 && !this.gameStarts) this.countdownStarted = false
      if (!this.countdownStarted && this.lobbyPlayers.length >=2 && !this.gameStarts) this.countdownStarted = Date.now()
      
      // Admin Wechsel (Passiert eigentlich nicht, war aber mal anders geplant)
      let wasAdmin = this.isAdmin
      this.isAdmin = false
      this.lobbyPlayers.forEach((player) => {
        if (player.admin && player.username === this.username) {
          this.isAdmin = true
          this.setState({isAdmin: this.isAdmin})
        }
      })

      // Aktiviert bzw. Deaktiviert je nach Spieleranzahl bestimmte Buttons für den Admin.
      // In einer Timeoutfunktion um sicher zu stellen, dass die Knöpfe fertig gerendert wurden.
      setTimeout(() => {
        if (this.lobbyPlayers.length >= 6 && this.isAdmin) $('.add-ai').prop("disabled", true)
        else if (this.isAdmin) $('.add-ai').prop("disabled", false)
        if (this.lobbyPlayers.length < 2 && this.isAdmin) $('.start-btn').prop("disabled", true)
        else if (this.isAdmin) $('.start-btn').prop("disabled", false)
      }, 500)
      
      // Starte Timer für Admin
      if (!wasAdmin && this.isAdmin) {
        setInterval(() => {
          this.updateTime()
        }, 1000)
      }
    }
  }

  // Ändere die Status Nachricht und entferne sie nach 3 Sekunden wieder 
  changeStatus(message) {
    this.changed_status = Date.now()
    $('.status').html(message)
    if (!$('.status').hasClass("error")) $('.status').addClass("error")
    setInterval(() => {
      if (Date.now() - this.changed_status >= 3000) {
        $('.status').html(" ")
        if ($('.status').hasClass("error")) $('.status').removeClass("error")
      }
    }, 3000)
  }

  // Timer Funktion für Admin 
  // Funktionert, ist aber bei Veränderung sehr Fehleranfällig!!!
  updateTime() {
    if (this.gameStarts) {
      this.countdownStarted = false
      this.setState({time: "Game is starting..."})
    } else if (this.countdownStarted) {
      let secondstillstart = 60
      let restseconds = Math.round((this.countdownStarted+(secondstillstart*1000)-Date.now())/1000, 0)
      this.setState({time: "Time until the game starts: "+ restseconds +"s"})
      if (this.countdownStarted+(secondstillstart*1000)-Date.now() < 0) {
        this.startGame(true)
        this.countdownStarted = false
        this.gameStarts = true
        this.setState({time: "Game is starting..."})
      }
    } else if (!this.gameStarts) {
      this.setState({time: "Waiting for Players..."})
    }
  }

  // Spieler geht zurück zur Startseite, benachrichtige backend darüber
  goToStart() {
    send("KickPlayer", this.username)
    this.leave()
  }

  // Entferne einen Spieler der Lobby
  kickPlayer(username) {
    if (this.isAdmin) {
      send("KickPlayer", username)
    } else { this.changeStatus("You are not the admin, you cannot do this!") }
  }

  // Funktion um AI Namen zu bestimmen (Benannt nach Elon Musks Sohn X Æ A-12 (Kyle))
  getAIName() {
    let aicount = 0,
        searching = true,
        ainame = "X Æ A-12-"+aicount
    while (searching) {
      aicount++
      ainame = "X Æ A-12-"+aicount
      let n = ainame
      if (this.lobbyPlayers.findIndex(p => p.username === n ) === -1) {
        searching = false
      }
    }
    return ainame
  }

  // Füge der Lobby eine AI hinzu
  addAI() {
    if (this.isAdmin && this.lobbyPlayers.length < 6) {
      send("AddAI", this.getAIName())
    } else if (!this.isAdmin) this.changeStatus("You are not the admin, you cannot do this!")
    else if (this.lobbyPlayers.length >= 6) this.changeStatus("Lobby is full, you cannot create more virtual players!")
  }

  // Starte das Spiel
  startGame(autostart) {
    if (this.isAdmin || autostart) {
      this.gameStarts = true
      $('button').prop("disabled", true)
      $('.progress-bar-lobby').show()
      if (this.isAdmin) send("StartGame")
    }
  }

  // HTML React render Stuff
  render() {
    return (
      <div>
        <MyTopAppBar/>
        <div className="Wrapper">
          <div className="Lobby">
            <Grid>
              <Row>
                <Cell desktopColumns={4} phoneColumns={4} tabletColumns={4} order={1}>
                  <Headline3>You</Headline3>
                  <OwnCard username={this.username} isAdmin={this.state.isAdmin} parent={this} />
                  <Overline className="time">{this.state.time}</Overline>
                  <Subtitle1 className="status"></Subtitle1>
                  <LinearProgress className="progress-bar-lobby" indeterminate={true} />
                </Cell>
                <Cell desktopColumns={8} phoneColumns={4} tabletColumns={4} order={2}>
                  <Headline3>Your Lobby <span className="member-count">X/6</span></Headline3>
                  <div className="player-cards-wrapper">
                    {
                      // Fügt für jeden Spieler außer dem eigenen Benutzer eine eigene Karte hinzu
                      this.state.players.map((item) => (
                        (!item.ai && item.username !== this.username) ?
                        <UserCard username={item.username} isAdmin={this.state.isAdmin} parent={this} key={item.username} />
                        : (item.ai && item.username !== this.username) ?
                        <AICard ainame={item.username} isAdmin={this.state.isAdmin} parent={this} key={item.username} />
                        : ""
                      ))
                    }
                  </div>
                </Cell>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

// Exportiere Lobbyseite als Modul
export default Lobby;
