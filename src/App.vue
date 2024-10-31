<template>
  <div id="app">
    <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="false">
      <b-field>
        <b-tag size="is-large" rounded>¡Gracias por tu paciencia! Esto puede tardar unos segundos</b-tag>
      </b-field>
    </b-loading>
    <b-modal v-model="showTheError" :can-cancel="false">
      <div class="card">
        <section class="modal-card-body">
          <div class="columns">
            <div class="column is-three-fifths is-offset-one-fifth">
              <h3 class="subtitle is-5">
                Ha ocurrido un error al cargar la configuración, por favor recarga el sitio. <br />
                Si el error persiste contacte al administrador.
              </h3>
            </div>
          </div>
          <div class="columns">
            <div class="column is-three-fifths is-offset-one-fifth">
              <b-button type="is-secondary" expanded label="Recargar Sitio" icon-pack="fas" icon-right="redo" @click="reloadSite"></b-button>
            </div>
          </div>
        </section>
      </div>
    </b-modal>
    <b-navbar type="is-custom" :mobile-burger="false" :shadow="true" :centered="true" :fixed-top="true">
      <template slot="brand">
        <b-navbar-item @click="goHome" v-if="allConfigs.length > 1 && this.$route.name !== 'Inicio'">
          <b-button icon-right="home" icon-pack="fas"></b-button>
        </b-navbar-item>
        <b-navbar-item>
          <img v-if="configSite.logo" :src="configSite.logo" alt="logo" />
        </b-navbar-item>
      </template>
    </b-navbar>
    <div class="container" v-show="isLoading === false">
      <div class="card">
        <div class="card-content">
          <router-view>
            <!-- <HomeComponentVue/> -->
          </router-view>
        </div>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          Copyright © {{ actuallyYear }} <strong><a href="https://www.tekiio.com/es/inicio" class="has-text-info" target="_blank">Tekiio</a></strong
          >.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import router from '@/router'
// import axios from 'axios'
// import HomeComponentVue from './components/HomeComponent.vue';

