<template>
    <div id="app">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
        <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
        <open-api v-if="spec" :api="spec"></open-api>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import OpenApi from 'vue-openapi'

  export default {
    computed: mapGetters([
      'spec'
    ]),
    components: {
      OpenApi
    }
  }
</script>

