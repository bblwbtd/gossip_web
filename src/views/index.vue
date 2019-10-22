<template>
  <div>
    <v-app-bar
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-toolbar-title>Algorithm Demonstration</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="purple" @click="show_report">Report</v-btn>
      <report ref="report"></report>
    </v-app-bar>

    <v-content style="height: 100%">
      <v-container fluid>
        <playground></playground>
      </v-container>
    </v-content>

    <v-footer
      :inset="footer.inset"
      app
    >
      <span class="px-4">&copy; {{ new Date().getFullYear() }} Chen JieNan all rights reserved</span>
    </v-footer>
  </div>
</template>

<script>
import Playground from '@/views/playground'
import Report from '@/views/report'
export default {
  components: { Report, Playground },
  data: () => ({
    primaryDrawer: {
      model: null,
      clipped: true,
    },
    footer: {
      inset: false
    },
    options:[
      {
        title: "Gossip",
        icon: "mdi-phone-in-talk"
      }
    ]
  }),
  methods:{
    show_report(){
      this.$refs.report.show()
    }
  }
}
</script>
