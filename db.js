const faker = require('faker')

function generateData() {
  const books = []
  for (let id = 0; id < 10; id++) {
    const ISBN = faker.random.number({ min: 1000, max: 9999 })
    const title = faker.commerce.productName()
    const price = faker.commerce.price()
    const author = faker.name.firstName() + ' ' + faker.name.lastName()
    // const coverImage = faker.image.food()
    const date = faker.date
      .between('2018-01-01', '2018-07-31')
      .toISOString()
      .split('T')[0]
    // const fromId = faker.random.number({ min: 1000, max: 9999 })
    books.push({
      id,
      ISBN,
      title,
      price,
      author,
      // coverImage,
      // from_userId: fromId,
      published: date
    })
  }

  return { books }
}

module.exports = generateData
