export class Command {
  constructor() {
    this.propTypes = {}
  }

  expectProp(name, type) {
    this.propTypes = { ...this.propTypes, [name]: type }

    return this
  }
}
