import { CustomerModel } from "../model/customerModel.js";
import { VehicleModel } from "../model/vehicleModel.js";
import { RentalModel } from "../model/rentalModel.js";
import { ReservationModel } from "../model/reservationModel.js";
import { SearchView } from "../views/searchViews.js";


describe("Customer Management", function() {
  let model;

  beforeEach(function() {
    localStorage.clear();
    model = new CustomerModel();
  });

  it("should add a new customer", function() {
    const customer = {
      fullname: "John Doe",
      email: "john@example.com",
      phone: "123456",
      address: "123 Street",
      select: "Regular",
      date: "2025-10-21",
      status: "Active"
    };

    model.addCustomer(customer);
    const all = model.getAllCustomers();

    expect(all.length).toBe(1);
    expect(all[0].fullname).toBe("John Doe");
    expect(all[0].status).toBe("Active");
  });

  it("should remove a customer", function() {
    const c1 = { fullname: "A", email: "a@a.com", phone: "1", address: "a", select: "Reg", date: "2025", status: "Active" };
    const c2 = { fullname: "B", email: "b@b.com", phone: "2", address: "b", select: "Reg", date: "2025", status: "Active" };

    model.addCustomer(c1);
    model.addCustomer(c2);
    model.removeCustomer(0);

    const all = model.getAllCustomers();
    expect(all.length).toBe(1);
    expect(all[0].fullname).toBe("B");
  });

  it("should update a customer", function() {
    const c1 = { fullname: "Old", email: "old@x.com", phone: "111", address: "A", select: "Reg", date: "2025", status: "Active" };
    model.addCustomer(c1);

    const updated = { fullname: "New", email: "new@x.com", phone: "222", address: "B", select: "VIP", date: "2026", status: "Active" };
    model.updateCustomer(updated, 0);

    const all = model.getAllCustomers();
    expect(all[0].fullname).toBe("New");
    expect(all[0].email).toBe("new@x.com");
  });

  it("should deactivate and activate a customer", function() {
    const c1 = { fullname: "A", email: "a@a.com", phone: "1", address: "a", select: "Reg", date: "2025", status: "Active" };
    model.addCustomer(c1);

    model.deactivateCustomer(0);
    expect(model.getAllCustomers()[0].status).toBe("Deactivated");

    model.deactivateCustomer(0);
    expect(model.getAllCustomers()[0].status).toBe("Active");
  });
});


// ================= VEHICLE MODEL TESTS =================

describe("Vehicle Management", function() {
  let model;

  beforeEach(function() {
    localStorage.clear();
    model = new VehicleModel();
  });

  it("should add a new vehicle", function() {
    const vehicle = {
      make: "Toyota",
      model: "Vios",
      year: "2024",
      registrationNumber: "ABC123",
      type: "Sedan",
      dailyRate: "100",
      mileage: "0",
      location: "Christchurch",
      status: "Available"
    };

    model.addVehicle(vehicle);
    const all = model.getAllVehicle();

    expect(all.length).toBe(1);
    expect(all[0].make).toBe("Toyota");
    expect(all[0].status).toBe("Available");
  });

  it("should remove a vehicle", function() {
    const v1 = { make: "Honda", model: "Civic", year: "2023", registrationNumber: "XYZ999", type: "Sedan", dailyRate: "90", mileage: "5000", location: "Auckland", status: "Available" };
    const v2 = { make: "Mazda", model: "CX-5", year: "2022", registrationNumber: "AAA111", type: "SUV", dailyRate: "120", mileage: "8000", location: "Christchurch", status: "Available" };

    model.addVehicle(v1);
    model.addVehicle(v2);
    model.removeVehicle(0);

    const all = model.getAllVehicle();
    expect(all.length).toBe(1);
    expect(all[0].make).toBe("Mazda");
  });

  it("should update a vehicle", function() {
    const v1 = { make: "Nissan", model: "Navara", year: "2021", registrationNumber: "BBB222", type: "Truck", dailyRate: "150", mileage: "10000", location: "Wellington", status: "Available" };
    model.addVehicle(v1);

    const updated = { make: "Nissan", model: "X-Trail", year: "2025", registrationNumber: "BBB222", type: "SUV", dailyRate: "130", mileage: "0", location: "Christchurch", status: "Available" };
    model.updateVehicle(0, updated);

    const all = model.getAllVehicle();
    expect(all[0].model).toBe("X-Trail");
    expect(all[0].year).toBe("2025");
  });
});



