const has = Object.prototype.hasOwnProperty

export default class BaseModel {
  primaryKey() {
    return this.id
  }

  fillAttributes(attributes) {
    Object
      .keys(attributes)
      .forEach((key) => {
        if (has.call(this, key)) {
          this[key] = attributes[key]
        }
      })
  }
}
