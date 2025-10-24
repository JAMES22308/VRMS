export class DashboardView{
    displayAllValues(allRentals){
        const recentRentalsBody = document.getElementById("recentRentalsBody")
        let html = ``
        for (let i=0; i<allRentals.length; i++){
            html += `<tr>`
            html += `<td><button>${allRentals[i].rentalID}</button></td>`
            html += `<td>${allRentals[i].customer}</td>`
            html += `<td>${allRentals[i].rentalVehicle}</td>`
            html += `<td>${allRentals[i].rentalStartDate}</td>`
            html += `<td>${allRentals[i].rentalEndDate}</td>`
            html += `<td class="total-cost">+$${parseFloat(allRentals[i].totalCost).toFixed(2)}</td>`;


            html += `</tr>`
        }

        recentRentalsBody.innerHTML = html
    }

  totalRevenue(total){
    const totalRevenueEl = document.getElementById("totalRevenue");
    totalRevenueEl.innerHTML = `$${total.toFixed(2)}`;
}

totalRentals(total){
    const totalRentals = document.getElementById("totalRentals")

    totalRentals.textContent = total
}

totalCustomers(total){
    const totalCustomers = document.getElementById("totalCustomers")

    totalCustomers.textContent = total
}


totalActiceCustomer(total){
    const activeCustomers = document.getElementById("activeCustomers")

    activeCustomers.textContent = total
}

getTotalVehicles(total){
    const totalVehicles = document.getElementById("totalVehicles")
    totalVehicles.textContent = total
}

getTotalAvailableVehicles(total){
    const availableVehicles = document.getElementById("availableVehicles")

    availableVehicles.textContent = total
}

}