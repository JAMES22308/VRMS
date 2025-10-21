import { VehicleView } from "../views/vehicleView.js";
import { RentalView } from "../views/rentalView.js";
import { RentalModel } from "../model/rentalModel.js";
import { ReservationView } from "../views/reservationView.js";
import { vehicleSharedModel } from "../model/sharedModel.js";
import { SearchView } from "../views/searchViews.js";

class VehicleController {
    constructor() {
        this.vehicleModel = vehicleSharedModel;
        this.vehicleView = new VehicleView();
        this.rentalView = new RentalView();
        this.rentalModel = new RentalModel();
        this.reservationView = new ReservationView();
        this.searchView = new SearchView()
        this.vehicleView.displayValues(this.vehicleModel.getAllVehicle())

        this.bindAdd();
        this.bindUpdate()
        this.bindRemove()




    }

    bindAdd() {
        const addVehicle = document.getElementById("addVehicle");

        addVehicle.onclick = (e) => {
            e.preventDefault()
                
            const [
                make,
                model,
                year,
                registrationNumber,
                type,
                dailyRate,
                mileage,
                location,
                status
            ] = this.vehicleView.getValues();
            if (!make || !model || !year || !registrationNumber || !type || !dailyRate || !mileage || !location) {
                alert("Please fill in all required fields!");
                return;
            }
            const newVehicle = { make, model, year, registrationNumber, type, dailyRate, mileage, location, status };

            if (this.updatedIndex === null) {
                this.vehicleModel.addVehicle(newVehicle);
                console.log("Vehicle added:", this.vehicleModel.getAllVehicle());

                this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle())
                this.reservationView.vehicleValues(this.vehicleModel.getAllVehicle())
                this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())


            } else {
                this.vehicleModel.updateVehicle(this.updatedIndex, newVehicle);
                console.log("Vehicle updated:", this.vehicleModel.getAllVehicle());
                this.updatedIndex = null;

                addVehicle.innerHTML = "Add Vehicle";
            }

            this.vehicleView.displayValues(this.vehicleModel.getAllVehicle());
        };
    }






    bindUpdate() {
        const table = document.getElementById("vehicleTbody");

        table.onclick = (e) => {
            if (e.target.classList.contains("vehicle_update_btn")) {
                const index = e.target.dataset.index;
                const allVehicles = this.vehicleModel.getAllVehicle();
                const selectedVehicle = allVehicles[index];

                this.vehicleView.displayUpdateValues(selectedVehicle); 
                this.updatedIndex = index;

                const addVehicle = document.getElementById("addVehicle");
                addVehicle.innerHTML = "Update Vehicle";
            }
        };
    }


    bindRemove() {
        const vehicleTbody = document.getElementById("vehicleTbody");

        vehicleTbody.addEventListener("click", (e) => {
            if (e.target.classList.contains("vehicle_delete_btn")) {
                const index = Number(e.target.dataset.index); 
                this.vehicleModel.removeVehicle(index); 
                this.vehicleView.displayValues(this.vehicleModel.getAllVehicle()); 
                console.log(` Deleted vehicle at index ${index}`);
            }
        });
    }


}


const app = new VehicleController()