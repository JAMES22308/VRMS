import { CustomerModel } from "../model/customerModel.js"
import { CustomerView } from "../views/customerView.js"
import { RentalView } from "../views/rentalView.js"

class Controller{
    constructor(){
        this.model = new CustomerModel()
        this.view = new CustomerView()
        this.rentalView = new RentalView()
        this.view.displayCustomer(this.model.getAllCustomers())
        this.updateIndex = null
        this.add()
        this.bindDeleteButtons()
        this.bindUpdateButtons()
        
    }

    add(){
        const form = document.getElementById("form")
        form.onsubmit = (e)=>{
            e.preventDefault()
            let [fullname, email, phone, address, select, date] = this.view.customerValue()

            let customer = {fullname, email, phone, address, select, date, status: "active"}
            if (this.updateIndex === null){
                this.model.addCustomer(customer)
                const allCustomer = this.model.getAllCustomers()
                this.view.displayCustomer(allCustomer)
                this.rentalView.customerValues(this.model.getAllCustomers())
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

    

   
}

export default new Controller()