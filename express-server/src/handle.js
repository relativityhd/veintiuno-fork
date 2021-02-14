class UserAction {
  constructor(username, action) {
    this.username = username
    this.action = action
  }
}

class UserHandle {
  constructor() {
    this.userArrayList = []
  }

  validateUsername(username) {
    return this.userArrayList.findIndex((player) => player.username === username) === -1
  }

  newUser(username) {
    if (this.userArrayList.length >= 6) return false
    if (this.blablalbla) this.userArrayList.add()
  }
}
class GameInstance {}

module.exports = { UserAction, UserHandle, GameInstance }
