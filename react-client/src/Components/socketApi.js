// Importiere Socket Client Modul
import openSocket from 'socket.io-client';

// Erstelle globale Variable socket, auf die später innerhalb dieser Datei zugegriffen werden kann
let socket;

// Funktion um sich mit dem Socket zu verbinden
function connect() {
    socket = openSocket('http://localhost:9092');
    socket.on('connect', () => {
        console.log("Client connected to Socket IO!")
    })
}

// Wrapper function um einen Event Listener zu löschen
function deactivate(keyword) {
    socket.off(keyword)
}

// Wrapper function um eine Nachricht zu bekommen
function receive(keyword, cb) {
    socket.off(keyword);
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
export { receive, send, connect, deactivate };
