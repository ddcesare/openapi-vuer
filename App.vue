<template>
    <div id="app">
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">
        <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">

        <md-layout md-column>
            <md-layout md-row md-flex="90" md-align="center">
                <md-layout md-column md-flex="65">
                    <h1 class="md-title">{{ spec.info.title }}</h1>
                    <div v-html="marked(spec.info.description)"></div>
                </md-layout>
                <md-layout md-flex="5"></md-layout>
                <md-layout md-column md-flex="20">
                    <md-layout md-flex="true"></md-layout>
                    <md-card>
                        <md-list>
                            <md-list-item>
                                <md-icon>home</md-icon> <span><a :href="spec.info.contact.url">{{spec.info.contact.name}}</a></span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>email</md-icon> <span><a :href="'mailto:'+spec.info.contact.email">{{spec.info.contact.email}}</a></span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>label</md-icon> <span>{{spec.info.version}}</span>
                            </md-list-item>
                            <md-list-item>
                                <md-icon>description</md-icon> <span><a :href="spec.info.termsOfService">Terms of Service</a></span>
                            </md-list-item>
                        </md-list>
                    </md-card>
                    <md-layout md-flex="true"></md-layout>
                </md-layout>
            </md-layout>

            <md-layout md-row >
                <md-list v-for="(entry, path) in spec.paths" style="width: 100%" >
                    <md-list-item v-for="(info, method) in entry">
                        <md-subheader class="md-title md-accent">{{method}} {{path}}</md-subheader>
                        <md-list-expand>
                            {{ log('info', info) }}

                            <md-table v-if="(info.parameters)">
                                <md-table-header>
                                    <md-table-row>
                                        <md-table-head>Name</md-table-head>
                                        <md-table-head>Description</md-table-head>
                                        <md-table-head>Type</md-table-head>
                                        <md-table-head>Values</md-table-head>
                                        <md-table-head>Location</md-table-head>
                                        <md-table-head>Required</md-table-head>
                                    </md-table-row>
                                </md-table-header>

                                <md-table-body>

                                    <md-table-row v-for="parameter in info.parameters">
                                        <md-table-cell>{{parameter.name}}</md-table-cell>
                                        <md-table-cell v-html="marked(parameter.description)"></md-table-cell>
                                        <md-table-cell v-if="parameter.schema && parameter.schema.type !== 'array'">{{parameter.schema.type}}</md-table-cell>
                                        <md-table-cell v-if="parameter.schema && parameter.schema.type === 'array'">{{parameter.schema.items.type}} array</md-table-cell>
                                        <md-table-cell v-if="parameter.schema && parameter.schema.type !== 'array' && parameter.schema.enum">{{parameter.schema.enum.join(', ')}}</md-table-cell>
                                        <md-table-cell v-if="parameter.schema && parameter.schema.type !== 'array' && !parameter.schema.enum"></md-table-cell>
                                        <md-table-cell v-if="parameter.schema && parameter.schema.type === 'array'">
                                            <div style="overflow-y:scroll;max-height:200px;">{{(parameter.schema.items.enum || []).join(', ')}}</div>
                                        </md-table-cell>
                                        <md-table-cell>{{parameter.in}}</md-table-cell>
                                        <md-table-cell>
                                            <md-checkbox v-model="parameter.required" disabled></md-checkbox>
                                        </md-table-cell>
                                    </md-table-row>
                                </md-table-body>
                            </md-table>

                        </md-list-expand>
                    </md-list-item>
                </md-list>
            </md-layout>

        </md-layout>



    </div>
</template>

<style>

</style>

<script>
  import marked from 'marked'
  import { mapGetters } from 'vuex'
  export default {
    computed: mapGetters([
      'spec', 'oasDoc'
    ]),
    methods: {
      marked,
      log: function(info, thing) {
        console.log(info, thing)
      }
    },
  }
</script>
