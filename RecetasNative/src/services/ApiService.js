import { ApiWrapper } from "./ApiWrapper.js";
import { API_URL } from "@env"; 

export class ApiService {

    constructor() {
        this.api = new ApiWrapper(API_URL);
    }

    async signIn(data) {
        try {
            const response = await this.api.signIn(data);
            return response;
        } catch (error) {
            console.error("Error in signIn:", error);
            throw error;
        }
    }

    async signUp(data) {
        try {
            const response = await this.api.signUp(data);
            return response;
        } catch (error) {
            console.error("Error in register:", error);
            throw error;
        }
    }

}