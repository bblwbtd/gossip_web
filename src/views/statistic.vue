<template>
    <v-dialog width="80vw" v-model="display">
      <v-card>
        <v-card-title>
          Summary
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="4">
              <v-col cols="12">
                Correct mean: {{correct_mean}}
              </v-col>
              <v-col cols="12">
                Current mean: {{current_mean}}
              </v-col>
              <v-col cols="12">
                Loss: {{(current_mean - correct_mean).toFixed(2)}}
              </v-col>
              <v-col cols="12">
                Mse: {{mse}}
              </v-col>
            </v-col>
            <v-col cols="4">
              <v-col cols="12">
                Max value: {{max_value}}
              </v-col>
              <v-col cols="12">
                Min value: {{min_value}}
              </v-col>
              <v-col cols="12">
                Max Round: {{max_round}}
              </v-col>
              <v-col cols="12">
                Min Round: {{min_round}}
              </v-col>
            </v-col>
            <v-col cols="4">
              <v-col cols="12">
                Node amount: {{node_number}}
              </v-col>
              <v-col cols="12">
                Decay: {{decay}}
              </v-col>
              <v-col cols="12">
                Average round: {{mean_round}}
              </v-col>
              <v-col cols="12">

              </v-col>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer>
          </v-spacer>
          <v-btn class="red white--text" @click="display = false">cancel</v-btn>
          <v-btn class="green white--text" @click="save">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import { axios } from '@/api/axios'
  import {
    getDecay,
    getMaxRound,
    getMaxValue,
    getMean,
    getMeanRound,
    getMinRound,
    getMinValue,
    getMse,
    save
  } from '@/api/statistic'

  export default {
    name: 'statistic',
    props: [
      'correct_mean',
      'node_number',
    ],
    mounted(){

    },
    data(){
      return{
        display: false,
        max_value: null,
        min_value: null,
        max_round: null,
        min_round: null,
        mse: null,
        current_mean: null,
        decay: null,
        mean_round: null
      }
    },
    methods: {
      update_statistic(){
        axios.all(
          [
            getMaxRound(),
            getMinRound(),
            getMaxValue(),
            getMinValue(),
            getMean(),
            getMse(this.correct_mean),
            getDecay(),
            getMeanRound()
          ])
          .then(axios.spread((maxRound, minRound, maxValue, minValue, mean, mse, decay, meanRound) => {
            this.max_round = maxRound.data
            this.max_value = maxValue.data
            this.min_round = minRound.data
            this.min_value = minValue.data
            this.mse = mse.data
            this.current_mean = mean.data
            this.decay = decay.data
            this.mean_round = meanRound.data
          }))
      },
      save(){
        save(this.correct_mean)
          .then(response => {
            this.display = false
          })
      }
    }
  }
</script>

<style scoped>

</style>
