import { ApiWrapper } from "./ApiWrapper.js";
import { API_URL } from "@env";
console.log(API_URL);

export class ApiService {
    constructor() {
        this.api = new ApiWrapper(API_URL);
    }

    // Función auxiliar para manejar errores
    async _callApi(method, ...args) {
        try {
            return await this.api[method](...args);
        } catch (error) {
            console.error(`Error in ${method}:`, error);
            throw error;
        }
    }

    // Block from auth

    signIn(data) {
        return this._callApi("signIn", data);
    }

    signUp(data) {
        return this._callApi("signUp", data);
    }

    // Block from User

    deleteAccount(user_id){
        return this._callApi("deleteAccount",user_id)
    }

    // Block from Recipes

    createRecipe(data) {
        return this._callApi("createRecipe", data);
    }

    updateRecipe(id, data) {
        return this._callApi("updateRecipe", id, data);
    }

    deleteRecipe(id) {
        return this._callApi("deleteRecipe", id);
    }

    getRecipeById(id) {
        return this._callApi("getRecipeById", id);
    }

    rateRecipe(recipeId, user_id, value) {
        data = { recipeId, user_id, value };
        return this._callApi("rateRecipe", data);
    }

    toggleFavorite(recipeId, user_id) {
        data = { recipeId, user_id };
        return this._callApi("toggleFavorite", data);
    }

    paginateRecipesPublic(currentPage = 1, limit = 10, viewer_id = null) {
        return this._callApi("paginateRecipesPublic", currentPage, limit,viewer_id);
    }

    paginateRecipesPublicByUser(currentPage = 1, limit = 10, userId, isPublic) {
        return this._callApi("paginateRecipesPublicByUser", currentPage, limit, userId, isPublic);
    }

    paginateRecipesByCategory(currentPage = 1, limit = 10, categoryId) {
        return this._callApi("paginateRecipesByCategory", currentPage, limit, categoryId);
    }

    paginateRecipesByGroup(currentPage = 1, limit = 10, groupId) {
        return this._callApi("paginateRecipesByGroup", currentPage, limit, groupId);
    }

    paginateRecipesByGroupUser(currentPage = 1, limit = 10, groupId, userId) {
        return this._callApi("paginateRecipesByGroupUser", currentPage, limit, groupId, userId); 
    }

    // Block from Categories

    getCategories(){
        return this._callApi('getCategories')
    }

    // Bloack from Groups

    createGroup(data) {
        return this._callApi('createGroup', data);
    }

    paginateGroups(currentPage = 1, limit = 10){
        return this._callApi('getPaginatedGroups',currentPage,limit)
    }

    addMembersToGroups(groupId, user_id) {
        return this._callApi('addMembersToGroups', groupId, user_id);
    }

}