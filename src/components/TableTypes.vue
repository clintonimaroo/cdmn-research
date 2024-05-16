<template>
    <div>
      <h2>Table Types</h2>
      <form @submit.prevent="addTableType">
        <input v-model="newTableType.name" placeholder="Name" required />
        <select v-model="newTableType.fixed">
          <option value="true">Fixed</option>
          <option value="false">Variable</option>
        </select>
        <input v-if="newTableType.fixed === 'true'" v-model="newTableType.columns" placeholder="Number of Columns" type="number" min="1" required />
        <button type="submit">Add Table Type</button>
      </form>
      <ul>
        <li v-for="(type, index) in tableTypes" :key="index">
          {{ type.name }} ({{ type.fixed ? 'Fixed' : 'Variable' }})
          <button @click="removeTableType(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TableTypes',
    data() {
      return {
        newTableType: { name: '', fixed: 'true', columns: '' },
        tableTypes: []
      };
    },
    methods: {
      addTableType() {
        this.tableTypes.push({ ...this.newTableType });
        this.newTableType.name = '';
        this.newTableType.fixed = 'true';
        this.newTableType.columns = '';
      },
      removeTableType(index) {
        this.tableTypes.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    margin-bottom: 20px;
  }
  input, select {
    margin-right: 10px;
  }
  button {
    margin-left: 10px;
  }
  </style>
  