const phone = /(^$|^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$)/

const zipcode = /(^$|^\d{5}[-\s]?(?:\d{4})?$)/gm;


const regex = {
	phone, 
	zipcode
};

export default regex;