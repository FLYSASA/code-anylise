import project from "./base/project.js";
import building from "./base/building.js";
import land from "./base/land.js";
import projectType from "./base/projectType.js";
import projectPeriod from "./base/projectPeriod.js";
import formType from "./base/formType.js";
import professionalType from "./base/professionalType.js";


export default {
	...project,
	...building,
	...land,
	...projectType,
    ...projectPeriod,
    ...formType,
    ...professionalType
}