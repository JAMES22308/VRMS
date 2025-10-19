export class ReservationModel{
    constructor(){
        const saved = localStorage.getItem("reservation")
        this.allReservations = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("reservation", JSON.stringify(this.allReservations))
    }
    addReservation(reserve){
        this.allReservations.push(reserve)
        this.saveToLocalStorage()
    }
    getAllReservations(){
        return this.allReservations
    }

    cancelReservation(index) {
        this.allReservations[index].status = "Cancelled"
        this.saveToLocalStorage()

    }
}