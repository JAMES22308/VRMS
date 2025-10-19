export class ReservationView{
    getValues(){
        const reservationCustomer = document.getElementById("reservationCustomer").value
        const select_reserve = document.getElementById("select_reserve").value
        const reservationDate = document.getElementById("reservationDate").value

        return [reservationCustomer, select_reserve, reservationDate]
    }
    customerValues(allcustomers){
        const customerOpt = document.getElementById("reservationCustomer")

        let html = `<option value="Select Custoemr">Select Customer</option>`
        for (let i=0; i<allcustomers.length; i++){
            html += `<option>${allcustomers[i].fullname}</option>`
        }

        customerOpt.innerHTML = html
    }

    vehicleValues(allVehicles){
        const vehicleOpt = document.getElementById("select_reserve")

        let html = `<option value="Select Vehicle">Select Vehicle</option>`
        for (let i=0; i<allVehicles.length; i++){
            if (allVehicles[i].status === "Available"){
                html += `<option>${allVehicles[i].registrationNumber}</option>`
            }
        }

        vehicleOpt.innerHTML = html
    }
    displayValues(allReserve){
        const reservationTbody = document.getElementById("reservationTbody")
        let html = ``

        for (let i=0; i<allReserve.length; i++){
            html += `<tr>`
            html += `<td>${allReserve[i].reservationCustomer}</td>`
            html += `<td>${allReserve[i].select_reserve}</td>`
            html += `<td>${allReserve[i].reservationDate}</td>`
            html += `<td>${allReserve[i].status}</td>`
            html += `<td><button class="reservation_delete-btn" data-index="${i}">Cancel</button></td>`
            html += `</tr>`
        }

        reservationTbody.innerHTML = html
    }
}