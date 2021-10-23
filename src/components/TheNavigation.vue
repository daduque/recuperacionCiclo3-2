<template>
    <div id="nav">
      <router-link :to="{
        name : 'Home'
      }">Home</router-link> |
      
      <router-link :to="{
        name : 'About'
      }">About</router-link> |
      
      <router-link :to="{
        name : 'Login'
      }"
      v-if="!isLogin">Login</router-link>
      <router-link :to="{
        name : 'Admin'
      }"
      v-else>Admin</router-link>
    </div>
</template>

<script>
export default {
    name: 'TheNavigation',
    computed:{
      isLogin(){
        return localStorage.getItem('token');
      }
    }
}
</script>

<style scoped>
#nav {
  display: flex;
  align-items: center;
  padding: 30px;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>