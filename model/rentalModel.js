
function generateId() {
  let lastId = localStorage.getItem("lastRentalId") || 0;
  let newId = Number(lastId) + 1;
  localStorage.setItem("lastRentalId", newId);
  return `RE00${newId}`;
}


export class RentalModel{
    constructor(){
        const saved = localStorage.getItem("rentals")
        this.allRentals = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("rentals", JSON.stringify(this.allRentals))
    }
    addRentals(rental){
        rental.rentalID = generateId()
        this.allRentals.push(rental)
        this.saveToLocalStorage()
    }
    deleteRentals(index){
        this.allRentals.splice(index, 1)
        this.saveToLocalStorage()

    }
    updateRentals(rentals, index){
        const existingID = this.allRentals[index].rentalID
        rentals.rentalID = existingID
        this.allRentals[index] = rentals
        this.saveToLocalStorage()
    }
    getAllRentals(){
        return this.allRentals
    }

    returnRentals(index){
        this.allRentals[index].rentalStatus = "Returned"
        this.saveToLocalStorage()
    }
    

}