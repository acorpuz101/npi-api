const https = require('https');
const fetch = require("node-fetch");
const auth = require("./auth.json");

module.exports = class NpiApi {
  constructor() {
		this.method = "GET";
		this.version = "2.0";
	}

	async searchByFirstNameLastName(firstName, lastName) {
		try {
			let uri = `https://npiregistry.cms.hhs.gov/api/?version=${this.version}&first_name=${firstName}&last_name=${lastName}`;
		  const response = await fetch(uri, {
			  method: "GET",
			  headers: this.headers
		  });
		  return await response.json();
	  } catch (e) {
		  console.log('def err', e);
		  return e;
		}
  }

}