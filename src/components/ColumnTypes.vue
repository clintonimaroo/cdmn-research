<template>
    <div>
      <h2>Column Types</h2>
      <form @submit.prevent="addColumnType">
        <input v-model="newColumnType.name" placeholder="Name" required />
        <input v-model="newColumnType.dataType" placeholder="Data Type" required />
        <button type="submit">Add Column Type</button>
      </form>
      <ul>
        <li v-for="(type, index) in columnTypes" :key="index">
          {{ type.name }} ({{ type.dataType }})
          <button @click="removeColumnType(index)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ColumnTypes',
    data() {
      return {
        newColumnType: { name: '', dataType: '' },
        columnTypes: []
      };
    },
    methods: {
      addColumnType() {
        this.columnTypes.push({ ...this.newColumnType });
        this.newColumnType.name = '';
        this.newColumnType.dataType = '';
      },
      removeColumnType(index) {
        this.columnTypes.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  form {
    margin-bottom: 20px;
  }
  input {
    margin-right: 10px;
  }
  button {
    margin-left: 10px;
  }
  </style>
  