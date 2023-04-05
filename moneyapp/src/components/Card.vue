<template>
  <div class="card" @mouseover="active = true" @mouseleave="active = false">
    <span>{{ this.infos.Name }}</span>
    <span>{{ this.infos.Cost }}</span>
    <button v-show="active" class="del" @click="$emit('delete', { id: this.infos.idSpending })">Del</button>
  </div>
</template>

<script>
export default {
    props: ['fees'],
    data(){
        return {
            infos : this.fees,
            active : false
        }
    }
};
</script>

<style scoped>
.card {
    position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  border: 1px solid black;
  max-width: 200px;
  margin: 15px;
}

span {
    text-align: center;
}

.del {
    position: absolute;
    right: 10px;
    top: 10px;
}
</style>
