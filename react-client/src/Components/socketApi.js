// Importiere Socket Client Modul
import { io } from 'socket.io-client'

// Erstelle globale Variable socket, auf die später innerhalb dieser Datei zugegriffen werden kann
let socket

// Funktion um sich mit dem Socket zu verbinden
function connect(renderStart, renderNoSocket) {
  socket = process.env.NODE_ENV === 'production' ? io() : io('http://localhost:5000')

  // Sobald der Socket sich mit dem Backend verbunden hat, rendere die Start Seite
  socket.on('connect', () => {
    console.log('Client connected to Socket IO!')
    renderStart()
  })

  // Sobald der Socket die Verbindung mit dem Backend verloren hat, rendere wieder die 404 Page
  socket.on('disconnect', () => {
    renderNoSocket()
  })
}

// Wrapper function um einen Event Listener zu löschen
function deactivate(keyword) {
  socket.off(keyword)
}

// Wrapper function um eine Nachricht zu bekommen
function receive(keyword, cb) {
  deactivate(keyword)
  socket.on(keyword, (param) => {
    console.log(`Received from ${keyword}: `, param)
    cb(param)
  })
}

// Wrapper function um eine Nachricht zu senden
function send(keyword, value) {
  console.log(`Sending to ${keyword}: `, value)
  socket.emit(keyword, value)
}

// Exportiere diese Wrapper Funktionen, um von jeder Datei auf den Socket zugreifen zu können,
// ohne sich nochmal mit ihm zu verbinden.
export { receive, send, connect, deactivate }
