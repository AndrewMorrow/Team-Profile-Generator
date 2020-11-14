const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
function Manager(name, id, email, officeNumber) {
    Employee.call(this, name, id, email);
    this.officeNumber = officeNumber;
}

// These two are the same?
Manager.prototype = new Employee();
// same as above
Manager.prototype = Object.create(Employee.prototype);

// These two are the same?
Manager.prototype.constructor = Manager;
// Same as above
Object.defineProperty(Manager.prototype, "constructor", {
    value: Manager,
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true,
});
