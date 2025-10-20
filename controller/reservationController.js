import { vehicleSharedModel } from "../model/sharedModel.js";
import { ReservationModel } from "../model/reservationModel.js";
import { ReservationView } from "../views/reservationView.js";
import { VehicleView } from "../views/vehicleView.js";
import { RentalView } from "../views/rentalView.js";
import { CustomerModel } from "../model/customerModel.js";
import { SearchView } from "../views/searchViews.js";

class ReservationController {
    constructor() {
        this.model = new ReservationModel();
        this.view = new ReservationView();
        this.vehicleModel = vehicleSharedModel; 
        this.vehicleView = new VehicleView();
        this.rentalView = new RentalView();
        this.customerModel = new CustomerModel();
        this.searchView = new SearchView()

        this.initialize();
    }

    initialize() {
        this.customerAvailable();
        this.vehicleAvailable();
        this.view.displayValues(this.model.getAllReservations());
        this.rentalView.vehicleValues(this.vehicleModel.getAllVehicle());

        this.bindAdd();
        this.bindCancel();
    }

    customerAvailable() {
        const availableCustomer = this.customerModel.getAllCustomers();
        this.view.customerValues(availableCustomer);
    }

    vehicleAvailable() {
        const availableVehicle = this.vehicleModel.getAllVehicle();
        this.view.vehicleValues(availableVehicle);
    }

    bindAdd() {
        const addReserveButton = document.getElementById("add_reserve_button");

        addReserveButton.addEventListener("click", (e) => {
            e.preventDefault();

            const [reservationCustomer, select_reserve, reservationDate] = this.view.getValues();
            const reserve = { reservationCustomer, select_reserve, reservationDate, status: "Reserved" };

            this.model.addReservation(reserve);
            this.vehicleModel.updateVehicleStatus(select_reserve, "Reserved");

            const allReserves = this.model.getAllReservations();
            const allVehicles = this.vehicleModel.getAllVehicle();

            this.view.displayValues(allReserves);
            this.vehicleView.displayValues(allVehicles);
            this.view.vehicleValues(allVehicles);
            this.rentalView.vehicleValues(allVehicles);
            this.searchView.displayAllValues(this.vehicleModel.getAllVehicle())
        });
    }

    bindCancel() {
        const tbody = document.getElementById("reservationTbody");

        tbody.addEventListener("click", (e) => {
            if (e.target.classList.contains("reservation_delete-btn")) {
                const index = Number(e.target.dataset.index);
                const reservation = this.model.getAllReservations()[index];

                if (!reservation) return;

                reservation.status = "Cancelled";
                this.model.saveToLocalStorage(); 
                this.vehicleModel.updateVehicleStatus(reservation.select_reserve, "Available");

                const allReserves = this.model.getAllReservations();
                const allVehicles = this.vehicleModel.getAllVehicle();

                this.view.displayValues(allReserves);
                this.vehicleView.displayValues(allVehicles);
                this.view.vehicleValues(allVehicles);
                this.rentalView.vehicleValues(allVehicles);
            }
        });
    }
}

const app = new ReservationController();
