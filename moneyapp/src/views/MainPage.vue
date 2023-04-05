<template>
  <Header />
  <h2>Dashboard</h2>
  <div class="container">
    <div class="bills">
      <h3>Factures</h3>
      <div v-for="data in spendings" :key="data">
        <Card v-if="data.Type === 'Facture'" :fees="data" @delete="test"/>
      </div>
      <span>Montant total: {{ totalBills }}</span>
    </div>
    <div class="creditcard">
      <h3>Paiement</h3>
      <div v-for="data in spendings" :key="data">
        <Card v-if="data.Type === 'Carte'" :fees="data" @delete="test"/>
      </div>
      <span>Montant total: {{ totalCreditCard }}</span>
    </div>
    <div class="savings">
      <h3>Economies</h3>
      <div v-for="data in spendings" :key="data">
        <Card v-if="data.Type === 'Économie'" :fees="data" @delete="test"/>
      </div>
      <span>Montant total: {{ totalSavings }}</span>
    </div>
  </div>
  <CreateSpending :user="user" :spend="getSpending()" />
  <Footer />
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import Card from "../components/Card.vue";
import spend from "../services/spend.methods";
import CreateSpending from "../components/CreateSpending.vue";

export default {
  components: {
    Header,
    Footer,
    Card,
    CreateSpending,
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      spendings: "",
      totalBills: 0,
      totalCreditCard: 0,
      totalSavings: 0
    };
  },
  methods: {
    async getSpending() {
      let list = await spend.getSpendings(this.user.token);
      this.spendings = list.data;
    },
    async getTotal() {
        
      this.spendings.map((data) => {
        if (data.Type === "Facture") {
          this.totalBills += Number(data.Cost);
          this.getSpending();
        } else if (data.Type === "Carte") {
          this.totalCreditCard += Number(data.Cost);
          this.getSpending();
        } else if (data.Type === "Économie") {
          this.totalSavings += Number(data.Cost);
          this.getSpending();
        }
      });
    },
    async deleteSpending({id}){
        let del = await spend.deleteSpending(id, this.user.token);
        if(del.status == 200){
            await this.getSpending();
        }
    },
    test(){
        console.log("Réussi !");
    }
  },

  async mounted() {
    if (!this.user) {
      this.$router.push("/");
    } else {
      await this.getSpending();
      await this.getTotal();
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 100px;
  height: auto;
}

.card {
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1px solid black;
  max-width: 400px;
}

.bills,
.creditcard,
.savings {
  width: 300px;
}

h2,
h3,
span {
  text-align: center;
}

span {
  display: flex;
  justify-content: center;
}
</style>
