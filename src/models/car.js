class Car {
  constructor({ carId, yearFoundation, color, fuelType, gearType, carType, modelId}) {
    this.carId = carId ?? uuidv4();
    this.yearFoundation = yearFoundation
    this.color = color
    this.fuelType = fuelType
    this.gearType = gearType;
    this.carType = carType;
    this.modelId = modelId
  }
}
module.exports = { Car };