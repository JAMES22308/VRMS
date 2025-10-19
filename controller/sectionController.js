class Controller{
    constructor(){
        this.bindSections()
    }
    updateSection(activeID){
        const sections = document.querySelectorAll(".section")
        for (let i=0; i<sections.length; i++){
            if (sections[i].id === activeID){
                sections[i].classList.add("active")
            }else{
                sections[i].classList.remove("active")
            }
        }
    }
    bindSections(){
        const customers_btn = document.getElementById("customers_btn")
        const vehicles_btn = document.getElementById("vehicles_btn")
        const rentals_btn = document.getElementById("rentals_btn")
        const reservations_btn = document.getElementById("reservations_btn")
        const search_btn = document.getElementById("search_btn")

        customers_btn.onclick = ()=> this.updateSection('customers_page')
        vehicles_btn.onclick = ()=> this.updateSection('vehicles_page')
        rentals_btn.onclick = ()=> this.updateSection('rentals_page')
        reservations_btn.onclick = ()=> this.updateSection('reservations_page')
        search_btn.onclick = ()=> this.updateSection('search_page')
        
    }
}

const app = new Controller()