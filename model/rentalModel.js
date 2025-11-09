
function generateId() {
  let lastId = localStorage.getItem("lastRentalId") || 0;
  let newId = Number(lastId) + 1;
  localStorage.setItem("lastRentalId", newId);
  return `RE00${newId}`;
}


// export class RentalModel{
//     constructor(){
//         const saved = localStorage.getItem("rentals")
//         this.allRentals = saved ? JSON.parse(saved) : []
//         this.totalAmout = 0
//     }
//     saveToLocalStorage(){
//         localStorage.setItem("rentals", JSON.stringify(this.allRentals))
//     }
//     addRentals(rental){
//         rental.rentalID = generateId()
//         this.allRentals.push(rental)
//         this.saveToLocalStorage()
//     }
//     deleteRentals(index){
//         this.allRentals.splice(index, 1)
//         this.saveToLocalStorage()

//     }
//     updateRentals(rentals, index){
//         const existingID = this.allRentals[index].rentalID
//         rentals.rentalID = existingID
//         this.allRentals[index] = rentals
//         this.saveToLocalStorage()
//     }
//     getAllRentals(){
//         return this.allRentals
//     }

//     // returnRentals(index){
//     //     this.allRentals[index].rentalStatus = "Returned"
//     //     this.saveToLocalStorage()
//     // }


//     returnRentals(index) {
//     const rental = this.allRentals[index];

//     // Compute overdue fee
//     const today = new Date();
//     const endDate = new Date(rental.rentalEndDate);
//     let overdueFee = 0;

//     if (today > endDate) {
//         const diffTime = today - endDate;
//         const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         const dailyRate = parseFloat(rental.totalCost) / ((endDate - new Date(rental.rentalStartDate)) / (1000*60*60*24) + 1);
//         overdueFee = dailyRate * overdueDays;
//     }

//     rental.rentalStatus = "Returned";
//     rental.overdueFee = parseFloat(overdueFee.toFixed(2));

//     this.saveToLocalStorage();
// }

    

// }

export class RentalModel {
    constructor() {
        const saved = localStorage.getItem("rentals");
        this.allRentals = saved ? JSON.parse(saved) : [];
        this.totalAmount = 0;
    }

    saveToLocalStorage() {
        localStorage.setItem("rentals", JSON.stringify(this.allRentals));
    }

    addRentals(rental) {
        rental.rentalID = generateId();
        rental.rentalStatus = "Ongoing"; // default status
        rental.overdueFee = 0;           // default
        this.allRentals.push(rental);
        this.saveToLocalStorage();
    }

    deleteRentals(index) {
        this.allRentals.splice(index, 1);
        this.saveToLocalStorage();
    }

    updateRentals(rentals, index) {
        const existingID = this.allRentals[index].rentalID;
        rentals.rentalID = existingID;
        this.allRentals[index] = rentals;
        this.saveToLocalStorage();
    }

    getAllRentals() {
        return this.allRentals;
    }

    returnRentals(index) {
        const rental = this.allRentals[index];
        const today = new Date();
        const endDate = new Date(rental.rentalEndDate);
        let overdueFee = 0;

        if (today > endDate) {
            const diffTime = today - endDate;
            const overdueDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            const dailyRate = parseFloat(rental.totalCost) / ((endDate - new Date(rental.rentalStartDate)) / (1000*60*60*24) + 1);
            overdueFee = dailyRate * overdueDays;
        }

        rental.rentalStatus = "Returned";
        rental.overdueFee = parseFloat(overdueFee.toFixed(2));
        this.saveToLocalStorage();
    }

    getTotalRevenue() {
        return this.allRentals.reduce((sum, rental) => {
            const cost = parseFloat(rental.totalCost) || 0;
            const fee = parseFloat(rental.overdueFee) || 0;
            return sum + cost + fee;
        }, 0);
    }

    getTotalRentals() {
        return this.allRentals.length;
    }


}
