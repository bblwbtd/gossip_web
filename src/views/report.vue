<template>
  <v-dialog v-model="display" width="80vw">
    <v-card>
      <v-card-title>
        <div>
          Report
        </div>
        <v-spacer></v-spacer>
        <v-icon @click="hide">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <div class="subtitle-1">
                Experiment Records
              </div>
            </v-col>
            <v-col cols="4">
              <div class="white--text">
                {{export_info}}
              </div>
            </v-col>
            <v-col cols="2">
              <v-btn class="pink" @click="export_data">
                export
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :headers="headers"
                :items="records"
                :items-per-page="5"
                item-key="name"
                v-model="selected"
                show-select
              >
              </v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <chart ref="chart"></chart>
            <v-col cols="12">
              <div class="subtitle-1">
                Chart Generation
              </div>
            </v-col>
            <v-col cols="3">
              <v-btn class="blue" block @click="round_loss_node_number">
                <div class="text-lowercase">
                  Round, loss with node number
                </div>
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn class="blue" block @click="round_loss_decay_value">
                <div class="text-lowercase">
                  Round, loss with Decay value
                </div>
              </v-btn>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { Export, getAllRecords } from '@/api/statistic'
  import Chart from '@/views/chart'

  export default {
    name: 'report',
    components: { Chart },
    data () {
      return {
        export_info: '',
        display: false,
        records: [],
        selected: [],
        headers: [
          {
            text: 'max value',
            value: 'max_value'
          },
          {
            text: 'min value',
            value: 'min_value'
          },
          {
            text: 'node amount',
            value: 'node_amount'
          },
          {
            text: 'decay',
            value: 'decay'
          },
          {
            text: 'mse',
            value: 'mse'
          },
          {
            text: 'mean lost',
            value: 'mean_lost'
          },
          {
            text: 'mean round',
            value: 'mean_round'
          }
        ],
      }
    },
    methods: {
      export_data(){
        Export({
          headers: this.headers.map(x => {return x.text}),
          data: this.selected.map(x => {
            return Object.values(x).slice(1,Object.values(x).length)
          })
        }).then(response => {
          this.export_info = "The file has been export to your application dir"
        })
      },
      getAllRecords () {
        getAllRecords()
          .then(response => {
            let data = response.data
            this.records = []
            data.forEach(value => {
              value.max_value = value.max_value.toFixed(2)
              value.min_value = value.min_value.toFixed(2)
              value.node_amount = value.node_amount.toFixed(0)
              value.decay = value.decay.toFixed(2)
              value.mse = value.mse.toFixed(2)
              value.mean_lost = value.mean_lost.toFixed(2)
              value.mean_round = value.mean_round.toFixed(2)
              this.records.push(value)
            })
          })
      },
      hide(){
        this.display = false
      },
      show(){
        this.getAllRecords()
        this.display = true
      },
      round_loss_decay_value(){
        let decay = {}
        let mse = {}
        this.selected.sort((a,b)=>{
          return a.node_number - b.node_number
        }).forEach(value => {
          if (Object.keys(decay).indexOf(value.decay) === -1){
            decay[value.decay] = [value.mean_round]
            mse[value.decay] = [value.mse]
          }else {
            decay[value.decay].push(value.mean_round)
            mse[value.decay].push(value.mse)
          }
        })
        let series = [
          {
            name: "Round Number",
            data: Object.values(decay).map(array => {
              let total = 0.0
              array.forEach(value => {
                total = total + parseFloat(value)
              })
              return (total / array.length).toFixed(2)
            })
          },
          {
            name: "Mean Square Error",
            data: Object.values(mse).map(array => {
              let total = 0.0
              array.forEach(value => {
                total = total + parseFloat(value)
              })
              return (total / array.length).toFixed(2)
            })
          }
        ]
        let options = {
          xaxis:{
            categories: Object.keys(decay)
          },
          theme:{
            mode: 'dark'
          }
        }
        this.$refs.chart.show()
        this.$refs.chart.chartOptions = options
        this.$refs.chart.series = series
      },
      round_loss_node_number(){
        let round = {}
        let mse = {}
        this.selected.sort((a,b)=>{
          return a.node_number - b.node_number
        }).forEach(value => {
          if (Object.keys(round).indexOf(value.node_amount) === -1){
            round[value.node_amount] = [value.mean_round]
            mse[value.node_amount] = [value.mse]
          }else {
            round[value.node_amount].push(value.mean_round)
            mse[value.node_amount].push(value.mse)
          }
        })
        let series = [
          {
            name: "Round Number",
            data: Object.values(round).map(array => {
              let total = 0.0
              array.forEach(value => {
                total = total + parseFloat(value)
              })
              return (total / array.length).toFixed(2)
            })
          },
          {
            name: "Mean Square Error",
            data: Object.values(mse).map(array => {
              let total = 0.0
              array.forEach(value => {
                total = total + parseFloat(value)
              })
              return (total / array.length).toFixed(2)
            })
          }
        ]
        let options = {
          xaxis:{
            categories: Object.keys(round)
          },
          theme:{
              mode: 'dark'
          }
        }
        this.$refs.chart.show()
        this.$refs.chart.chartOptions = options
        this.$refs.chart.series = series
      },
    }
  }
</script>

<style scoped>

</style>
