<template>
    <div>
      <h2>Row Editor</h2>
      <form @submit.prevent="addRow">
        <div v-for="(column, index) in columns" :key="index">
          <input v-model="newRow[column]" :placeholder="column" />
        </div>
        <button type="submit">Add Row </button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RowEditor',
    data() {
      return {
        columns: ['Column1', 'Column2'], 
        newRow: {},
      };
    },
    methods: {
      addRow() {
        
      },
    },
  };
  </script>
  
  <style scoped>
  
  </style>
  