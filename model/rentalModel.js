export class RentalModel{
    constructor(){
        const saved = localStorage.getItem("rentals")
        this.allRentals = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("rentals", JSON.stringify(this.allRentals))
    }
    addRentals(rental){
        this.allRentals.push(rental)
        this.saveToLocalStorage()
    }
    deleteRentals(index){
        this.allRentals.splice(index, 1)
        this.saveToLocalStorage()

    }
    updateRentals(rentals, index){
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