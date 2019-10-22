<template>
  <v-row justify="center" align="start">
    <v-col>
      <v-row justify="center" align="start">
        <v-col cols="3">
          <v-card style="height: 313px">
            <v-card-title>
              <div class="headline white--text">
                Control Panel
              </div>
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <v-btn color="green" @click="addNode">add</v-btn>
                  <add_node ref="add_node" v-on:success="fetchNodes"></add_node>
                </v-col>
                <v-col cols="3">
                  <v-btn color="orange" @click="reset">reset</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn color="blue" @click="start" >begin</v-btn>
                </v-col>
                <v-col cols="3">
                  <v-btn color="red" @click="clear">clear</v-btn>
                </v-col>
                <v-col cols="12">
                  <div class="subtitle-1">current state: {{current_state}}</div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title>
              <div class="headline white--text">
                Output
              </div>
            </v-card-title>
            <v-card-text>
              <v-textarea readonly no-resize class=" white--text" rows="10" v-model="log" >

              </v-textarea>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" align="start">
        <v-col cols="9">
          <v-card>
            <v-card-title>
              Nodes
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col v-for="node in node_map" cols="2">
                  <node v-bind="node"></node>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <statistic ref="statistic"
               :correct_mean="correct_mean"
               :node_number="Object.values(node_map).length"
    >
    </statistic>
  </v-row>
</template>

<script>
  import Node from '@/components/node'
  import { addNode, clear, getAllNode, reset, start } from '@/api/node'
  import Add_node from '@/components/add_node'
  import Statistic from '@/views/statistic'
  import { getMean } from '@/api/statistic'

  export default {
    name: 'playground',
    components: { Statistic, Add_node, Node },
    computed: {
      current_state(){
        if (this.dead === -1){
          return "IDLE"
        }else if(this.dead === this.total){
          this.$refs.statistic.display = true
          this.$refs.statistic.update_statistic()
          return "FINISHED"
        }else {
          return "ACTIVE"
        }
      }
    },
    data () {
      return {
        node_map: {},
        webSocket: null,
        total: 0,
        dead: -1,
        log: '',
        state: 'IDLE',
        correct_mean: null,
      }
    },
    created () {
      this.connect_websocket()
    },
    mounted () {
      this.fetchNodes()
    },
    methods: {
      get_mean(){
        getMean()
          .then(response => {
            this.correct_mean = response.data
          })
      },
      fetchNodes () {
        getAllNode()
          .then(response => {
            this.total = response.data.length
            let new_map = {}
            response.data.forEach(value => {
              new_map[value.id] = value
            })
            this.node_map = new_map
            this.total = response.data.length
          })
      },
      start () {
        this.get_mean()
        this.dead = 0
        start()
      },
      addNode () {
        this.$refs.add_node.display = true
      },
      reset () {
        this.log = ""
        this.dead = -1
        reset()
          .then(response => {
            this.fetchNodes()
          })
      },
      clear () {
        this.log = ""
        this.dead = -1
        clear()
          .then(response => {
            this.fetchNodes()
          })
      },
      connect_websocket () {
        this.webSocket = new WebSocket('ws://localhost:2333/event/connect')
        this.webSocket.onmessage = this.on_message
        this.webSocket.onerror = this.on_error
      },
      on_message (e) {
        let data = JSON.parse(e.data)
        switch(data.type){
          case 0:
            this.changeState(data.from, data.data)
            break
          case 1:
            this.updateValue(data.from, data.data)
        }
      },
      on_error (e) {
        console.log(e)
      },
      changeState (id, state) {
        this.node_map[id].state = state
        let text = "active❤️"
        if (state === 2) {
          text = "expired💀"
          this.dead++
        }
        this.Log(`node ${this.node_map[id].id.substring(0,8)} change its state to ${text}`)
        if (this.dead === this.total){
          this.state = "FINISHED"
        }
      },
      updateValue(id, value){
        this.node_map[id].data = value
        this.Log(`node ${this.node_map[id].id.substring(0,8)} change its value to ${value}`)
      },
      Log (message) {
        this.log = this.log + message + '\n'
      }
    }
  }
</script>

<style scoped>

</style>
