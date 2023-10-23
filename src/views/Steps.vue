<template>
  <div class="steps">
    <b-steps icon-pack="fas" mobile-mode="compact" :has-navigation="false" v-model="step" type="is-primary" :destroy-on-hide="true" size="is-medium">
      <hr>
      <b-step-item label="Ticket" icon-pack="uil" icon="uil-file-search-alt" :clickable="false">
        <Ticket></Ticket>
      </b-step-item>
      <b-step-item label="Cliente" :visible="action" icon-pack="uil" icon="uil-user" :clickable="false">
        <Client></Client>
      </b-step-item>
      <b-step-item label="Resumen" :visible="action" icon-pack="uil" icon="uil-file-check-alt" :clickable="false">
        <Resume></Resume>
      </b-step-item>
      <b-step-item label="Factura" icon-pack="uil" icon="uil-file-download-alt" :clickable="false">
        <Stamp></Stamp>
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
import Ticket from "@/components/steps/Ticket";
import Client from "@/components/steps/Client";
import router from "@/router";
import {mapState, mapMutations} from 'vuex';
import Resume from "@/components/steps/Resume";
import Stamp from "@/components/steps/Stamp";

export default {
  name: "Steps",
  components: {Stamp, Resume, Client, Ticket},
  computed: {
    ...mapState(["action", "allConfigs", "step", "configSite", "ticketSearch"])
  },
  created() {
    if (this.allConfigs.length > 0) {
      let companyID = router.currentRoute.params.id;
      for (let i = 0; i < this.allConfigs.length; i++) {
        if (this.allConfigs[i].id === companyID) {
          this.setConfigSite(this.allConfigs[i]);
          this.setConfigParamSearch(companyID);
        }
      }
      if (Object.keys(this.configSite).length) {
        if (Object.keys(this.ticketSearch).length === 2) {
          for (const i in this.configSite.fields) {
            this.addFilterSearch({name:'custparam_' + this.configSite.fields[i].fieldID, type: this.configSite.fields[i].type})
          }
        }
        if (this.configSite.css && this.configSite.css != "") {
          let head  = document.getElementsByTagName('body')[0];
          let link  = document.createElement('link');
          link.rel  = 'stylesheet';
          link.type = 'text/css';
          link.id = 'maincss';
          link.href = this.configSite.css;
          link.media = 'all';
          head.appendChild(link);
        }
      }
    } else {
      router.push({path: '/'})
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(["setAction", "setConfigSite", "addFilterSearch", "setConfigParamSearch"])
  }
}
</script>

<style scoped>
.steps {
  min-height: 75vh;
}
</style>
