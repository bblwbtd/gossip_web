<template>
    <v-dialog v-model="display" width="500">
      <v-card>
        <v-card-title>
          add node
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
              <v-text-field label="amount" type="number" v-model="amount"></v-text-field>
              <v-text-field label="max" type="number" v-model="max"></v-text-field>
              <v-text-field label="min" type="number" v-model="min"></v-text-field>
              <v-text-field label="max round" type="number" v-model="max_round"></v-text-field>
              <v-slider label="delay" v-model="delay" max="10000" min="0" thumb-label></v-slider>
              <v-slider label="decay" v-model="decay" max="100" min="0" thumb-label></v-slider>
            </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="red white--text" @click="display = false">cancel</v-btn>
          <v-btn class="green white--text" @click="addNode">add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import { addNode } from '@/api/node'

  export default {
    name: 'add_node',
    data(){
      return{
        display: false,
        amount: 10,
        max: 100,
        min: 0,
        delay: 1000,
        decay: 90,
        max_round: 30,
      }
    },
    methods:{
      addNode () {
        addNode({
          max: this.max,
          min: this.min,
          delay: this.delay,
          decay: this.decay/100,
          max_round: parseInt(this.max_round)
        }, this.amount)
        .then(response => {
          this.$emit("success")
          this.display = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
