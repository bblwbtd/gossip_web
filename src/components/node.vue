<template>
  <v-btn block :color="color">
    {{data}}
  </v-btn>
</template>

<script>
  export default {
    name: 'node',
    props: ['id', 'data', 'state'],
    computed:{
      color(){
        switch (this.state) {
          case 0:
            return 'green'
          case 1:
            return 'orange'
          case 2:
            return 'red'
        }
      }
    }
  }
</script>

<style scoped>

</style>
