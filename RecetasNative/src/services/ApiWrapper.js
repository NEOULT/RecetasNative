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

  // Block from auth

  signIn(data) {
    console.log('Signing in with data:', data);
    
    return this.#postData('auth/signin', data);
  }

  signUp(data) {
    return this.#postData('auth/signup', data);
  }

  // Block from User

  deleteAccount(user_id){
    return this.#deleteData(`user/${user_id}`)
  }

  getProfile(user_id) {
    return this.#getData(`user/me/${user_id}`);
  }

  toggleFollowUser(data) {
    return this.#postData(`user/follow`, data);
  }
  
  getUserProfile(user_id) {
    return this.#getData(`user/${user_id}`);
  }

  updateProfile(user_id, data) {
    return this.#putData(`user/profile/${user_id}`, data);
  }

  softDeleteUser(user_id) {
    return this.#putData(`user/softDelete/${user_id}`);
  }

  //Block from Recipes

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

  toggleFavorite(data) {
    return this.#postData(`user/favorite`, data);
  }

  getRecipeById(id) {
    const data = { currentPage: 1, limit: 10, _id: id };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipeFavorites(user_id, currentPage = 1, limit = 10) {
    const data = { currentPage, limit, user_id };
    return this.#postData(`recipe/favoritesUser`, data);
  }

  paginateRecipesPublic(currentPage = 1, limit = 10, viewer_id = null) {
    const data = { currentPage, limit, isPublic: true, viewer_id };
    return this.#postData(`recipe/paginated`, data); 
  }

  paginateRecipesPublicByUser(currentPage = 1, limit = 10, user_id, isPublic = true) {
    const data = { currentPage, limit, user_id, isPublic};
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByCategory(currentPage = 1, limit = 10, categories) {
    const data = { currentPage, limit, categories, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByGroup(currentPage = 1, limit = 10, groups, isOwner = false) {
    const data = isOwner ? { currentPage, limit, groups } : { currentPage, limit, groups, isPublic:true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByGroupUser(currentPage = 1, limit = 10, groupId, userId) {
    const data = { currentPage, limit, groupId, userId, isPublic: true };
    return this.#postData(`recipe/paginated`, data);
  }

  paginateRecipesByUser (currentPage = 1, limit = 10, userId) {
    const data = { currentPage, limit, user_id: userId};
    return this.#postData(`recipe/paginated`, data);
  }

  //Block from Categories

  getCategories(){
    return this.#getData('categories/all');
  }

  //Block from Groups

  createGroup(data) {
    return this.#postData('group', data);
  } 

  updateGroup(id, data) {
    return this.#putData(`group/${id}`, data);
  }
  
  softDeleteGroup(id) {
    return this.#deleteData(`group/softDelete/${id}`);
  }

  deleteGroup(id) {
    return this.#deleteData(`group/${id}`);
  }

  getPaginatedGroups(currentPage = 1, limit = 10) {
    const data = { currentPage, limit, isPublic: true, deletedAt: '' };
    return this.#postData(`group/paginate`, data);
  }

  getPaginateGroupsByUser(currentPage = 1, limit = 10, userId) {
    const data = { currentPage, limit, userId, deletedAt: ''};
    return this.#postData(`group/paginate`, data);
  }

  getPaginatePublicGroupsByUser(currentPage = 1, limit = 10, userId, isPublic = true) {
    const data = { currentPage, limit, userId, isPublic, deletedAt: '' };
    return this.#postData(`group/paginate`, data);
  }

  addMembersToGroup(groupId, user_id){
    const data = { groupId, user_id };
    return this.#postData(`group/togglemember`, data);
  }

  addRecipeToGroup(groupId, recipeId) {
    const data = { groupId, recipeId };
    return this.#putData(`group/addRecipe/${groupId}`, data);
  }

  removeRecipeFromGroup(groupId, recipeId) {
    const data = { groupId, recipeId };
    return this.#putData(`group/removeRecipe/${groupId}`, data);
  }

}