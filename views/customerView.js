export class CustomerView{
    customerValue(){
        const fullname = document.getElementById("fullName").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const address = document.getElementById("address").value
        const select = document.getElementById("customer-type").value
        const date = document.getElementById("date").value

        return [fullname, email, phone, address, select, date]
    }

    displayCustomer(allCustomers){

        const tbody = document.getElementById("tbody")
        let html = ``
        for (let i=0; i<allCustomers.length; i++){
            html += `<tr>`
            html += `<td>${allCustomers[i].userID}</td>`
            html += `<td>${allCustomers[i].fullname}</td>`
            html += `<td>${allCustomers[i].email}</td>`
            html += `<td>${allCustomers[i].phone}</td>`
            html += `<td>${allCustomers[i].address}</td>`
            html += `<td>${allCustomers[i].select}</td>`
            html += `<td>${allCustomers[i].date}</td>`

            html += `<td><span style="height: 10px; width: 10px; border-radius: 50%; display: inline-block; background-color: ${allCustomers[i].status === "Active"? 'yellow': 'red'};"></span> ${allCustomers[i].status}</td>`

            html += `<td><button class="deactivate-btn" data-index="${i}">Set Status</button></td>`
            html += `<td><button class="update-btn" data-index="${i}">Update</button></td>`
            html += `<td><button class="delete-btn" data-index="${i}">Delete</button></td>`
            html += `</tr>`
        }
        tbody.innerHTML = html

    }

    updateCustomer(allCustomer, index){
        const fullname = document.getElementById("fullName")
        const email = document.getElementById("email")
        const phone = document.getElementById("phone")
        const address = document.getElementById("address")
        const select = document.getElementById("customer-type")
        const date = document.getElementById("date")

        console.log(allCustomer[index])
        fullname.value = allCustomer[index].fullname
        email.value = allCustomer[index].email
        phone.value = allCustomer[index].phone
        address.value = allCustomer[index].address
        select.value = allCustomer[index].select
        date.value = allCustomer[index].date


    }

    
}
