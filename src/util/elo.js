const probability = (r1, r2) => 1 / (1 + Math.pow(10, (r1 - r2) / 400))
const K = 30

export const calculateRankings = (winnerRank, looserRank) => {
  const Pw = probability(looserRank, winnerRank)
  const Pl = probability(winnerRank, looserRank)

  const newWinnerRank = winnerRank + K * (1 - Pw)
  const newLooserRank = looserRank + K * (0 - Pl)

  return [newWinnerRank, newLooserRank]
}
