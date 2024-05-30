<template>
    <div>
      <h2>Column Editor</h2>
      <form @submit.prevent="addColumn">
        <input v-model="newColumn.name" placeholder="Column Name" required />
        <select v-model="newColumn.dataType">
          <option v-for="type in dataTypes" :key="type">{{ type }}</option>
        </select>
        <button type="submit">Add Column</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ColumnEditor',
    data() {
      return {
        newColumn: { name: '', dataType: '' },
        dataTypes: ['String', 'Number', 'Boolean'], 
      };
    },
    methods: {
      addColumn() {
        
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  