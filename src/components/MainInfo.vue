<template>
            <v-card class="mx-auto" max-width="344" height="430px">
          <v-img
            :src="item.codigo"
            height="200px"
          ></v-img>

          <v-card-title> {{ item.nombre }} </v-card-title>


 

           
              <v-divider></v-divider>

              <v-card-text>
               {{ item.descripcion }}
              </v-card-text>
            
        </v-card>
</template>

<script>
export default {
    name : 'MainInfo',
    props : ['item'],
    data(){
        return{

        }
    },

    methods: {

    }
}
</script>

<style scoped>

</style>