describe("Rental Management", function() {
  let model;

  beforeEach(function() {
    localStorage.clear();
    model = new RentalModel();
  });

  it("should add a new rental", function() {
    const rental = {
      customer: "John Doe",
      rentalVehicle: "ABC123",
      rentalStartDate: "2025-10-21",
      rentalEndDate: "2025-10-23",
      totalCost: 200,
      rentalStatus: "Rented"
    };

    model.addRentals(rental);
    const all = model.getAllRentals();

    expect(all.length).toBe(1);
    expect(all[0].customer).toBe("John Doe");
    expect(all[0].rentalStatus).toBe("Ongoing");
  });

  it("should delete a rental", function() {
    const r1 = { customer: "A", rentalVehicle: "AAA111", rentalStartDate: "2025-10-01", rentalEndDate: "2025-10-02", totalCost: 100, rentalStatus: "Rented" };
    const r2 = { customer: "B", rentalVehicle: "BBB222", rentalStartDate: "2025-10-03", rentalEndDate: "2025-10-05", totalCost: 150, rentalStatus: "Rented" };

    model.addRentals(r1);
    model.addRentals(r2);
    model.deleteRentals(0);

    const all = model.getAllRentals();
    expect(all.length).toBe(1);
    expect(all[0].customer).toBe("B");
  });

  it("should update a rental", function() {
    const r1 = { customer: "Old", rentalVehicle: "CCC333", rentalStartDate: "2025-10-01", rentalEndDate: "2025-10-03", totalCost: 150, rentalStatus: "Rented" };
    model.addRentals(r1);

    const updated = { customer: "New", rentalVehicle: "DDD444", rentalStartDate: "2025-10-10", rentalEndDate: "2025-10-12", totalCost: 300, rentalStatus: "Rented" };
    model.updateRentals(updated, 0);

    const all = model.getAllRentals();
    expect(all[0].customer).toBe("New");
    expect(all[0].rentalVehicle).toBe("DDD444");
    expect(all[0].totalCost).toBe(300);
  });

  it("should mark a rental as returned", function() {
    const rental = {
      customer: "ReturnTest",
      rentalVehicle: "ZZZ999",
      rentalStartDate: "2025-10-15",
      rentalEndDate: "2025-10-17",
      totalCost: 250,
      rentalStatus: "Rented"
    };

    model.addRentals(rental);
    model.returnRentals(0);

    const all = model.getAllRentals();
    expect(all[0].rentalStatus).toBe("Returned");
  });

  it("should save and load rentals from localStorage", function() {
    const rental = { customer: "TestSave", rentalVehicle: "SAVE001", rentalStartDate: "2025-10-20", rentalEndDate: "2025-10-21", totalCost: 100, rentalStatus: "Rented" };
    model.addRentals(rental);

    const newInstance = new RentalModel();
    const loadedRentals = newInstance.getAllRentals();

    expect(loadedRentals.length).toBe(1);
    expect(loadedRentals[0].customer).toBe("TestSave");
  });
});



describe("Reservation Management", () => {
  let model;

  beforeEach(() => {
    localStorage.clear();
    model = new ReservationModel();
  });

  it("should initialize with an empty array if localStorage is empty", () => {
    expect(model.getAllReservations().length).toBe(0);
  });

  it("should add a reservation", () => {
    const reserve = {
      reservationCustomer: "John Doe",
      select_reserve: "ABC123",
      reservationDate: "2025-10-21",
      status: "Reserved"
    };

    model.addReservation(reserve);

    const all = model.getAllReservations();
    expect(all.length).toBe(1);
    expect(all[0].reservationCustomer).toBe("John Doe");
    expect(all[0].status).toBe("Reserved");
  });

  it("should save and load from localStorage", () => {
    const reserve = {
      reservationCustomer: "Jane Smith",
      select_reserve: "XYZ456",
      reservationDate: "2025-10-22",
      status: "Reserved"
    };

    model.addReservation(reserve);

    // Create new instance to simulate reloading
    const newModel = new ReservationModel();
    const all = newModel.getAllReservations();

    expect(all.length).toBe(1);
    expect(all[0].select_reserve).toBe("XYZ456");
  });

  it("should cancel a reservation by index", () => {
    const reserve = {
      reservationCustomer: "Alice",
      select_reserve: "CAR001",
      reservationDate: "2025-10-23",
      status: "Reserved"
    };

    model.addReservation(reserve);
    model.cancelReservation(0);

    const all = model.getAllReservations();
    expect(all[0].status).toBe("Cancelled");
  });
});