export default {
  computed: {
    ...mapState(['messageTicket', 'isLoading', 'configSite', 'allConfigs', 'startTimeLoading','serviceConfigUrl'])
  },
  // components:{
  //   HomeComponentVue
  // },
  created() {
    // this.setConfigSite(this.allConfigs[0])
  },
  mounted() {
    // this.setLoading(false);
    this.setLoading(true)
    var start_aux = new Date()
    this.setStartTimeLoading(start_aux)
    this.getConfigData()
  },
  methods: {
    getConfigData() {
      try {
        let self = this
        console.debug('.', self)
        let str = `
        var urlMode=null;
      
        require(['N/https','N/runtime'],function(httpsMode,runtime){
          setTimeout( () => {
          var runtimeAccountID = runtime.accountId;
          if(runtimeAccountID.includes('5907646')){
          // make the store variable of serviceConfigUrl to be Vinoteca
            self.setKioskoUrls('https://5907646.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1418&deploy=1&compid=5907646&ns-at=AAEJ7tMQyivISljlyTWVzwLRrEONkEkEiWRwqqn3NvS77dVK4DI','https://5907646.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1416&deploy=1&compid=5907646&ns-at=AAEJ7tMQNFa3GAZEHJxpoWe379BBrNPQ-GsSk4z29k9ebRSdnIg','https://5907646.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=3034&deploy=1&compid=5907646&ns-at=AAEJ7tMQE_2b-mftZxA9WY2p0tXeXGvDz1JElHtBLCPnQuGAtIg');
          }else if(runtimeAccountID.includes('5610219')){
          // make the store variable of serviceConfigUrl to be Buena Prensa
            self.setKioskoUrls('https://5610219.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1656&deploy=1&compid=5610219&ns-at=AAEJ7tMQ7UtskdehEcmrgrFLuhdRUw7hzOBxOmE_kRCJ-Ppg26Q','https://5610219.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1652&deploy=1&compid=5610219&ns-at=AAEJ7tMQkO91HaIXsplA7HyXDRy_ezQEoEbUN7OpyhmfeOD_Ak8','https://5610219.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2349&deploy=1&compid=5610219&ns-at=AAEJ7tMQuqbvTwGFYnQsBVBmK1EB26RN2v2hTvtITvl5ZTas4Fk');
          
          }else if(runtimeAccountID.includes('4804048_SB1')){
          // make the store variable of serviceConfigUrl to be Ganon SB1
            self.setKioskoUrls('https://4804048-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2967&deploy=1&compid=4804048_SB1&ns-at=AAEJ7tMQB3fBiJZquMbpnZKhsqB_Bz9bPL1cq4XA2K4fGj6qguQ','https://4804048-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2963&deploy=1&compid=4804048_SB1&ns-at=AAEJ7tMQQFx7iJbPsuGwEXFwbxvANae9tE5_OFeik4rdHP60Tck','https://4804048-sb1.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=2976&deploy=1&compid=4804048_SB1&ns-at=AAEJ7tMQsQdTzmiTXHoFD0cRmPGZQJJAKQbTWVXyDjrLiR-wuLo');
          }
          console.log("runtime AccountID: ", runtime.accountId);
          
         httpsMode.post.promise({
            url: self.serviceConfigUrl,
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({custparam_mode: 'configurationData'})
          }).then(function(response) {
            console.log('Response 🐣🐣:', response.body);
            self.assignConfigResult(response.body);
          }).catch(function(error) {
            console.error('Error on request', error);
          });

        }, 200);
        });
        `;
        eval(str)
        // self.setStatusRequestTicket(true);
      } catch (e) {
        this.setStatusRequestTicket(false)
        this.setMessageTicket('Ha ocurrido un error en realizar la petición para traer la configuración inicial de la empresa')
        console.error(e)
      }
    },
    setKioskoUrls(urlServiceConfig,urlKioskoConnection,urlDownloadService) {
      this.$store.commit('setServiceConfigUrl',urlServiceConfig);
      this.$store.commit('setKioskoConnectionUrl',urlKioskoConnection);
      this.$store.commit('setDownloadFilesUrl',urlDownloadService);
    },
    errorOccurred(err) {
      try {
        console.log('errorOccurred: ', err)
        this.setStatusRequestTicket(false)
        this.setMessageTicket('Ha ocurrido un error en realizar la petición para traer la configuración inicial de la empresa')
      } catch (error) {
        console.log('Entro en catch de funcion errorOccurred', error)
      }
    },
    // getConfigAxios(urlRequest) {
    //   const options = {
    //     method: 'GET',
    //     url: urlRequest,
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   }
    //   axios
    //     .request(options)
    //     .then(res => {
    //       console.log('axios.request ~ response', res.data)
    //       this.assignConfigResult(res)
    //     })
    //     .catch(err => {
    //       console.error('Error on request', err)
    //       this.setStatusRequestTicket(false)
    //       this.setMessageTicket('Ha ocurrido un error en realizar la petición para traer la configuración inicial de la empresa')
    //     })
    // },
    assignConfigResult(response) {
      console.log('📍 ~ assignConfigResult ~ response', response)
      let data = null
      if (typeof response == 'string') {
        let indexstart = response.indexOf('<!--') * 1
        let indexfinish = response.lastIndexOf('-->') * 1
        if (indexstart && indexfinish) {
          indexfinish += 3
          let characters = response.slice(indexstart, indexfinish)
          data = response.replace(characters, '')
        } else {
          data = response
        }
        if (data != null) {
          data = JSON.parse(data)
        }
      } else {
        data = response
      }
      if (data.success === true) {
        this.setLoading(false)
        this.setAllConfigs(data.result)
        if (this.allConfigs.length === 1) {
          this.setConfigSite(data.result[0])
          let company = this.allConfigs[0].id
          this.setConfigParamSearch(company)
          this.setStatusRequestTicket(true)
          this.setMessageTicket('Obtuvo la información de la empresa con éxito')
          router.push({ name: 'Pasos', params: { id: 1 } })
          // router.push({ name: "Pasos", params: { id: company } });
        }
      } else {
        this.showError()
        this.setStatusRequestTicket(false)
        this.setMessageTicket(data.details)
      }
    },
    showError() {
      if (this.isLoading === true) {
        this.setLoading(false)
      }
      this.showTheError = true
      // const endTime = new Date()
      // const loadingTime = endTime - this.startTimeLoading
      // this.sendTime(loadingTime, endTime)
    },
    sendTime(time, date) {
      try {
        let objSendTime = {
          custrecord_loading_url: window.location.href,
          custrecord_loading_date: date,
          custrecord_loading_time: time,
          custrecord_loading_step: 'Precarga de información de compañía',
          custrecord_loading_status: this.statusRequestTicket,
          custrecord_loading_message: this.messageTicket
        }
        let strObjSendTime = JSON.stringify(objSendTime)
        let self = this
        console.log('sendTime -self:', self)
        let str = `
        var httpsMode=null;
        require(['N/https'],function(httpsMode){
          var url=httpsMode.requestSuitelet({
                        scriptId:'customscript_efx_fe_kioskopageload_sl',
                        deploymentId:"customdeploy_efx_fe_kioskopageload_sl",
                        external:true,
                        urlParams:{sendTime:'${strObjSendTime}'}
                    });
                    console.log("RESP time: ", url.body);
                });
            `
        eval(str)
      } catch (err) {
        console.log('An error occurred on SendTime() in Ticket')
      }
    },
    // getSendTimeResponse(e) {
    //   const t = {
    //     method: 'GET',
    //     url: e,
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Methods': 'GET,PUT,POST,OPTIONS',
    //       'Access-Control-Allow-Headers': 'authorization'
    //     }
    //   }
    //   axios
    //     .request(t)
    //     .then(b => {
    //       console.log('RESP time: ', b.data)
    //     })
    //     .catch(err => {
    //       console.log('Hubo errores en getSendTimeResponse app: ', err)
    //     })
    // },
    goHome() {
      let cssCustom = document.getElementById('maincss')
      if (cssCustom) {
        cssCustom.href = ''
      }
      this.setClientData({})
      this.setEmails([])
      this.setStep(0)
      this.clearFieldsValue()
      this.clearTicketSearch()
      this.clearParamsStamp()
      if (this.allConfigs.length > 1) {
        this.setConfigSite({})
      }
      // router.push({ name: 'Pasos', params: { id: 1 } })

      router.push({ path: '/' })
    },
    reloadSite() {
      window.location.reload()
    },
    ...mapMutations([
      'setMessageTicket',
      'setStatusRequestTicket',
      'setStartTimeLoading',
      'setLoading',
      'setConfigSite',
      'setAllConfigs',
      'setConfigParamSearch',
      'setClientData',
      'setEmails',
      'setStep'
    ]),
    ...mapActions(['clearTicketSearch', 'clearParamsStamp', 'clearFieldsValue'])
  },
  data() {
    return {
      showTheError: false,
      actuallyYear: new Date().getFullYear()
    }
  }
}
</script>

