'use strict';

const {packRes, packError } = require("../libs/utils");

const hello = async (event) => {
	try {
		const obj = [{
			message: 'Go Serverless v1.1! Your function executed successfully!',
			input: event
		}];
		return packRes(...obj);
	} catch (err) {
		packError(err, "helloError");
	}
};

module.exports = {
	hello
}