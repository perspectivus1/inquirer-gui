<template>
  <div class="remote-object">
    <v-container class="search-fields">
      <v-row justify="center">
        <v-col>
          <p class="question-label">Database:</p>
          <v-select :items="databases" hide-details="auto" v-model="database" dense></v-select>
        </v-col>

        <v-col>
          <p class="question-label">Schema:</p>
          <v-select :items="schemas" hide-details="auto" v-model="schema" dense></v-select>
        </v-col>

        <v-col>
          <p class="question-label">Object:</p>
          <v-text-field hide-details="auto" v-model="object" dense></v-text-field>
        </v-col>

        <v-col>
          <p class="question-label">Type:</p>
          <v-select :items="types" v-model="type" hide-details="auto" dense></v-select>
        </v-col>
      </v-row>
      <v-row justify="end">
        <v-btn @click="doSearch" outlined tile>Search</v-btn>
      </v-row>
      <v-row>
        <v-col>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="objects"
          item-key="database"
          :single-select="false"
          show-select
          hide-default-footer
          dense
          flat
          class="table"
          @input="onAnswerChanged"
        ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "QuestionRemoteObjectSelection",
  data() {
    return {
      selected: [],
      headers: [
        {
          text: "Database",
          align: "start",
          value: "database"
        },
        { text: "Schema", value: "schema" },
        { text: "Object", value: "object" },
        { text: "Type", value: "type" }
      ],
      database: "",
      schema: "",
      object: "",
      type: "",
      databases: [],
      schemas: [],
      objects: [],
      types: []
    };
  },
  methods: {
    onAnswerChanged(value) {
      const response = [];
      for (const answer of value) {
        response.push(answer.value);
      }
      this.$emit("answerChanged", this.question.name, response);
    },
    async doSearch() {
      const rawObjects = await this.question.search(
        this.database,
        this.schema,
        this.object,
        this.type
      );
      const objects = this.prepObjects(rawObjects);
      this.objects = objects;
    },
    prepObjects: function(rawObjects) {
      const items = [];
      for (const item of rawObjects) {
        items.push({
          value: item.value,
          database: item.database,
          schema: item.schema,
          object: item.object,
          type: item.type
        });
      }
      return items;
    }
  },
  props: {
    question: Object
  },
  mounted: async function() {
    this.databases = await this.question.getDatabases();
    this.schemas = await this.question.getSchemas();
    this.types = await this.question.getTypes();
  }
};
</script>

<style>
.remote-object > .table {
  border-style: solid;
  border-radius: 0;
  border-width: thin;
}
.remote-object > .search-fields {
  padding: 0;
}
</style>