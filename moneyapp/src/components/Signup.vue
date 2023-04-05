<template>
  <div class="container">
    <form @submit.prevent="signup">
      <label for="firstName">Prénom</label>
      <input type="text" v-model="first_name" />
      <label for="lastName">Nom</label>
      <input type="text" v-model="last_name" />
      <label for="email">Email</label>
      <input type="email" v-model="email" />
      <label for="password">Mot de passe</label>
      <input type="password" v-model="password" id="password" />
      <input type="submit" value="Connexion" />
    </form>
  </div>
</template>

<script>
import auth from '../services/auth.methods'

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async signup(){
        try {
            let result = await auth.signup(this.first_name, this.last_name, this.email, this.password);
            console.log(result);

            if(result.status == 201){
                let logged = await auth.login(this.email, this.password);
                localStorage.setItem("user", JSON.stringify(logged.data.user));
                this.$router.push({ name: "MainPage" });
            }
        } catch (error) {
            console.error(error);
        }
    }
  }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 300px;
}

input {
    max-width : 300px;
    margin: 10px;
}

input[type="submit"]{
    align-self: center;
    width: 150px;
}

label {
    max-width: 300px;
    text-align: center;
}
</style>
