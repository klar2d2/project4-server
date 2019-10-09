let db = require('../models');

const getRandomCoord = (start, end) => {
  const range = end - start + 1
  const base = Math.floor(Math.random() * range) + start
  const decimal = parseFloat(Math.random().toFixed(6))
  return base + decimal
}

const goatSeed = (goatNames) => {
  goatNames.forEach((name) => {
    db.User.create({
      firstname: name,
      email: `${name}@munchmylawn.com`,
      isGoat: true,
      password: `${name}1234`,
      address: {
        longitude: getRandomCoord(-122,-123),
        latitude: getRandomCoord(47,48)
      }
    })
  })
}

console.log(getRandomCoord(-122,-123),getRandomCoord(47,48))