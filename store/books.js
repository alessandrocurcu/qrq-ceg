export const state = () => ({
  prova: 'ciao',
  categories: ['uno', 'due', 'tre', 'quattro'],
  books: [{ id: 1 }, { id: 2 }]
})

export const getters = {
  getBookById: (state) => (id) => state.books.find((book) => book.id === id)
}
