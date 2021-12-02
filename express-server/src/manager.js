function sortScores(a, b) {
  return b.wins - a.wins
}

module.exports = {
  scores = [],
  getTopTen () {
    return this.scores.sort((a, b) => b.wins - a.wins).slice(0, 10);
  },
  getScores() { return this.scores },
  addScore(username) {
    let found = false
    for (const score of this.scores) {
      if (score.username === username) {
        score.wins++
        found = true
      }
    }
    if (!found) {
      this.scores.push({username, wins: 1})
    }
  }
}
