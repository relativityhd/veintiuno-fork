// Dies ist die primäre Frontend Datei. Sie rendert die verschiedenen Seiten.
// So sollten die Kommentare der Datei gelesen werden (bzw. so habe ich sie geschrieben, hier und da mit Referenzen auf andere Files):
// index -> Sides -> Components
// Sides: SickSocket -> Start -> Lobby -> Game -> Ranks
// Imports von React Stuff
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'

// Importiere eigenes Socket Modul
import { connect, receive } from './Components/socketApi'

// Importiere CSS (Sass) und die einzelnen Seiten-Komponenten
import './Sass/index.scss'
import SickSocket from './Sides/SickSocket'
import Start from './Sides/Start'
import Lobby from './Sides/Lobby'
import Game from './Sides/Game'
import Rank from './Sides/Rank'

// Verbinde mit dem Socket des Backends
connect(renderStart, renderNoSocket)

// Globaler Benutzername, dient als Identifier
let username = ''
function setUsername(name) {
  username = name
}

// Render 404-Seite zum DOM-Root (zur HTML Seite)
function renderNoSocket() {
  ReactDOM.render(
    <React.StrictMode>
      <SickSocket />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// Render Username/Start-Seite zum DOM-Root (zur HTML Seite)
function renderStart() {
  ReactDOM.render(
    <React.StrictMode>
      <Start setUsername={setUsername} toLobby={renderLobby} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// Render Lobby-Seite zum DOM-Root (zur HTML Seite)
function renderLobby(players) {
  // players: Array aus Objects importiert aus Javas Player Klasse
  ReactDOM.render(
    <React.StrictMode>
      <Lobby username={username} players={players} leave={renderStart} toGame={renderGame} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// Render der Game-Seite zum DOM-Root (zur HTML Seite)
function renderGame(active, players, stack, moves) {
  // active: Benutzername des Spielers der gerade am Zug ist
  // players: Array aus Objects importiert aus Javas Player Klasse
  // stack: Array importiert aus Javas Stack MainGame Klasse
  // moves: Ganze Zahl, Anzahl an bisher getätigten Zügen
  ReactDOM.render(
    <React.StrictMode>
      <Game
        username={username}
        activeplayer={active}
        players={players}
        stack={stack}
        moves={moves}
        leave={renderStart}
        toRank={renderRank}
      />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// Render der Rank-Seite zum DOM-Root (zur HTML Seite)
function renderRank(gameinfo) {
  // gameinfo: Spielinfo importiert aus Javas GameInfo Klasse
  ReactDOM.render(
    <React.StrictMode>
      <Rank gameinfo={gameinfo} leave={renderStart} />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

// Rendere Standart Mäßig die 404 Page
renderNoSocket()

// Irrelevant (glaube ich...)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
