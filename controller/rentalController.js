import { RentalModel } from "../model/rentalModel.js";
import { RentalView } from "../views/rentalView.js";
import { CustomerModel } from "../model/customerModel.js";
import { VehicleView } from "../views/vehicleView.js";
import { ReservationView } from "../views/reservationView.js";
import { SearchView } from "../views/searchViews.js";
import { vehicleSharedModel } from "../model/sharedModel.js";
import { DashboardView } from "../views/dashboardView.js";


class RentalController {
    constructor() {
        this.rentalModel = new RentalModel();
        this.rentalView = new RentalView();
        this.customerModel = new CustomerModel();
        this.vehicleModel = vehicleSharedModel;
        this.vehicleView = new VehicleView();
        this.reservationView = new ReservationView();
        this.searchView = new SearchView()
        this.dashboardView = new DashboardView()

        this.updatedIndex = null;

        this.initialize();
    }

    initialize() {
        this.customerRentalOptions();
        this.vehicleRentalOptions();
        this.rentalView.displayRentals(this.rentalModel.getAllRentals());
        this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle());
        this.reservationView.vehicleValues(this.vehicleModel.getAllVehicle());
        this.vehicleView.displayValues(this.vehicleModel.getAllVehicle())
        this.dashboardView.displayAllValues(this.rentalModel.getAllRentals())


        this.dashboardView.totalRevenue(this.rentalModel.getTotalRevenue())
       

        this.dashboardView.totalRentals(this.rentalModel.getTotalRentals())


        this.dashboardView.getTotalAvailableVehicles(this.vehicleModel.getTotalAvailable())



