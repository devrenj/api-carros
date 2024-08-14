class Car {
  constructor({ idCarModel, yearFoundation, color, fuelType, gearType, carType}) {
    this.idCarModel = idCarModel
    this.yearFoundation = yearFoundation
    this.color = color
    this.fuelType = fuelType
    this.gearType = gearType;
    this.carType = carType;
  }
}
module.exports = { Car };