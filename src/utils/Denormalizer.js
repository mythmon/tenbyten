export default class Denormalizer {
  constructor (state, id) {
    if (state === undefined) {
      throw new Error('State cannot be undefined')
    }
    if (id === undefined) {
      throw new Error('ID cannot be undefined')
    }

    this.state = state
    this.id = id

    if (this.data === undefined) {
      throw new Error(`ID ${this.id} not found in collection`)
    }
  }

  get collection () {
    throw new Error('not implemented')
  }

  get data () {
    return this.collection[this.id]
  }
}
