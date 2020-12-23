const visitorsModel = require("./visitors.model");

function applyExtraSetup(sequelize) {
	const { Clients, Sites, Invoice, InvoiceTable, InvoiceDefault, Users,
		 Visitors, Entry,
		 BuildingBlocks,
		 Flats,
		 Invitation,
		 Role,
		 Employee
		 } = sequelize.models;

	//HasMany
	Clients.hasMany(Sites);
	Clients.hasMany(Invoice);

	//invoice
	Invoice.hasMany(InvoiceTable);
	//user
	Users.hasMany(InvoiceDefault);
	Users.hasMany(Visitors);
	Users.hasMany(Entry);
	Users.hasMany(Invitation);

	//site
	Sites.hasMany(Visitors);
	Sites.hasMany(Users);
	Sites.hasMany(BuildingBlocks);

	//visitors
	Visitors.hasMany(Entry);
	Visitors.hasMany(Invitation);

	//building Blocks
	BuildingBlocks.hasMany(Users);
	
	

	//belongsTo
	Sites.belongsTo(Clients);
	Invoice.belongsTo(Clients);
	InvoiceTable.belongsTo(Invoice);
	InvoiceDefault.belongsTo(Users);
	Visitors.belongsTo(Users);
	Visitors.belongsTo(Sites);
	Entry.belongsTo(Visitors);
	Entry.belongsTo(Users);
	BuildingBlocks.belongsTo(Sites);
	Users.belongsTo(BuildingBlocks);
	Users.belongsTo(Sites);

	Invitation.belongsTo(Users);
	Invitation.belongsTo(Visitors);
	//Profile.belongsToMany(User, { through: User_Profile });
	//Inspection.hasMany(Inspection);
	//instrument.belongsTo(orchestra);

	Role.belongsToMany(Users, {
		through: "user_roles",
		foreignKey: "roleId",
		otherKey: "userId"
	  });
	  Users.belongsToMany(Role, {
		through: "user_roles",
		foreignKey: "userId",
		otherKey: "roleId"
	  });

	  Role.belongsToMany(Employee, {
		through: "employee_roles",
		foreignKey: "roleId",
		otherKey: "employeeId"
	  });
	  Employee.belongsToMany(Role, {
		through: "employee_roles",
		foreignKey: "employeeId",
		otherKey: "roleId"
	  });

	  function initial() {
		Role.create({
		  id: 1,
		  name: "superAdmin"
		});
	   
		Role.create({
		  id: 2,
		  name: "admin"
		});
	   
		Role.create({
		  id: 3,
		  name: "webUser"
		});

		Role.create({
			id: 4,
			name: "mobileUser"
		  });

		  Role.create({
			id: 5,
			name: "mobileUserAdmin"
		  });

		  Role.create({
			id: 6,
			name: "Guard"
		  });
	  }
	  
	  initial();
}

module.exports = { applyExtraSetup };