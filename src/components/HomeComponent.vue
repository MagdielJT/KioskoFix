<template>
  <div class="homeComponent">
    <div class="container" v-if="allConfigs.length > 1">
      <h3 class="has-text-centered title is-4">Bienvenido</h3>
      <hr>
      <p>Selecciona la empresa con la que deseas facturar</p>
      <hr>
      <div class="container">
        <div class="columns is-desktop is-multiline">
          <div class="column is-3" v-for="company of allConfigs" :key="company.id">
            <div class="box" @click="selectCompany(company.id)">
              <article class="media">
                <div class="media-content">
                  <figure class="image is-64x64">
                    <img :src="company.logo" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p>
                      <strong>{{ company.company }}</strong>
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-else>
      <section>
        <b-skeleton width="20%" animated></b-skeleton>
        <b-skeleton width="40%" animated></b-skeleton>
        <b-skeleton width="60%" animated></b-skeleton>
        <b-skeleton width="80%" animated></b-skeleton>
        <b-skeleton animated></b-skeleton>
      </section>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import router from "@/router";

export default {
  name: "HomeComponent",
  computed: {
    ...mapState(["allConfigs", "configSite"])
  },
  created() {

  },
  mounted() {
    console.log("HomeComponent is triggered")
    if (this.allConfigs.length === 1) {
      let company = this.allConfigs[0].id;
      this.setConfigParamSearch(company)
      router.push({name: 'Pasos', params: {id: company}})

    }
  },
  methods: {
    selectCompany: (id) => {
      router.push({ name: 'Pasos', params: { id } })
    },
    ...mapMutations(["setConfigParamSearch"])
  }
}
</script>

<style scoped>
.box:hover {
  cursor: pointer;
  background-color: #f4f4f4;
}
</style>