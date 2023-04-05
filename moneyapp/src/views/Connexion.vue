<template>
    <Header />
  <section>
    <h2>Bienvenue sur l'application qui va gérer vos dépenses !</h2>
    <h3 v-if="mode == 'login'">Se connecter</h3>
    <h3 v-if="mode == 'signup'">S'inscrire</h3>
    <login v-if="mode == 'login'"></login>
    <span v-if="mode == 'login'">Pas de compte ? <span @click="signup">S'inscrire !</span></span>
    <signup v-if="mode == 'signup'"></signup>
    <span v-if="mode == 'signup'">Déjà inscrit ? <span @click="login">Se connecter !</span></span>
  </section>
    <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Login from "../components/Login.vue"
import Signup from "../components/Signup.vue"
import Footer from "../components/Footer.vue";

export default {
  name: "Connexion",
  data(){
    return {
        mode: "login"
    }
  },
  components: {
    Header,
    Login,
    Signup,
    Footer
  },
  methods: {
    signup(){
        this.mode = "signup"
    },
    login(){
        this.mode = "login"
    }
  }
};
</script>

<style scoped>
h2, h3 {
  font-weight: 900;
  text-align: center;
}

section {
    display: flex;
    flex-direction: column;
}

span {
    align-self: center;
}

</style>
