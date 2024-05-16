<template>
    <div>
      <h2>CDMN Table</h2>
      <form @submit.prevent="addRow">
        <div v-for="(column, index) in columns" :key="index">
          <input v-model="newRow[column]" :placeholder="column" />
        </div>
        <button type="submit">Add Row</button>
      </form>
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
            <td>
              <button @click="removeRow(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CDMNTable',
    data() {
      return {
        columns: ['Column1', 'Column2'], 
        newRow: {},
        rows: []
      };
    },
    methods: {
      addRow() {
        this.rows.push({ ...this.newRow });
        this.newRow = {};
      },
      removeRow(index) {
        this.rows.splice(index, 1);
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
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  button {
    margin-left: 10px;
  }
  </style>
  