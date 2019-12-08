const probability = (r1, r2) => 1 / (1 + Math.pow(10, (r1 - r2) / 400))
const K = 30

const calculateRankings = (winnerRank, looserRank) => {
  const Pw = probability(looserRank, winnerRank)
  const Pl = probability(winnerRank, looserRank)

  const newWinnerRank = winnerRank + K * (1 - Pw)
  const newLooserRank = looserRank + K * (0 - Pl)

  return [newWinnerRank, newLooserRank]
}

const run = () => {
  games.forEach(game => {
    const wr = players[game.winner]
    const lr = players[game.looser]
    const [nwr, nlr] = calculateRankings(wr, lr)
    const gamePoints = nwr - wr
    players[game.winner] = nwr
    players[game.looser] = nlr
    game.points = gamePoints
  })
  console.log(`
    const batch = store.batch()
    ${games
      .map(
        game =>
          `batch.update(store.collection('games').doc('${game.id}'),{'points':${game.points}})`
      )
      .join('\n')}
    batch.commit()
  `)
}

const players = {
  'Nikolay Bojanov': 1200,
  'Николай Караджов': 1200,
  'Deyan Georgiev': 1200,
  'Велислав Симеонов': 1200,
  'Антонио Сотиров': 1200,
  'Kosta Vasilev Grudov': 1200,
  'Vencislav Kulin': 1200,
  'Stefan Dimov': 1200,
  'Plamen Karashtranov': 1200
}
const games = [
  {
    date: 1575278998216,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: 'isbf0ZfMsLnr39hZOx0A'
  },
  {
    date: 1575280580353,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: 'YtqtrUkD0fFk58axoz3f'
  },
  {
    date: 1575285198216,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'EopqplnQbNaqHUmlQLLT'
  },
  {
    date: 1575293044957,
    looser: 'Николай Караджов',
    winner: 'Stefan Dimov',
    id: 'TlJtLEThAv6mIM6pRGnn'
  },
  {
    date: 1575367782363,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: '66DGQGR4K68yUjVUy7dp'
  },
  {
    date: 1575373536423,
    looser: 'Stefan Dimov',
    winner: 'Deyan Georgiev',
    id: 'u0rl1vCdnyXnffizSZTG'
  },
  {
    date: 1575373745173,
    looser: 'Deyan Georgiev',
    winner: 'Николай Караджов',
    id: 'iJqfqzIydQABs4gECbcr'
  },
  {
    date: 1575374122352,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'u6r5r0dqMK5WcVl2lr8q'
  },
  {
    date: 1575374416613,
    looser: 'Deyan Georgiev',
    winner: 'Stefan Dimov',
    id: 'Llir65G3zHDJYL8XejAw'
  },
  {
    date: 1575374751162,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'ZWwFxZFdV9sHiSuqWQSA'
  },
  {
    date: 1575375175730,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'pK9unIa0pLuMkKt3Uxf9'
  },
  {
    date: 1575375972433,
    looser: 'Nikolay Bojanov',
    winner: 'Deyan Georgiev',
    id: 'FulhK8rMtcQQ6qztRokQ'
  },
  {
    date: 1575379677613,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'ZN94escUotaaQEr55NQL'
  },
  {
    date: 1575380157849,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: '91UFR6VJp5Y0UeJq1hNZ'
  },
  {
    date: 1575380370546,
    looser: 'Nikolay Bojanov',
    winner: 'Vencislav Kulin',
    id: '3HVZSboakmED1Ea7kdGl'
  },
  {
    date: 1575380692704,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'd3siC7aN53tyCQW4BGDT'
  },
  {
    date: 1575380995670,
    looser: 'Deyan Georgiev',
    winner: 'Nikolay Bojanov',
    id: 'LW9T6nAc9fyKbRwmekxH'
  },
  {
    date: 1575381206256,
    looser: 'Vencislav Kulin',
    winner: 'Николай Караджов',
    id: 'xYxhOWmQFsQNhJ9jQMeo'
  },
  {
    date: 1575381393262,
    looser: 'Vencislav Kulin',
    winner: 'Stefan Dimov',
    id: 'UjKEQyTbwPoMBGWjgOvB'
  },
  {
    date: 1575381801679,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: '3N37U0xsKGiWG5dOaJcO'
  },
  {
    date: 1575382019847,
    looser: 'Stefan Dimov',
    winner: 'Deyan Georgiev',
    id: 'ed0074BBmN39XTyLeX9z'
  },
  {
    date: 1575382262118,
    looser: 'Deyan Georgiev',
    winner: 'Vencislav Kulin',
    id: '52UWMUKyGE9Y6bI3Bbnn'
  },
  {
    date: 1575382666194,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'T8bfYPdWuSpax4oi4YsG'
  },
  {
    date: 1575391036142,
    looser: 'Deyan Georgiev',
    winner: 'Велислав Симеонов',
    id: 'g1DJmZb26y4Rt4KSYBxF'
  },
  {
    date: 1575391279429,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'mMXHucFuZFOkyMMmbMcO'
  },
  {
    date: 1575391581903,
    looser: 'Велислав Симеонов',
    winner: 'Николай Караджов',
    id: 'fzA61g2G6zrPvczAnDzd'
  },
  {
    date: 1575391810716,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: '4RZubNGqzDAh2ZBa4XLy'
  },
  {
    date: 1575391978356,
    looser: 'Nikolay Bojanov',
    winner: 'Deyan Georgiev',
    id: 'OY9jlbg4G6wVV7PiCMPM'
  },
  {
    date: 1575392253111,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: 'todCe6nSC8PW3Tbc7ZXy'
  },
  {
    date: 1575449287479,
    looser: 'Stefan Dimov',
    winner: 'Nikolay Bojanov',
    id: 'VFeyhTwx1yTsyt4d57Du'
  },
  {
    date: 1575449510795,
    looser: 'Stefan Dimov',
    winner: 'Vencislav Kulin',
    id: 'wQaasNkslGVAxMUSIoIL'
  },
  {
    date: 1575449762398,
    looser: 'Deyan Georgiev',
    winner: 'Nikolay Bojanov',
    id: 'nauCuDHPhIaPkVf8T6vZ'
  },
  {
    date: 1575450036465,
    looser: 'Николай Караджов',
    winner: 'Vencislav Kulin',
    id: 'lc5WvFqUSGol8dTebAvS'
  },
  {
    date: 1575450336527,
    looser: 'Stefan Dimov',
    winner: 'Deyan Georgiev',
    id: 'FtrYiNM3JYes6eoaRZie'
  },
  {
    date: 1575450724210,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: 'Cne9h8CYOcnkjFdERCSo'
  },
  {
    date: 1575457126401,
    looser: 'Николай Караджов',
    winner: 'Stefan Dimov',
    id: 'sZJg4lN4eNDWcHnJDNUJ'
  },
  {
    date: 1575457579240,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'fTcwWl54iuvAaku6PtYN'
  },
  {
    date: 1575457866018,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'zAVMZsFG4DGHefe7Epxd'
  },
  {
    date: 1575458391767,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'uW3BvYbRWyJ7e4cF7wpe'
  },
  {
    date: 1575458975184,
    looser: 'Николай Караджов',
    winner: 'Stefan Dimov',
    id: 'LeyWUmp95mSMMjJu2eju'
  },
  {
    date: 1575462947585,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: '42TyrtrllYiXdxtTeCC8'
  },
  {
    date: 1575463378111,
    looser: 'Велислав Симеонов',
    winner: 'Plamen Karashtranov',
    id: 'I8laQbOEHL7wG00GzOXp'
  },
  {
    date: 1575463750834,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: 'PUIgD8PmTqUfETEtmdcQ'
  },
  {
    date: 1575476940715,
    looser: 'Nikolay Bojanov',
    winner: 'Николай Караджов',
    id: 'zTtDXxdDpkkt6Cdv4xcE'
  },
  {
    date: 1575476951024,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: '4oMhbjYziChS9kNWUSg3'
  },
  {
    date: 1575476962565,
    looser: 'Nikolay Bojanov',
    winner: 'Николай Караджов',
    id: 'IgrHE1jSLOOA1s38NrQC'
  },
  {
    date: 1575476966906,
    looser: 'Plamen Karashtranov',
    winner: 'Nikolay Bojanov',
    id: 'CFnq2QMWnA52NhPBgjW0'
  },
  {
    date: 1575477323506,
    looser: 'Plamen Karashtranov',
    winner: 'Nikolay Bojanov',
    id: 'N9ozJbSZCe7jVKQ5HZpY'
  },
  {
    date: 1575483864057,
    looser: 'Deyan Georgiev',
    winner: 'Vencislav Kulin',
    id: 'UHO5bbGGt5tiKoaqBKqq'
  },
  {
    date: 1575537874497,
    looser: 'Николай Караджов',
    winner: 'Vencislav Kulin',
    id: 'Dv3m5NcAAKRAUs7W8QKX'
  },
  {
    date: 1575538488459,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'uxjolNzCDwReUuVF2yY7'
  },
  {
    date: 1575538493413,
    looser: 'Антонио Сотиров',
    winner: 'Vencislav Kulin',
    id: 'Wh71JvtTP7QPhgLUkYPg'
  },
  {
    date: 1575538715871,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: 'O2KYcOIl84AsQYDOojKs'
  },
  {
    date: 1575539506549,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'SofN9jG3Ieg5Yy6yZLBT'
  },
  {
    date: 1575541548791,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'BveucZWDnoLdF2bhAYbh'
  },
  {
    date: 1575541951615,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: '7QUsGZq25mISyQVHZfKo'
  },
  {
    date: 1575554883353,
    looser: 'Deyan Georgiev',
    winner: 'Vencislav Kulin',
    id: 'U49SpTmTMD0HD3kTf7cL'
  },
  {
    date: 1575554902333,
    looser: 'Deyan Georgiev',
    winner: 'Vencislav Kulin',
    id: 'wpRBDynaMzEduVsbTn5y'
  },
  {
    date: 1575555220648,
    looser: 'Deyan Georgiev',
    winner: 'Stefan Dimov',
    id: '4HuZxO0dv29o3nuu4UX9'
  },
  {
    date: 1575557380989,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'NC2y26w55YYImHSqQk5Q'
  },
  {
    date: 1575557790466,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'izlv6HXJ8j2JQOi6dT3b'
  },
  {
    date: 1575557800032,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'I4zhMjP3atadE56tZm3e'
  },
  {
    date: 1575558491717,
    looser: 'Stefan Dimov',
    winner: 'Николай Караджов',
    id: 'in2scpnls0omW9raksZD'
  },
  {
    date: 1575559077407,
    looser: 'Николай Караджов',
    winner: 'Stefan Dimov',
    id: 'u7N51AesHMhckZ311V6i'
  },
  {
    date: 1575559596470,
    looser: 'Nikolay Bojanov',
    winner: 'Stefan Dimov',
    id: '8AlcBTzxYc8kD17LEmlu'
  },
  {
    date: 1575559986581,
    looser: 'Nikolay Bojanov',
    winner: 'Николай Караджов',
    id: 'AJoyga337KKUIfgthypS'
  },
  {
    date: 1575561598116,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'KoqDDs8isirsHKflsuFI'
  },
  {
    date: 1575621643549,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'fiZivEWc2LfIhNzWoPwX'
  },
  {
    date: 1575624104807,
    looser: 'Nikolay Bojanov',
    winner: 'Николай Караджов',
    id: '3kNZWATcauNdJgSHvvox'
  },
  {
    date: 1575624304139,
    looser: 'Deyan Georgiev',
    winner: 'Kosta Vasilev Grudov',
    id: 'juHudSrrxU3ihxfgZXAl'
  },
  {
    date: 1575624401162,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: 'a8hiIvpIvOKjeK60qMLr'
  },
  {
    date: 1575628126191,
    looser: 'Николай Караджов',
    winner: 'Vencislav Kulin',
    id: 'gEdBMyyktBo0bRqeNWlf'
  },
  {
    date: 1575629271194,
    looser: 'Kosta Vasilev Grudov',
    winner: 'Антонио Сотиров',
    id: '9kBmUHuvfSE9OinVvD8t'
  },
  {
    date: 1575629277498,
    looser: 'Kosta Vasilev Grudov',
    winner: 'Антонио Сотиров',
    id: 'lxRv5HESDNyB4DWqLnZj'
  },
  {
    date: 1575629410091,
    looser: 'Антонио Сотиров',
    winner: 'Deyan Georgiev',
    id: 'mneJBk3NMybz0yb0H4pE'
  },
  {
    date: 1575629958004,
    looser: 'Kosta Vasilev Grudov',
    winner: 'Deyan Georgiev',
    id: 'W3rn7aB1ET4nEvmTQqDU'
  },
  {
    date: 1575631122806,
    looser: 'Николай Караджов',
    winner: 'Антонио Сотиров',
    id: 'R54h8T7YhjafufYjpyyE'
  },
  {
    date: 1575631550559,
    looser: 'Антонио Сотиров',
    winner: 'Vencislav Kulin',
    id: 'WuN9cG6WZ0Mu33L1XLk9'
  },
  {
    date: 1575632267213,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: '6ZKK3qc1qB4quG1iodiL'
  },
  {
    date: 1575635099549,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: 'rNH4T4VvFwucmocp7Ngh'
  },
  {
    date: 1575635104830,
    looser: 'Велислав Симеонов',
    winner: 'Plamen Karashtranov',
    id: 'E8WDIuLhjjfNN2QpCnho'
  },
  {
    date: 1575635106845,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: 'jiLmFzzQakIX5WIjTA3L'
  },
  {
    date: 1575635109069,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: '40mOzSp29XSI4F9d1wFC'
  },
  {
    date: 1575635525316,
    looser: 'Plamen Karashtranov',
    winner: 'Велислав Симеонов',
    id: 'QxnMvwW8YXYCanqHvSBD'
  },
  {
    date: 1575635743722,
    looser: 'Deyan Georgiev',
    winner: 'Plamen Karashtranov',
    id: 'db1VbUggHpGiZj639Sr9'
  },
  {
    date: 1575636112331,
    looser: 'Велислав Симеонов',
    winner: 'Deyan Georgiev',
    id: '2So36RTxZ9mfbFtvUqg2'
  },
  {
    date: 1575636365639,
    looser: 'Велислав Симеонов',
    winner: 'Plamen Karashtranov',
    id: 'Xr4DIBjTYaITdWAbHa0v'
  },
  {
    date: 1575636754317,
    looser: 'Plamen Karashtranov',
    winner: 'Vencislav Kulin',
    id: 'Znue89ZI9lj5MnNqbDmK'
  },
  {
    date: 1575637073278,
    looser: 'Vencislav Kulin',
    winner: 'Велислав Симеонов',
    id: 'kMNz5zNlepd62j809PhA'
  },
  {
    date: 1575637329798,
    looser: 'Plamen Karashtranov',
    winner: 'Deyan Georgiev',
    id: 'ZcluIVIKVxHJk2DYieYU'
  },
  {
    date: 1575637713518,
    looser: 'Plamen Karashtranov',
    winner: 'Deyan Georgiev',
    id: '0uevBpzeStR5vD40RCfg'
  },
  {
    date: 1575637950887,
    looser: 'Велислав Симеонов',
    winner: 'Vencislav Kulin',
    id: 'T9HlTP4VgimGP2mvScnr'
  },
  {
    date: 1575638632748,
    looser: 'Vencislav Kulin',
    winner: 'Deyan Georgiev',
    id: 'JBZrpNuNvsIEi2X0Lzpd'
  },
  {
    date: 1575638924192,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'cn6RR13F6oOx54vIXBZV'
  },
  {
    date: 1575641071840,
    looser: 'Vencislav Kulin',
    winner: 'Антонио Сотиров',
    id: '4IEMDQXlkjyBVherFtVx'
  },
  {
    date: 1575641731695,
    looser: 'Kosta Vasilev Grudov',
    winner: 'Vencislav Kulin',
    id: 'inTrSJBwjkfsGV3LmzLB'
  },
  {
    date: 1575644379626,
    looser: 'Kosta Vasilev Grudov',
    winner: 'Антонио Сотиров',
    id: 'ToXLIx6cUwdON7ABY5Tr'
  },
  {
    date: 1575647477502,
    looser: 'Nikolay Bojanov',
    winner: 'Deyan Georgiev',
    id: 'lTaitptbHuOUNen5XpG1'
  },
  {
    date: 1575647480160,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: 'klDKgmxsutZXZ8b23B1N'
  },
  {
    date: 1575647814029,
    looser: 'Deyan Georgiev',
    winner: 'Николай Караджов',
    id: 'YlqjcCqzRYT9Mn6qNQI0'
  },
  {
    date: 1575648173939,
    looser: 'Nikolay Bojanov',
    winner: 'Deyan Georgiev',
    id: 'qzajtXSvE8Z36zT45q7B'
  },
  {
    date: 1575648460131,
    looser: 'Deyan Georgiev',
    winner: 'Николай Караджов',
    id: 'qAGlIZ2zijCqTALLQ0jU'
  },
  {
    date: 1575648884099,
    looser: 'Николай Караджов',
    winner: 'Nikolay Bojanov',
    id: 'IN2o2Jk4ryCmHftnDeTq'
  },
  {
    date: 1575649185919,
    looser: 'Nikolay Bojanov',
    winner: 'Николай Караджов',
    id: 'K6QHlr8CgEOvCpUvacPn'
  },
  {
    date: 1575649978445,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'clq35za8mIbsmFDZXjoO'
  },
  {
    date: 1575650318356,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'XpFlymdHkuuzx1SRgXMK'
  },
  {
    date: 1575650474726,
    looser: 'Николай Караджов',
    winner: 'Deyan Georgiev',
    id: 'AhyFEpakD2N5Xp1v96ID'
  }
]

run()
