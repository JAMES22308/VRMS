


export class VehicleView{
    getValues(){
        const make = document.getElementById("make").value
        const model = document.getElementById("model").value
        const year = document.getElementById("year").value
        const registrationNumber = document.getElementById("registrationNumber").value
        const type = document.getElementById("vehicle-type").value
        // const dailyRate = document.getElementById("dailyRate").value
        const dailyRate = parseFloat(document.getElementById("dailyRate").value)
        const mileage = document.getElementById("mileage").value
        const location = document.getElementById("location").value
        const status = document.getElementById("status").value

        return [make, model, year, registrationNumber,type,dailyRate,mileage,location, status]
    }
    displayValues(allVehicles){

        console.log(allVehicles)
        const tbody = document.getElementById("vehicleTbody")
        let html = ``
        for (let i=0; i<allVehicles.length; i++){
            html += `<tr>`
            html += `<td>${allVehicles[i].vehicleID}</td>`
            html += `<td>${allVehicles[i].make}</td>`
            html += `<td>${allVehicles[i].model}</td>`
            html += `<td>${allVehicles[i].year}</td>`
            html += `<td>${allVehicles[i].registrationNumber}</td>`
            html += `<td>${allVehicles[i].type}</td>`
            // html += `<td>${allVehicles[i].dailyRate}</td>`
            html += `<td>$${parseFloat(allVehicles[i].dailyRate).toFixed(2)}</td>`;

            html += `<td>${allVehicles[i].mileage}</td>`
            html += `<td>${allVehicles[i].location}</td>`
            html += `<td>${allVehicles[i].status}</td>`
            html += `<td><button class="vehicle_update_btn" data-index="${i}">Update</button></td>`
            html += `<td><button class="vehicle_delete_btn" data-index="${i}">Delete</button></td>`
            html += `</tr>`
        }

        tbody.innerHTML = html
    }

    displayUpdateValues(vehicle) {
        const make = document.getElementById("make")
        const model = document.getElementById("model")
        const year = document.getElementById("year")
        const registrationNumber = document.getElementById("registrationNumber")
        const type = document.getElementById("vehicle-type")
        const dailyRate = document.getElementById("dailyRate")
        const mileage = document.getElementById("mileage")
        const location = document.getElementById("location")
        const status = document.getElementById("status")

        make.value = vehicle.make
        model.value = vehicle.model
        year.value = vehicle.year
        registrationNumber.value = vehicle.registrationNumber
        type.value = vehicle.type
        dailyRate.value = vehicle.dailyRate
        mileage.value = vehicle.mileage
        location.value = vehicle.location
        status.value = vehicle.status

}




}