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

    softDeleteUser(user_id) {
        return this._callApi("softDeleteUser", user_id);
    }
    

    getProfile(user_id) {
        return this._callApi("getProfile", user_id);
    }

    toggleFollowUser(current_user_id, target_user_id) {
        const data = { current_user_id, target_user_id };
        return this._callApi("toggleFollowUser", data);
    }
    getUserProfile(user_id) {
        return this._callApi("getUserProfile", user_id);
    }

    updateProfile(user_id, data) {
        return this._callApi("updateProfile", user_id, data);
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
        const data = { recipeId, user_id, value };
        return this._callApi("rateRecipe", data);
    }

    toggleFavorite(recipeId, user_id) {
        const data = { recipeId, user_id };
        return this._callApi("toggleFavorite", data);
    }

    paginateFavorites(user_id, currentPage = 1, limit = 10) {
        return this._callApi("paginateRecipeFavorites", user_id, currentPage, limit);
    }
    
    paginateRecipesByUser(currentPage = 1, limit = 10, userId) {
        return this._callApi("paginateRecipesByUser", currentPage, limit, userId);
    }

    paginateRecipesPublic(currentPage = 1, limit = 10, viewer_id = null, rest) {
        return this._callApi("paginateRecipesPublic", currentPage, limit,viewer_id, rest);
    }

    paginateRecipesPublicByUser(currentPage = 1, limit = 10, userId, isPublic) {
        return this._callApi("paginateRecipesPublicByUser", currentPage, limit, userId, isPublic);
    }

    paginateRecipesByCategory(currentPage = 1, limit = 10, categoryId) {
        return this._callApi("paginateRecipesByCategory", currentPage, limit, categoryId);
    }

    paginateRecipesByGroup(currentPage = 1, limit = 10, groupId, isOwner) {
        return this._callApi("paginateRecipesByGroup", currentPage, limit, groupId, isOwner);
    }

    paginateRecipesByGroupUser(currentPage = 1, limit = 10, groupId, userId) {
        return this._callApi("paginateRecipesByGroupUser", currentPage, limit, groupId, userId); 
    }

    // Block from Categories

    getCategories(){
        return this._callApi('getCategories')
    }

    // Bloack from Groups

    deleteGroup(groupId) {
        return this._callApi('deleteGroup', groupId);
    }

    softDeleteGroup(groupId) {
        return this._callApi('softDeleteGroup', groupId);
    }

    updateGroup(groupId, data) {
        return this._callApi('updateGroup', groupId, data);
    }

    createGroup(data) {
        return this._callApi('createGroup', data);
    }

    paginateGroups(currentPage = 1, limit = 10){
        return this._callApi('getPaginatedGroups',currentPage,limit)
    }

    getPaginateGroupsByUser(currentPage = 1, limit = 10, userId) {
        return this._callApi('getPaginateGroupsByUser', currentPage, limit, userId);
    }

    getPaginatePublicGroupsByUser(currentPage = 1, limit = 10, userId, isPublic) {
        return this._callApi('getPaginatePublicGroupsByUser', currentPage, limit, userId, isPublic);
    }

    addMembersToGroups(groupId, user_id) {
        return this._callApi('addMembersToGroups', groupId, user_id);
    }

    updateGroup(groupId, data) {
        return this._callApi('updateGroup', groupId, data);
    }

    addRecipeToGroup(groupId, recipeId) {
        return this._callApi('addRecipeToGroup', groupId, recipeId);
    }
    removeRecipeFromGroup(groupId, recipeId) {
        return this._callApi('removeRecipeFromGroup', groupId, recipeId);
    }

}