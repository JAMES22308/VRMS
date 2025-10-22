import { VehicleModel } from "../model/vehicleModel.js";
import { SearchModel } from "../model/searchModel.js";
import { SearchView } from "../views/searchViews.js";


class Controller{
    constructor(){
        this.vehicleModel = new VehicleModel()
        this.view = new SearchView()
        this.model = new SearchModel()


        this.view.displayAllValues(this.vehicleModel.getAllVehicle())

    }

    bindDisplayAllVehicles(){
        this.view.displayAllValues(this.vehicleModel.getAllVehicle())
    }


    bindSearch() {
    const vehicleSearchInput = document.getElementById("vehicleSearchInput");
    vehicleSearchInput.addEventListener("input", () => {
        const keyword = vehicleSearchInput.value.toLowerCase();
        const allvehicles = this.vehicleModel.getAllVehicle();
        let sorted = [];

        for (let i = 0; i < allvehicles.length; i++) {
            if (
                allvehicles[i].make.toLowerCase().includes(keyword) ||
                allvehicles[i].model.toLowerCase().includes(keyword) ||
                allvehicles[i].status.toLowerCase().includes(keyword) ||
                allvehicles[i].location.toLowerCase().includes(keyword)
            ) {
                sorted.push(allvehicles[i]);
            }
        }

        this.view.sortedValues(sorted);
    });
}



}

const app = new Controller()
app.bindSearch()
app.bindDisplayAllVehicles()