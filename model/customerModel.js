export class CustomerModel{
    constructor(){
        const saved = localStorage.getItem("customer")
        this.allCustomers = saved ? JSON.parse(saved) : []
    }
    saveToLocalStorage(){
        localStorage.setItem("customer", JSON.stringify(this.allCustomers))
    }

    addCustomer(customer){
        this.allCustomers.push(customer)
        this.saveToLocalStorage()
    }
    removeCustomer(index){
        this.allCustomers.splice(index, 1)
        this.saveToLocalStorage()

    }
    updateCustomer(customer, index){
        this.allCustomers[index] = customer
        this.saveToLocalStorage()

    }
    getAllCustomers(){
        return this.allCustomers
    }
}