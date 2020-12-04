import faker from "faker";

const RandomGenerator = {
	randomLabName(){
		return `${faker.company.companyName()}`;
	},
	randomDirectorName(){
		return `${faker.name.title()} ${faker.name.lastName()} ${faker.name.firstName()}`
	},
	randomCity(){
		return faker.address.city();
	},
	randomCountry(){
		return faker.address.country();
	}
}

export {RandomGenerator};