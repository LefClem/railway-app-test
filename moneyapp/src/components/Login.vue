<template>
  <div class="container">
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input type="email" v-model="email" />
      <label for="password">Mot de passe</label>
      <input type="password" v-model="password" id="password" />
      <input type="submit" value="Connexion" />
    </form>
  </div>
</template>

<script>
import auth from "../services/auth.methods";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        let result = await auth.login(this.email, this.password);
        console.log(result);

        if (result.status == 200) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
          this.$router.push({ name: "MainPage" });
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
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
