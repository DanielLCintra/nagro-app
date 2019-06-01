import BaseModel from '../support/BaseModel'

export default class PropertyModel extends BaseModel {
  constructor() {
    super()

    this.id = null
    this.name = null
    this.total_area = null
    this.city = null
    this.growerId = null
  }

  static Build(attributes) {
    const instance = new PropertyModel()
    instance.fillAttributes(attributes)

    return instance
  }
}