<style>
html,
body {
  font-size: 1rem !important;
}

small {
  font-size: 0.875em !important;
}

.text {
  font-size: 12pt !important;
}

#outerwrapper {
  margin-top: 33px !important;
}

#div__body {
  height: 90vh;
}

div.bgbar div.tasktitlemed {
  display: none;
}
div.uir-page-title {
  display: none;
}

#app {
  /*font-family: 'Karla', sans-serif;*/
  font-family: 'Abel', sans-serif;
  font-size: 1rem !important;
  min-height: 90vh;
}

.input,
.select {
  font-size: 1rem !important;
}

.title {
  /*font-family: 'Rubik', sans-serif;*/
  font-family: 'Roboto', sans-serif;
}

ol {
  margin: 0 !important;
  padding: 0 !important;
}

/*Inputs*/
.control {
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  clear: both !important;
  font-size: 1rem !important;
  position: relative !important;
  text-align: inherit !important;
}

.field.is-floating-label,
.field.is-floating-in-label {
  position: relative !important;
}

.field:not(:last-child) {
  margin-bottom: 0.75rem !important;
}

.control.has-icons-left .input,
.control.has-icons-left .select select {
  padding-left: 2.5em !important;
}

.taginput .taginput-container.is-focusable,
.textarea,
.input {
  -webkit-box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05) !important;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05) !important;
  max-width: 100% !important;
  width: 100% !important;
}

