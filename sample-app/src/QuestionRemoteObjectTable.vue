<template>
  <div class="remote-object">
<v-container class="search-fields">
    <v-row align="top" justify="center">
      <v-col>
        <p class="question-label">Database:</p>
        <v-select
          :items="databases"
          hide-details="auto"
        ></v-select>
      </v-col>

      <v-col>
        <p class="question-label">Schema:</p>
        <v-select
          :items="schemas"
          hide-details="auto"
        ></v-select>
      </v-col>

      <v-col>
        <p class="question-label">Object:</p>
        <v-input
        ></v-input>
      </v-col>

      <v-col>
        <p class="question-label">Type:</p>
        <v-select
          :items="types"
          hide-details="auto"
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="end">
      <v-btn>Search</v-btn>
    </v-row>
</v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="question._choices"
      item-key="name"
      :single-select="false"
      show-select
      hide-default-footer
      dense
      flat
      class="table"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="(item, itemIndex) in items" :key="itemIndex">
            <td><v-simple-checkbox v-model="item.glutenfree"></v-simple-checkbox></td>
            <td>{{ item.database }}</td>
            <td>{{ item.schema }}</td>
            <td>{{ item.object }}</td>
            <td>{{ item.type }}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "QuestionRemoteObjectTable",
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
      databases: ["<NULL>"],
      schemas: ["schema1", "schema2"],
      types: ["TABLE"]
    };
  },
  watch: {
    "question.answer": {
      handler: function(newValue, oldValue) {
        this.applyStyles(newValue, oldValue);
      }
    }
  },
  methods: {
    applyStyles(newAnswer, oldAnswer) {
      this.toggleSelected(oldAnswer); // deselect old selection
      this.toggleSelected(newAnswer); // select new selection
    },
    toggleSelected(answer) {
      if (answer) {
        const element = document.querySelector(
          `.v-card[data-itemvalue='${answer}']`
        );
        if (element) {
          element.classList.toggle("selected");
        }
      }
    },
    onAnswerChanged(value) {
      this.$emit("answerChanged", this.question.name, value);
    }
  },
  props: {
    question: Object
  },
  mounted: function() {
    this.applyStyles(this.question.answer, undefined);
  }
};
</script>

<style>
.v-card.selected {
  border: 1px solid;
}
.v-card {
  border: none;
}
.v-card__title {
  word-wrap: break-word;
  word-break: normal;
}
.description.v-card__text {
  text-overflow: ellipsis;
  overflow: hidden;
}
.homepage.v-card__text {
  padding-bottom: 0;
}
a {
  font-size: 11px;
}
.tiles-row {
  margin: 0px;
}
.tile-image-container {
  max-height: 40%;
}
.tile-image-container > img {
  object-fit: scale-down;
  width: 100%;
  height: 100%;
}

.v-text-field.v-select {
  padding-top: 0;
}
.remote-object > .table {
    border-style: solid;
    border-radius: 0;
    border-width: thin;
}
.remote-object > .search-fields {
  padding: 0;
}
</style>