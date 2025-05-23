export class ApiWrapper {
  constructor(host) {
    this.host = host;
  }

async #_request(endpoint, method = 'GET', data) {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (data) options.body = JSON.stringify(data);

    try {
      console.log(`${this.host}/${endpoint}`);
      
      const response = await fetch(`${this.host}/${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error with ${method} request:`, error);
      throw error;
    }
  }

  #getData(endpoint) {
    return this.#_request(endpoint, 'GET');
  }

  #postData(endpoint, data) {
    return this.#_request(endpoint, 'POST', data);
  }

  #putData(endpoint, data) {
    return this.#_request(endpoint, 'PUT', data);
  }

  #deleteData(endpoint) {
    return this.#_request(endpoint, 'DELETE');
  }

  signIn(data) {
    return this.#postData('auth/signin', data);
  }

}