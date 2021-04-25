<template>
  <div class="body">
    <router-view />
  </div>
</template>

<script>

export default {
  name: "Body",
  data(){
    return{
      activeIndex: '1',
    };
  },
  methods:{
    goTo: function (index) {
      this.$router.push(index);
    },
  }
};
</script>

<style scoped>
  html, body{
    height: 100%;
  }

  .body{
    height: 100%;
    background-color: white;
  }
</style>
