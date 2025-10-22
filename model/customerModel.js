
function generateId() {
  let lastId = localStorage.getItem("lastCustomerId") || 0;
  let newId = Number(lastId) + 1;
  localStorage.setItem("lastCustomerId", newId);
  return `C00${newId}`;
}


export class CustomerModel{
    constructor(){
        const saved = localStorage.getItem("customer")
        this.allCustomers = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("customer", JSON.stringify(this.allCustomers))
    }

    addCustomer(customer){
        customer.userID = generateId()
        this.allCustomers.push(customer)
        this.saveToLocalStorage()
    }
    removeCustomer(index){
        this.allCustomers.splice(index, 1)
        this.saveToLocalStorage()

    }
    updateCustomer(customer, index) {
        const existingId = this.allCustomers[index].userID;
        customer.userID = existingId;

        this.allCustomers[index] = customer;
        this.saveToLocalStorage();
    }

    getAllCustomers(){
        return this.allCustomers
    }

    deactivateCustomer(index) {
        const currentStatus = this.allCustomers[index].status;
        if (currentStatus === "Active") {
            this.allCustomers[index].status = "Deactivated";

        } else {
            this.allCustomers[index].status = "Active";

        }

        this.saveToLocalStorage();
    }

}