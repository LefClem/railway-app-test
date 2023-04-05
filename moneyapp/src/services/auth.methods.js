import axios from "axios";

class authMethods {

    async signup(first_name, last_name, email, password){
        const result = await axios.post("http://localhost:3000/api/auth/signup", { first_name, last_name, email, password });
        return result;
    }


    async login(email, password) {
        const result = await axios.post("http://localhost:3000/api/auth/login", { email, password});
        return result;
    }
}

export default new authMethods()