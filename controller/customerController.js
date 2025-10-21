import { CustomerModel } from "../model/customerModel.js"
import { CustomerView } from "../views/customerView.js"
import { RentalView } from "../views/rentalView.js"
import { ReservationView } from "../views/reservationView.js"

class Controller{
    constructor(){
        this.model = new CustomerModel()
        this.view = new CustomerView()
        this.rentalView = new RentalView()
        this.reservationView = new ReservationView()
        this.view.displayCustomer(this.model.getAllCustomers())
        this.updateIndex = null
        this.add()
        this.bindDeleteButtons()
        this.bindUpdateButtons()
        this.bindDeactivation()
        
    }

    add(){
        const form = document.getElementById("form")
        form.onsubmit = (e)=>{
            e.preventDefault()
            let [fullname, email, phone, address, select, date] = this.view.customerValue()
            if (!fullname || !email || !phone || !address || !select || !date) {
                alert("Please fill in all required fields!");
                return;
            }
            let customer = {fullname, email, phone, address, select, date, status: "Active"}
            if (this.updateIndex === null){
                this.model.addCustomer(customer)
                const allCustomer = this.model.getAllCustomers()
                this.view.displayCustomer(allCustomer)
                this.rentalView.customerValues(this.model.getAllCustomers())
                this.reservationView.customerValues(this.model.getAllCustomers())
            }else{
                
                this.model.updateCustomer(customer, this.updateIndex)
                const allCustomer = this.model.getAllCustomers()
                this.view.displayCustomer(allCustomer)
                this.updateIndex = null
                const addBtn = document.getElementById("addCustomer")
                addBtn.innerHTML = "Add Customer"
                this.rentalView.customerValues(this.model.getAllCustomers())
            }
            
        }
    }
    bindDeleteButtons() {   
        const tbody = document.getElementById("tbody");
        tbody.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) {
                const index = e.target.dataset.index;
                const converted = parseInt(index)
                this.model.removeCustomer(converted)
                const allCustomer = this.model.getAllCustomers()
                this.view.displayCustomer(allCustomer)
                this.rentalView.customerValues(this.model.getAllCustomers())


            }
        });
    }

    bindUpdateButtons(){
        const tbody = document.getElementById("tbody");
        tbody.addEventListener("click", (e)=>{
            if (e.target.classList.contains("update-btn")){
                const index = e.target.dataset.index
                const converted = parseInt(index)
                console.log(typeof converted, converted)
                const allCustomer = this.model.getAllCustomers()
                const addBtn = document.getElementById("addCustomer")
                addBtn.innerHTML = "Update Customer"
                this.view.updateCustomer(allCustomer, index)
                this.updateIndex = index
                

            }
        })

    }



    bindDeactivation(){
        const tbody = document.getElementById("tbody")
        tbody.addEventListener("click", (e)=>{
            if (e.target.classList.contains("deactivate-btn")){
                const index = e.target.dataset.index
                this.model.deactivateCustomer(index)
                this.view.displayCustomer(this.model.getAllCustomers())

                this.rentalView.customerValues(this.model.getAllCustomers())
                this.reservationView.customerValues(this.model.getAllCustomers())
            }
        })
    }

    

   
}

export default new Controller()