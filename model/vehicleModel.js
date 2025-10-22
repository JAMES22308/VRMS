function generateId() {
  let lastId = localStorage.getItem("lastVehicleId") || 0;
  let newId = Number(lastId) + 1;
  localStorage.setItem("lastVehicleId", newId);
  return `V00${newId}`;
}


export class VehicleModel {
    constructor() {
        const saved = localStorage.getItem("vehicles");
        this.allVehicles = saved ? JSON.parse(saved) : [];
    }

    saveToLocalStorage() {
        localStorage.setItem("vehicles", JSON.stringify(this.allVehicles));
    }

    addVehicle(vehicle) {
        vehicle.vehicleID = generateId()
        this.allVehicles.push(vehicle);
        this.saveToLocalStorage();
    }

    removeVehicle(index) {
        this.allVehicles.splice(index, 1);
        this.saveToLocalStorage();
    }

    updateVehicle(index, updatedData) {
        this.allVehicles[index] = updatedData;
        this.saveToLocalStorage();
    }

    getAllVehicle() {
        return this.allVehicles;
    }

    updateVehicleStatus(registrationNumber, newStatus) {
        for (let i = 0; i < this.allVehicles.length; i++) {
            if (this.allVehicles[i].registrationNumber === registrationNumber) {
                this.allVehicles[i].status = newStatus;
                break;
            }
        }
        this.saveToLocalStorage();
    }
}
