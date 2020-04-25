const faker = require('faker')

function generateData() {
  const products = []
  for (let id = 0; id < 10; id++) {
    const title = faker.commerce.productName()
    const price = faker.commerce.price()
    const company = faker.company.companyName()
    const image = faker.image.food()
    const date = faker.date
      .between('2018-01-01', '2018-07-31')
      .toISOString()
      .split('T')[0]
    const fromId = faker.random.number({ min: 1000, max: 9999 })
    const status = faker.random.number(1)
    products.push({
      id,
      title,
      price,
      company,
      image,
      from_userId: fromId,
      published: date,
      status
    })
  }

  return { products }
}

module.exports = generateData
