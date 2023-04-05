<template>
  <div class="container-create">
    <h3>Ajouter une dépense :</h3>
    <form @submit.prevent="createSpending">
      <label for="Type">Type:</label>
      <select name="Type" v-model="type">
        <option value="Facture">Facture</option>
        <option value="Carte">Carte</option>
        <option value="Économie">Économie</option>
      </select>
      <input type="text" placeholder="Nom" v-model="name"/>
      <input type="text" placeholder="Coût" v-model="cost"/>
      <input type="submit" value="Ajouter"/>
    </form>
  </div>
</template>

<script>
import spendMethods from '../services/spend.methods';

export default {
    data(){
        return {
            type: "",
            name: "",
            cost: "",
            User: this.user
        }
    },
    props: ['user', 'spend'],
    methods: {
        async createSpending(){
            let data = {
                Name : this.name,
                Type : this.type,
                Cost : this.cost,
            }

            let result = await spendMethods.createSpending(data, this.User.token);
            console.log(result);
            if(result.status === 200){
                this.name = ""; 
                this.cost = ""; 
                this.type = "";
                await this.spend;
            }
        }
    }
};
</script>

<style>
    .container-create, form {
        display: flex;
        flex-direction: column;
        align-self: center;
    }

    h3 {
        text-align: center;
    }

    form {
        max-width: 300px;
    }
</style>
