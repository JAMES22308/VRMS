export class RentalView{
    customerValues(allCustomer){
        const customerOpt = document.getElementById("rentalCustomer")

        let html = `<option value="Select Customer">Select Customer</option>`
        for (let i=0; i<allCustomer.length; i++){
            if (allCustomer[i].status === "Active"){
                html += `<option>${allCustomer[i].fullname}</option>`
            }
        }
        customerOpt.innerHTML = html
    }

    vehicleValues(allVehicles){
        const vehicleOpt = document.getElementById("rentalVehicle")

        let html = `<option value="Select Vehicle">Select Vehicle</option>`
        for (let i=0; i<allVehicles.length; i++){
            if(allVehicles[i].status === "Available"){
                html += `<option value="${allVehicles[i].registrationNumber}" data-index="${i}">${allVehicles[i].make} ${allVehicles[i].model} - ${allVehicles[i].registrationNumber}</option>`
            }
        }

        vehicleOpt.innerHTML = html
    }

    getValues() {
        const customer = document.getElementById("rentalCustomer").value
        const rentalVehicle = document.getElementById("rentalVehicle").value
        const rentalStartDate = document.getElementById("rentalStartDate").value
        const totalCost = document.getElementById("totalCost").value
        const rentalEndDate = document.getElementById("rentalEndDate").value
        // const rentalStatus = document.getElementById("rentalStatus").value

        

        return [customer, rentalVehicle, rentalStartDate, rentalEndDate, totalCost]
    }


    // displayRentals(allRentals){
    //     const vehicleTbody = document.getElementById("rentalTbody")
    //     let html = ``

    //     for (let i=0; i<allRentals.length; i++){
    //         html += `<tr>`
    //         html += `<td>${allRentals[i].rentalID}</td>`
    //         html += `<td>${allRentals[i].customer}</td>`
    //         html += `<td>${allRentals[i].rentalVehicle}</td>`
    //         html += `<td>${allRentals[i].rentalStartDate}</td>`
    //         html += `<td>${allRentals[i].rentalEndDate}</td>`
    //         // html += `<td>$${allRentals[i].totalCost}</td>`
    //         html += `<td>$${parseFloat(allRentals[i].totalCost).toFixed(2)}</td>`;

    //         html += `<td>${allRentals[i].rentalStatus}</td>`
    //         html += `<td><button class="rentals_delete-btn" data-index="${i}">Delete</button></td>`
    //         html += `<td><button class="return_btn" data-index="${i}">Return</button></td>`
    //         html += `</tr>`
    //     }

    //     vehicleTbody.innerHTML = html
    // }


    displayRentals(allRentals){
    const vehicleTbody = document.getElementById("rentalTbody")
    let html = ``

    for (let i=0; i<allRentals.length; i++){
        html += `<tr>`
        html += `<td>${allRentals[i].rentalID}</td>`
        html += `<td>${allRentals[i].customer}</td>`
        html += `<td>${allRentals[i].rentalVehicle}</td>`
        html += `<td>${allRentals[i].rentalStartDate}</td>`
        html += `<td>${allRentals[i].rentalEndDate}</td>`
        html += `<td>$${parseFloat(allRentals[i].totalCost).toFixed(2)}</td>`
        html += `<td>${allRentals[i].rentalStatus}</td>`
        html += `<td>$${allRentals[i].overdueFee ? allRentals[i].overdueFee.toFixed(2) : "0.00"}</td>` // NEW
        html += `<td><button class="return_btn" data-index="${i}">Return</button></td>`
        html += `<td><button class="rentals_delete-btn" data-index="${i}">Delete</button></td>`
        html += `</tr>`
    }

    vehicleTbody.innerHTML = html
}


    diplayUpdateValue(allRentals, index){
        const customer = document.getElementById("rentalCustomer")
        const rentalVehicle = document.getElementById("rentalVehicle")
        const rentalStartDate = document.getElementById("rentalStartDate")
        const totalCost = document.getElementById("totalCost")
        const rentalEndDate = document.getElementById("rentalEndDate")
        const rentalStatus = document.getElementById("rentalStatus")

        // console.log(customer.value, allRentals[index])

        customer.value = allRentals[index].customer
        rentalVehicle.value = allRentals[index].rentalVehicle
        rentalStartDate.value = allRentals[index].rentalStartDate
        totalCost.value = allRentals[index].totalCost
        rentalEndDate.value = allRentals[index].rentalEndDate
        rentalStatus.value = allRentals[index].rentalStatus
    }
    

    
}