<template>
    <v-container>
        <the-login />
    </v-container>
</template>

<script>
import TheLogin from "../components/TheLogin.vue"

export default 
  {
      name : 'Login',
      components: { TheLogin },
      beforeCreate(){
          if(localStorage.getItem('token')){
              this.$router.push({

                  name : 'Admin'
              }
              )
          }
      }
}
</script>