describe("Search Functionality", () => {
  let view, vehicleModel, searchInput, resultsBody, testContainer;

  beforeEach(() => {
    localStorage.clear();

    // Create an isolated container
    testContainer = document.createElement("div");
    testContainer.innerHTML = `
      <input id="vehicleSearchInput" type="text">
      <table><tbody id="searchResultsBody"></tbody></table>
    `;
    document.body.appendChild(testContainer);

    // Initialize model and view
    vehicleModel = new VehicleModel();
    view = new SearchView();

    // Add sample vehicles
    vehicleModel.addVehicle({
      make: "Toyota",
      model: "Vios",
      year: "2024",
      registrationNumber: "ABC123",
      type: "Sedan",
      dailyRate: "100",
      mileage: "0",
      location: "Christchurch",
      status: "Available"
    });

    vehicleModel.addVehicle({
      make: "Honda",
      model: "Civic",
      year: "2023",
      registrationNumber: "XYZ789",
      type: "Sedan",
      dailyRate: "90",
      mileage: "2000",
      location: "Auckland",
      status: "Unavailable"
    });

    // Cache DOM references
    searchInput = document.getElementById("vehicleSearchInput");
    resultsBody = document.getElementById("searchResultsBody");
  });

  afterEach(() => {
    testContainer.remove();
  });

  it("should display all vehicles initially", () => {
    view.displayAllValues(vehicleModel.getAllVehicle());
    expect(resultsBody.querySelectorAll("tr").length).toBe(2);
  });

  it("should filter vehicles by make when user types", () => {
    const keyword = "toyota";
    const sorted = vehicleModel.getAllVehicle().filter(
      v =>
        v.make.toLowerCase().includes(keyword) ||
        v.model.toLowerCase().includes(keyword) ||
        v.status.toLowerCase().includes(keyword) ||
        v.location.toLowerCase().includes(keyword)
    );

    view.sortedValues(sorted);

    expect(resultsBody.querySelectorAll("tr").length).toBe(1);
    expect(resultsBody.innerHTML).toContain("Toyota");
  });

  it("should filter vehicles by location", () => {
    const keyword = "auckland";
    const sorted = vehicleModel.getAllVehicle().filter(
      v =>
        v.make.toLowerCase().includes(keyword) ||
        v.model.toLowerCase().includes(keyword) ||
        v.status.toLowerCase().includes(keyword) ||
        v.location.toLowerCase().includes(keyword)
    );

    view.sortedValues(sorted);

    expect(resultsBody.querySelectorAll("tr").length).toBe(1);
    expect(resultsBody.innerHTML).toContain("Auckland");
  });

  it("should filter vehicles by model, make, location, and status", () => {
    const keyword = "vios"; // matches model
    const sorted = vehicleModel.getAllVehicle().filter(
      v =>
        v.make.toLowerCase().includes(keyword) ||
        v.model.toLowerCase().includes(keyword) ||
        v.status.toLowerCase().includes(keyword) ||
        v.location.toLowerCase().includes(keyword)
    );

    view.sortedValues(sorted);

    expect(resultsBody.querySelectorAll("tr").length).toBe(1);
    expect(resultsBody.innerHTML).toContain("Vios");

    // Test another keyword: status
    const statusKeyword = "unavailable";
    const statusSorted = vehicleModel.getAllVehicle().filter(
      v =>
        v.make.toLowerCase().includes(statusKeyword) ||
        v.model.toLowerCase().includes(statusKeyword) ||
        v.status.toLowerCase().includes(statusKeyword) ||
        v.location.toLowerCase().includes(statusKeyword)
    );

    view.sortedValues(statusSorted);
    expect(resultsBody.querySelectorAll("tr").length).toBe(1);
    expect(resultsBody.innerHTML).toContain("Unavailable");
  });
  afterAll(() => {
      localStorage.clear();
    });

});
