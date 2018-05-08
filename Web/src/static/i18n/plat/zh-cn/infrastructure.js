import user from "./infrastructure/user.js";
import structure from "./infrastructure/structure.js";
import position from "./infrastructure/position.js";
import station from "./infrastructure/station.js";
import employee from "./infrastructure/employee.js";
import permission from "./infrastructure/permission.js";


export default {
	...user,
	...structure,
	...position,
	...station,
	...employee,
	...permission
}