<template>
  <v-app>
    <v-app-bar app color="#FFB700" dark flat >
   <v-select
      v-model="value"
      :items="headers"
      multiple
      prepend-inner-icon="mdi-web" 
      hide-details 
      return-object
    >
      <template v-slot:selection="{ item, index }">
        <v-chip small color="rgba(0, 0, 0, 0.54)" v-if="index < 7">
          <span>{{ item.text }}</span>
        </v-chip>
        <span
          v-if="index > 6"
          class="white--text caption"
        >(+{{ value.length - 7 }} others)</span>
      </template>
    </v-select>
      <v-text-field v-model="search" clearable prepend-inner-icon="search" 
        single-line class="mx-3" hide-details flat @change="search"></v-text-field>
    </v-app-bar>
    <v-content>
    <v-hover
        v-slot:default="{ hover }"
    >
 
     <v-data-table dense light :headers="selectedHeaders" :single-expand="true" :expanded="expanded" @click:row="expandRow" :item-key="id" :items="glossary.glossary" class="elevation-1" :disable-sort=true :search="search">
     <template v-slot:expanded-item="{ headers, item }">
       <td :colspan="headers.length">
        <v-card
            class="mx-auto" 
            color="#f6f1e9"
          >
          <v-card-title>{{ item.English.term }}</v-card-title>
          <v-card-text>{{ item.English.definition }}</v-card-text>
           <div class="datatable-container"></div>
        </v-card>
</td>
     </template>
     <template #item.Arabic.term="{item}">
       <p class="text-end">{{item.Arabic.term}}</p>
     </template>
     </v-data-table>
    </v-hover>
    </v-content>
    <v-row justify="center"> </v-row>
    <v-footer color="#FFB700" dark app>
      <v-img alt="ngolimi Logo" class="shrink mr-2" contain src="@/assets/logo.png" transition="scale-transition" width="30" />
     <span>&copy; 2020 ngolimi</span>
  <v-spacer></v-spacer>
   <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-help-circle</v-icon>
      </template>
      <v-card>
         <v-card-title>ngolimi glossary</v-card-title>
         <v-divider></v-divider>
         <v-card-subtitle>Open-source framework for self-hosted glossaries</v-card-subtitle>
         <v-card-text>
         Sample content from the COVID-19 glossary developed in this framework by Translators without Borders.
         </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#FFB700" dark @click="dialog = false"><v-icon v-on="on">mdi-close-thick</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-footer>
  </v-app>
</template>

<script>
import json from '@/assets/data/glossary.json'
export default {
  name: 'App',
  data () {
    return {
      publicPath: process.env.BASE_URL,
      glossary: json,
      search: '',
      value: [],
      expanded: [],
      selectedHeaders: [],
      dialog: false,
      headers: [
        { text: '', value: 'data-table-expand' },
        { text: 'English', value: 'English.term' },
        { text: 'Vietnamese', value: 'Vietnamese.term' },
        { text: 'Chinese', value: 'Simplified_Chinese.term' },
        { text: 'Tagalog', value: 'Tagalog.term' },
        { text: 'Burmese', value: 'Burmese.term' },
        { text: 'Kurmanji', value: 'Kurdish_Kurmanji.term' },
        { text: 'Arabic', value: 'Arabic.term' },
        { text: 'Swahili', value: 'Swahili.term' },
        { text: 'Kibaku', value: 'Kibaku.term' },
        { text: 'Waha', value: 'Waha.term' },
        { text: 'Bura', value: 'Bura_Pabir.term' },
        { text: 'Mandara', value: 'Mandara.term' },
      ]
    }
  },
  methods: {
    filter(value, search, item) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1
    },
   expandRow (item) {
      if (item.English.definition) {
        this.expanded = item === this.expanded[0] ? [] : [item]
      }
    }
  },
  watch: {
    value(val) {
      this.selectedHeaders = val ;
    }
  },
  created() {
    this.selectedHeaders = this.headers;
  }
}
</script>
<style>
tbody tr:nth-of-type(even) {
  background-color: rgba(0, 0, 0, .10) !important;
  cursor: pointer;
}
tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, .05) !important;
  cursor: pointer;
}
.v-data-table__mobile-row__header {
 font-weight: 300 !important;
}
.v-data-table__mobile-row__cell {
 font-weight: 500;
}
.v-data-table-header-mobile {
display: none !important;
}
.v-data-footer__pagination {
margin-right: 1px !important;
margin-left: 1px !important;
}
.v-application--is-ltr .v-data-footer__select .v-select {
 margin-top: 1px !important;
 margin-bottom: 5px !important;
}
</style>
