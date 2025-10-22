

function generateId() {
  let lastId = localStorage.getItem("lastReservationId") || 0;
  let newId = Number(lastId) + 1;
  localStorage.setItem("lastReservationId", newId);
  return `R00${newId}`;
}


export class ReservationModel{
    constructor(){
        const saved = localStorage.getItem("reservation")
        this.allReservations = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("reservation", JSON.stringify(this.allReservations))
    }
    addReservation(reserve){
        reserve.reservationID = generateId()
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