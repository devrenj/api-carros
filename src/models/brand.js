// const { v4: uuidv4 } = require("uuid");

class Brand {
  constructor({ brandId, name, countryOrigin, yearFoundation, founder }) {
    // this.brandId = brandId ?? uuidv4();
    this.BrandId = brandId
    this.name = name
    this.countryOrigin = countryOrigin
    this.yearFoundation = yearFoundation
    this.founder = founder
  }
}
module.exports = { Brand };