.control input,
select {
  height: 2.5rem !important;
}

/*.pagination-previous, .pagination-next, .pagination-link, .pagination-ellipsis, .file-cta, .file-name, .select select, .taginput .taginput-container.is-focusable, .textarea, .input {
  -moz-appearance: none !important;
  -webkit-appearance: none !important;
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
  border-radius: 4px !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  display: -ms-inline-flexbox !important;
  display: inline-flex !important;
  font-size: 1rem !important;
  height: 2.5em !important;
  -webkit-box-pack: start !important;
  -ms-flex-pack: start !important;
  justify-content: flex-start !important;
  line-height: 1.5 !important;
  padding-bottom: calc(0.5em - 1px) !important;
  padding-left: calc(0.75em - 1px) !important;
  padding-right: calc(0.75em - 1px) !important;
  padding-top: calc(0.5em - 1px) !important;
  position: relative !important;
  vertical-align: top !important;
}*/

select,
select[multiple] {
  height: auto !important;
}

/*Navbar*/
.navbar.is-fixed-top {
  top: 0 !important;
}

.navbar.is-fixed-bottom,
.navbar.is-fixed-top {
  left: 0 !important;
  position: fixed !important;
  right: 0 !important;
  z-index: 30 !important;
}

.navbar.has-shadow {
  -webkit-box-shadow: 0 2px 0 0 whitesmoke !important;
  box-shadow: 0 2px 0 0 whitesmoke !important;
}

@media screen and (min-width: 1024px) {
  .navbar {
    min-height: 3.25rem !important;
  }
}

@media screen and (min-width: 1024px) {
  .navbar,
  .navbar-menu,
  .navbar-start,
  .navbar-end {
    -webkit-box-align: stretch !important;
    -ms-flex-align: stretch !important;
    align-items: stretch !important;
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
  }

  .navbar {
    background-color: white !important;
    min-height: 3.25rem !important;
    position: relative !important;
    z-index: 30 !important;
  }
}

/* Steps*/
.b-steps .steps .step-items {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
  -ms-flex-wrap: wrap !important;
  flex-wrap: wrap !important;
}

ul {
  list-style: none !important;
}

ul.step-items {
  margin: 0 !important;
}

.b-steps .steps .step-items .step-item {
  margin-top: 0 !important;
  position: relative !important;
  -webkit-box-flex: 1 !important;
  -ms-flex-positive: 1 !important;
  flex-grow: 1 !important;
  -ms-flex-preferred-size: 1em !important;
  flex-basis: 1em !important;
}

/*Card*/
.card {
  background-color: white !important;
  border-radius: 0.25rem !important;
  -webkit-box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02) !important;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0px 0 1px rgba(10, 10, 10, 0.02) !important;
  color: #4a4a4a !important;
  max-width: 100% !important;
  overflow: hidden !important;
  position: relative !important;
}

.card-content {
  background-color: transparent !important;
  padding: 1.5rem !important;
}

/*Footer*/
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.2rem !important;
  z-index: 39;
  font-size: 11pt;
}
</style>
