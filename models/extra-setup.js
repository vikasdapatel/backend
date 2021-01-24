const visitorsModel = require("./visitors.model");

function applyExtraSetup(sequelize) {
	const { clients, sites, invoice, invoiceTable, invoiceDefault, users,
		 visitors, entry,
		 buildingBlocks,
		 invitation,
		 roles,
		 employee
		 } = sequelize.models;

		 

	//HasMany
	clients.hasMany(sites);
	clients.hasMany(invoice);

	//invoice
	invoice.hasMany(invoiceTable);
	//user
	users.hasMany(invoiceDefault);
	users.hasMany(visitors);
	users.hasMany(entry);
	users.hasMany(invitation);

	//site
	sites.hasMany(visitors);
	sites.hasMany(users);
	sites.hasMany(buildingBlocks);

	//visitors
	visitors.hasMany(entry);
	visitors.hasMany(invitation);

	//building Blocks
	buildingBlocks.hasMany(users);
	
	

	//belongsTo
	sites.belongsTo(clients);
	invoice.belongsTo(clients);
	invoiceTable.belongsTo(invoice);
	invoiceDefault.belongsTo(users);
	visitors.belongsTo(users);
	visitors.belongsTo(sites);
	entry.belongsTo(visitors);
	entry.belongsTo(users);
	buildingBlocks.belongsTo(sites);
	users.belongsTo(buildingBlocks);
	users.belongsTo(sites);

	invitation.belongsTo(users);
	invitation.belongsTo(visitors);
	//Profile.belongsToMany(User, { through: User_Profile });
	//Inspection.hasMany(Inspection);
	//instrument.belongsTo(orchestra);
	
	initial();
	roles.belongsToMany(users, {
		through: "user_roles",
		foreignKey: "roleId",
		otherKey: "userId"
	  });
	  users.belongsToMany(roles, {
		through: "user_roles",
		foreignKey: "userId",
		otherKey: "roleId"
	  });

	  roles.belongsToMany(employee, {
		through: "employee_roles",
		foreignKey: "roleId",
		otherKey: "employeeId"
	  });
	  employee.belongsToMany(roles, {
		through: "employee_roles",
		foreignKey: "employeeId",
		otherKey: "roleId"
	  });

	  function initial() {
		let ROLES = [{
			id: 1,
		  	name: "superAdmin"	
		},{
			id: 2,
			name: "admin"
		},{
			id: 3,
			name: "webUser"
		}, {
			id: 4,
			name: "mobileUser"
		},{
			id: 5,
			name: "mobileUserAdmin"
		}, {
			id: 6,
			name: "Guard"
		}]
		roles.bulkCreate(ROLES, {
			returning: true,
			updateOnDuplicate: ["id"]
		});
	  }
	  
	  
	  
}

module.exports = { applyExtraSetup };