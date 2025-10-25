import { DashboardView } from "../views/dashboardView.js";
import { rentalSharedModel } from "../model/sharedModel.js";
class DashboardController{
    constructor(){
        this.dashboardView = new DashboardView()
        this.rentalModel = rentalSharedModel
        this.bindOption()
    }
    bindOption() {
        const select = document.getElementById("select-option-dashboard");

        select.onclick = () => {
            const rentals = this.rentalModel.getAllRentals(); 

            if (select.value === "all") {
                const defaultOrder = [...rentals]; 
                this.dashboardView.displayAllValues(defaultOrder);
                console.log("Default:", defaultOrder);

            } else if (select.value === "high") {
                const highToLow = [...rentals].sort((a, b) => b.totalCost - a.totalCost);
                this.dashboardView.displayAllValues(highToLow);
                console.log("High to Low:", highToLow);

            } else if (select.value === "low") {
                const lowToHigh = [...rentals].sort((a, b) => a.totalCost - b.totalCost);
                this.dashboardView.displayAllValues(lowToHigh);
                console.log("Low to High:", lowToHigh);
            }else if (select.value === "az") {
            const sorted = [...rentals].sort((a, b) => 
                a.customer.localeCompare(b.customer)
            );
            this.dashboardView.displayAllValues(sorted);
            }
        };
    }

}

export default new DashboardController()