        this.bindAddRental();
        this.bindDateChange();
        this.bindDeleteRental();
        this.bindReturnRental()
    }

    customerRentalOptions() {
        const customers = this.customerModel.getAllCustomers();
        this.rentalView.customerValues(customers);
    }

    vehicleRentalOptions() {
        const vehicles = this.vehicleModel.getAllVehicle();
        this.rentalView.vehicleValues(vehicles);
    }


    bindAddRental() {
        const form = document.getElementById("rentalForm");

        form.onsubmit = (e) => {
            e.preventDefault();

            const [customer, rentalVehicle, rentalStartDate, rentalEndDate, totalCost] = this.rentalView.getValues();
            if (!customer || !rentalVehicle || !rentalStartDate || !rentalEndDate || !totalCost) {
                alert("Please fill in all required rental fields!");
            return;
            }
            const rental = { customer, rentalVehicle, rentalStartDate, rentalEndDate, totalCost, rentalStatus: "Rented" };

            if (this.updatedIndex === null) {
                this.rentalModel.addRentals(rental);

                this.vehicleModel.updateVehicleStatus(rentalVehicle, "Unavailable");

                this.rentalView.displayRentals(this.rentalModel.getAllRentals());
                this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle());
                this.vehicleView.displayValues(this.vehicleModel.getAllVehicle())
                this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())
                this.reservationView.vehicleValues(this.vehicleModel.getAllVehicle())

                console.log(`🚗 Vehicle ${rentalVehicle} set to Unavailable`);


                this.dashboardView.displayAllValues(this.rentalModel.getAllRentals())

                this.dashboardView.totalRevenue(this.rentalModel.getTotalRevenue())

                this.dashboardView.totalRentals(this.rentalModel.getTotalRentals())

                this.dashboardView.getTotalAvailableVehicles(this.vehicleModel.getTotalAvailable())
            }
        };
    }


    getVehicleValues(targetPlateNumber, vehicles) {
        const vehicle = vehicles.find(v => v.registrationNumber === targetPlateNumber);
        return vehicle ? vehicle.dailyRate : null;
    }

    DateCalculation() {
        const vehicles = this.vehicleModel.getAllVehicle();
        const [_, rentalVehicle, rentalStartDate, rentalEndDate] = this.rentalView.getValues();

        const start = new Date(rentalStartDate);
        const end = new Date(rentalEndDate);
        // const totalCostInput = document.getElementById("totalCost");

        // const dailyRate = this.getVehicleValues(rentalVehicle, vehicles);
        // const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
        // const total = dailyRate ? days * dailyRate : "";

        // totalCostInput.value = total;
        // console.log("💰 Computed cost:", total);

        const totalCostInput = document.getElementById("totalCost");

        const dailyRate = this.getVehicleValues(rentalVehicle, vehicles);
        const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
        let total = dailyRate ? days * dailyRate : 0;

        // Convert to float and round to 2 decimals
        total = parseFloat(total.toFixed(2));

        totalCostInput.value = total;
        console.log("💰 Computed cost:", total);

    }

    bindDateChange() {
        const rentalStartDate = document.getElementById("rentalStartDate");
        const rentalEndDate = document.getElementById("rentalEndDate");
        const rentalVehicle = document.getElementById("rentalVehicle");

        rentalVehicle.onchange = () => this.DateCalculation();
        rentalStartDate.onchange = () => this.DateCalculation();
        rentalEndDate.onchange = () => this.DateCalculation();
    }

    bindDeleteRental() {
        const rentalTable = document.getElementById("rentalTable");

        rentalTable.addEventListener("click", (e) => {
            if (e.target.classList.contains("rentals_delete-btn")) {
                const index = e.target.dataset.index;
                this.rentalModel.deleteRentals(index);

                this.rentalView.displayRentals(this.rentalModel.getAllRentals());
                this.vehicleView.displayValues(this.vehicleModel.getAllVehicle());
                this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle())
                this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())
                
                this.dashboardView.displayAllValues(this.rentalModel.getAllRentals())


                this.dashboardView.totalRevenue(this.rentalModel.getTotalRevenue())

                this.dashboardView.totalRentals(this.rentalModel.getTotalRentals())
            }
        });
    }






    // bindReturnRental() {
    //     const rentalTable = document.getElementById("rentalTbody");

    //     rentalTable.addEventListener("click", (e) => {
    //         if (e.target.classList.contains("return_btn")) {
    //             const index = Number(e.target.dataset.index);
    //             const rental = this.rentalModel.getAllRentals()[index];
                
    //             rental.totalCost = parseFloat(parseFloat(rental.totalCost).toFixed(2));

    //             if (rental && rental.rentalStatus !== "Returned") {
    //                 rental.rentalStatus = "Returned";
    //                 this.rentalModel.saveToLocalStorage(); 

    //                 this.vehicleModel.updateVehicleStatus(rental.rentalVehicle, "Available");

    //                 this.rentalView.displayRentals(this.rentalModel.getAllRentals());
    //                 this.vehicleView.displayValues(this.vehicleModel.getAllVehicle());

    //                 this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle())
    //                 this.reservationView.vehicleValues(this.vehicleModel.getAllVehicle())
    //                 this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())

    //                 console.log(`Rental ${rental.rentalVehicle} returned and vehicle set to Available`);
    //             }
    //         }
    //     });
    // }


    bindReturnRental() {
    const rentalTable = document.getElementById("rentalTbody");

    rentalTable.addEventListener("click", (e) => {
        if (e.target.classList.contains("return_btn")) {
            const index = Number(e.target.dataset.index);
            const rental = this.rentalModel.getAllRentals()[index];

            if (rental && rental.rentalStatus !== "Returned") {
                this.rentalModel.returnRentals(index);

                if (rental.overdueFee > 0) {
                    alert(`This rental is overdue! Fee: $${rental.overdueFee.toFixed(2)}`);
                }

                this.vehicleModel.updateVehicleStatus(rental.rentalVehicle, "Available");

                this.rentalView.displayRentals(this.rentalModel.getAllRentals());
                this.vehicleView.displayValues(this.vehicleModel.getAllVehicle());
                this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle())
                this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())

                this.dashboardView.displayAllValues(this.rentalModel.getAllRentals())

                this.dashboardView.getTotalAvailableVehicles(this.vehicleModel.getTotalAvailable())
            }
        }
    });
}


}

export default new RentalController();
