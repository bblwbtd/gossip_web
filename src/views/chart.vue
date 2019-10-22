<template>
    <v-dialog width="60vw" v-model="display">
      <v-card>
        <v-card-title>
          <div>
            Chart
          </div>
          <v-spacer>
          </v-spacer>
          <v-icon @click="hide">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <apexchart type="line" width="100%" height="400px" :options="chartOptions" :series="series"></apexchart>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
  import VueApexCharts from 'vue-apexcharts'
  export default {
    name: 'chart',
    components: {
      apexchart: VueApexCharts
    },
    data(){
      return{
        display: false,
        data: null,
        chartOptions: {
          // xaxis: {
          //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998,1999]
          // },
          // theme:{
          //   mode: 'dark'
          // }
        },
        series: []
      }
    },
    updated(){

    },
    methods:{
      show(data){
        this.display = true
      },
      hide(){
        this.display = false
      },
      create_chart(options, series){
        this.chartOptions = options
        this.series = series
      }
    }
  }
</script>

<style scoped>

</style>
