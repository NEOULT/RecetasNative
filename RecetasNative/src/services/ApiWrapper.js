export class ApiWrapper {
  constructor(host) {
    this.baseUrl = host;
  }
  
  async #_request(endpoint, method = 'GET', data) {
    const url = `${this.baseUrl}/${endpoint}`;
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    let responseBody;
    try {
      responseBody = await response.json();
    } catch {
      responseBody = null;
    }

    if (!response.ok) {
      // Muestra el mensaje de error del backend si existe
      const errorMsg = responseBody?.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMsg);
    }

    return responseBody;
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

  signUp(data) {
    return this.#postData('auth/signup', data);
  }

  createRecipe(data) {
    return this.#postData('recipe', data);
  }

  updateRecipe(id, data) {
    return this.#putData(`recipe/${id}`, data);
  }

  deleteRecipe(id) {
    return this.#deleteData(`recipe/${id}`);
  }

  rateRecipe(data) {
    return this.#postData(`recipe/rate`, data);
  }

  paginateRecipesPublic(currentPage = 1, limit = 10) {
    data = { currentPage, limit, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesPublicByUser(currentPage = 1, limit = 10, user_id) {
    data = { currentPage, limit, user_id, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByCategory(currentPage = 1, limit = 10, categories) {
    data = { currentPage, limit, categories, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByGroup(currentPage = 1, limit = 10, groupId) {
    data = { currentPage, limit, groupId, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByGroupUser(currentPage = 1, limit = 10, groupId, userId) {
    data = { currentPage, limit, groupId, userId, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

}