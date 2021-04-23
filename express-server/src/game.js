class MainGame {
  constructor() {
    this.moves = 0
    this.maxStackLength = 6
    this.maxPlayerNumber = 6
    this.gameStack = []
    this.gameMember = []
  }

  addGameMember(newPlayer) {
    this.gameMember.push(newPlayer)
  }

  removeGameMember(username) {
    const i = this.gameMember.findIndex((member) => member.username === username)
    return this.gameMember.splice(i, 1)
  }

  isFull() {
    return this.gameMember.length === 6
  }

  nextRound() {
    if (this.getLastStackNumber() >= 21) {
      return { winner: this.gameMember[this.moves % this.gameMember.size()], num: this.getLastStackNumber() }
    }
    this.moves = this.moves + 1
    this.gameMember[(this.moves - 1) % this.gameMember.length].setActivity(false)
    this.gameMember[this.moves % this.gameMember.length].setActivity(true)
    return false
  }

  getLastStackNumber() {
    return this.gameStack[this.gameStack.length - 1]
  }

  gameStart() {
    this.gameMember[0].setActivity(true)
    return new RoundInfo(this.gameMember[0], this.gameStack, this.moves, this.gameMember)
  }

  add(inputNumber) {
    if (this.gameStack.length < this.maxStackLength) {
      this.gameStack.push(inputNumber)
    } else {
      this.gameStack.push(this.gameStack.pop() + inputNumber)
    }
    const winner = this.nextRound()
    if (winner) {
      return winner
    }
    return new RoundInfo(this.gameMember[this.moves % this.gameMember.length], this.gameStack, this.moves)
  }

  pass() {
    if (moves < 3 || gameStack.size() < 2) {
      return false
    }

    this.gameStack.push(this.gameStack.pop() + this.gameStack.pop())
    const winner = this.nextRound()
    if (winner) {
      return winner
    }
    return new RoundInfo(this.gameMember[this.moves % this.gameMember.length], this.gameStack, this.moves)
  }
}

class Player {
  constructor(username, ai) {
    this.username = username
    this.admin = false
    this.ai = ai
    this.active = false
  }

  setActivity(active) {
    this.active = active
  }

  setAi(ai) {
    this.ai = ai
  }

  getMoveAI(gameStack, moves, playernumber) {
    return new UserAction('AI', 1) // TODO: AI
  }
}

class RoundInfo {
  constructor(player, stack, moves, playerList) {
    this.player = player
    this.stack = stack
    this.moves = moves
    this.playerList = playerList
  }
}

module.exports = { MainGame, Player, RoundInfo }
