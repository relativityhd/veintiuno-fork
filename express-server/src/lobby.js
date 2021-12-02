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
const { v4: uuidv4 } = require('uuid')
const { Player, MainGame } = require('./game')

function validateUsername(username) {
  return /^[ -~]+$/.test(username) && !userNames.includes(username)
}

class Lobby {
  constructor(admin) {
    console.log('--DEBUG  ~ file: handle.js ~ line 13 ~ Lobby ~ constructor ~ admin', admin)
    this.roomId = `lobby-${uuidv4()}`
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
