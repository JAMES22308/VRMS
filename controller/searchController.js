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
    // const searchBtn = document.getElementById("search-button");

    // searchBtn.addEventListener("click", () => {
    //     const keyword = vehicleSearchInput.value.toLowerCase();
    //     const allvehicles = this.vehicleModel.getAllVehicle();
    //     let sorted = [];

    //     for (let i = 0; i < allvehicles.length; i++) {
    //         // check all fields for a match (case-insensitive)
    //         if (
    //             allvehicles[i].make.toLowerCase().includes(keyword) ||
    //             allvehicles[i].model.toLowerCase().includes(keyword) ||
    //             allvehicles[i].status.toLowerCase().includes(keyword) ||
    //             allvehicles[i].location.toLowerCase().includes(keyword)
    //         ) {
    //             sorted.push(allvehicles[i]); // add all matches
    //         }
    //     }

    //     if (sorted.length > 0) {
    //         this.view.sortedValues(sorted);
    //     } else {
    //         this.view.sortedValues([]); // clear table if no match
    //         console.log("No vehicle found with that keyword.");
    //     }
    // });

    // Optional: live search while typing
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