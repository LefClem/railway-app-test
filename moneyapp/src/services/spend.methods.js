import axios from 'axios'

class spendMethods {

    async getSpendings(token){
        let result = await axios.get('http://localhost:3000/api/spend/spending/all', { headers : {Authorization : "Bearer " + token }})
        return result;
    }

    async createSpending(data, token){
        let result = await axios.post('http://localhost:3000/api/spend/spending', data, { headers : {Authorization : "Bearer " + token }})
        return result;
    }

    async deleteSpending(id, token){
        let result = await axios.delete(`http://localhost:3000/api/spend/spending/${id}`, { headers : {Authorization : "Bearer " + token }})
        return result;
    }

}

export default new spendMethods()