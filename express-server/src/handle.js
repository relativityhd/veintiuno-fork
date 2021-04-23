const { Player, MainGame } = require('./game')
const { v4: uuidv4 } = require('uuid')

const lobbies = []
const userNames = []

function validateUsername(username) {
  return /^[ -~]+$/.test(username) && !userNames.includes(username)
}

class Lobby {
  constructor(admin) {
    console.log('--DEBUG  ~ file: handle.js ~ line 13 ~ Lobby ~ constructor ~ admin', admin)
    this.room = `lobby-${uuidv4()}`
    this.admin = admin.username
    this.game = new MainGame()
    this.game.addGameMember(admin)
  }

  isFull() {
    return this.game.isFull()
  }

  kickPlayer(username) {
    userNames.splice(userNames.indexOf(username), 1)
    this.game.removeGameMember(username)
    if (this.game.gameMember.length === 0) {
      this.admin = ''
    }
    if (this.admin === username) {
      const newAdmin = this.game.gameMember[0]
      this.admin = newAdmin.username
      newAdmin.admin = true
    }
  }

  handleAction(action) {
    if (action <= 0 || action > 9) {
      return this.game.add(action)
    }
    return this.game.pass()
  }
}

class UserHandle {
  constructor(socket) {
    this.socket = socket
    this.player = undefined
    this.lobby = undefined
  }

  joinLobby(username) {
    userNames.push(username)
    this.player = new Player(username)

    if (lobbies.filter((lobby) => !lobby.isFull()).length === 0) {
      this.player.admin = true
      const newLobby = new Lobby(this.player)
      lobbies.push(newLobby)
      this.lobby = newLobby
    } else {
      this.lobby = lobbies.filter((lobby) => !lobby.isFull())[0]
      this.lobby.game.addGameMember(this.player)
    }
  }
}

/**
 * Sockets:
 * - on ProofUsername (username)
 *   - emit ValidUsername -> bool
 * - on AddAI (aiName)
 *   - room PlayerUpdate -> Player[]
 *   - emit AIError -> 'Game is full'
 * - on JoinLobby (newPlayer)
 *   - room PlayerUpdate -> Player[]
 *   - emit ToLobby -> Player[]
 *   - emit LobbyError -> 'Couln't join Lobby, try again'
 * - on KickPlayer (playerToKick)
 *   - room PlayerUpdate -> Player[]
 * - on UserAction (actionValue)
 *   - room Next -> RoundInfo
 *   - emit GameStackException -> 'Coulnd't do shit'
 *   - room GameOver -> GameOverInfo
 * - on StartGame ()
 *   - room ToGame ->  RoundInfo
 * - on RanksReq ()
 *   - emit RanksRes -> TopTenScores[]
 */
function handleGame(io) {
  io.on('connection', (socket) => {
    const userHandle = new UserHandle(socket)

    socket.on('ProofUsername', (username) => {
      socket.emit('ValidUsername', validateUsername(username))
    })

    socket.on('AddAI', (aiName) => {
      // TODO:
    })

    socket.on('JoinLobby', (username) => {
      if (!validateUsername(username)) {
        return socket.emit('LobbyError', 'Could not join lobby, invalid Username!')
      }
      userHandle.joinLobby(username)
      socket.join(userHandle.lobby.room)
      console.log('--DEBUG  ~ file: handle.js ~ line 131 ~ socket.on ~ userHandle.lobby.room', userHandle.lobby.room)
      console.log(
        '--DEBUG  ~ file: handle.js ~ line 127 ~ socket.on ~ userHandle.lobby.game.gameMember',
        userHandle.lobby.game.gameMember
      )
      io.to(userHandle.lobby.room).emit('PlayerUpdate', userHandle.lobby.game.gameMember)
      socket.emit('ToLobby', userHandle.lobby.game.gameMember)
    })

    socket.on('KickPlayer', (username) => {
      userHandle.lobby.kickPlayer(username)
      io.to(userHandle.lobby.room).emit('PlayerUpdate', userHandle.lobby.game.gameMember)
    })

    socket.on('UserAction', (value) => {
      const info = userHandle.lobby.handleAction(value)
      if (!info) {
        return socket.emit('GameStackException', 'Wrong input!')
      }
      if (info.winner) {
        return io.to(userHandle.lobby.room).emit('GameOver', info)
      }
      io.to(userHandle.lobby.room).emit('Next', info)
      // TODO: AI
    })

    socket.on('StartGame', () => {})
  })
}

function getData() {
  return { lobbies, userNames }
}

module.exports = { handleGame, getData }
