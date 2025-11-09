# Vehicle Rental Management System (VRMS)

## Overview
The Vehicle Rental Management System (VRMS) is a web-based application designed to efficiently manage a small vehicle rental company. It supports comprehensive functionality including:

- Customer management  
- Vehicle management  
- Rental transactions  
- Reservations  
- Vehicle search  
- Dashboard to track system activity  

The system is implemented using **HTML, CSS, and JavaScript**, following the **MVC architecture** for modularity and maintainability.  
All data is stored locally in the browser using **LocalStorage**, so changes persist between sessions.


**Testing:**  
The project uses the **Jasmine framework** for unit testing. All main functionalities are covered with unit tests to ensure correct behavior.  


**Note:**  
- You can use Night Mode for eye care.  
- If something goes wrong, just refresh the page (search section).  
- This is a responsive app, so you can use any device.

---

## 1. Login & Logout
- Secure login system with credentials:  
  - Username: `admin`  
  - Password: `admin123`  
- Logout functionality to end the session.  
- Users must be logged in to access any section of the application.

---

## 2. Dashboard
Displays key metrics for the rental company:  

- Total Vehicles  
- Available Vehicles  
- Total Customers  
- Active Customers  
- Total Rentals  
- Total Revenue  

Also shows recent rental transactions for a quick overview.  
All metrics update dynamically based on CRUD operations, rentals, and reservations.

---

## 3. Customer Management
Full CRUD functionality:

- **Create:** Add new customers with full details.  
- **Read:** View all customers in a structured table.  
- **Update:** Edit customer information as needed.  
- **Deactivate/Delete:** Deactivate or remove customers from the system.  

Customer details include:  
- Name  
- Email  
- Phone  
- Address  
- Type (Private / Corporate)  
- Registration Date  
- Active Status  

All customer data is saved in **LocalStorage** for persistent storage.

---

## 4. Vehicle Management
Full CRUD support for managing vehicles:  

- Add, update, and delete vehicle records.  

Vehicle details include:  
- Make  
- Model  
- Year  
- Registration Number  
- Type  
- Daily Rate  
- Mileage  
- Location  
- Status  

Vehicle availability is automatically updated based on rental and reservation status.  
Vehicle data is saved in **LocalStorage** to retain changes between sessions.

---

## 5. Rental Transactions
- Rent vehicles and record transactions.  
- Automatically calculates:  
  - Rental Fee: Based on vehicle's daily rate and rental duration.  
  - Overdue Fee: Based on late return days.  

Rental details include:  
- Customer  
- Vehicle  
- Start Date  
- End Date  
- Total Cost  
- Status  
- Overdue Fee  

Returning a vehicle updates its availability and status.  
All rental transactions are stored in **LocalStorage**.

---

## 6. Reservations
- Reserve vehicles for future rentals.  
- Reserved vehicles cannot be rented until the reservation is canceled or completed.  

Reservation functionality includes:  
- Create Reservation  
- Cancel Reservation  
- Check Reservation Status  

Reservation data is saved in **LocalStorage**.

---

## 7. Vehicle Search
Search for vehicles using multiple filters:  

- Make  
- Model  
- Location  
- Status (Available, Unavailable, Reserved)  

Results update dynamically as filters are applied.

---

## System Architecture
- Follows the **Model-View-Controller (MVC)** design pattern:  
  - **Model:** Manages application data and business logic.  
  - **View:** User interface (HTML & CSS).  
  - **Controller:** Handles user interaction and updates the view.  
- **LocalStorage** is used as the persistent data storage layer.

---

## Getting Started
Clone this repository:

```bash
git clone https://github.com/ComputingAra/portfolio-assessment-JAMES22308.git
