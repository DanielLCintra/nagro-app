import BaseModel from '../support/BaseModel'
import PropertyModel from './PropertyModel'

export default class GrowerModel extends BaseModel {
  constructor() {
    super()

    this.id = null
    this.name = null
    this.cpf = null
    this.properties = [new PropertyModel()]
  }

  static Build(attributes) {
    const instance = new GrowerModel()
    instance.fillAttributes(attributes)

    return instance
  }
}
