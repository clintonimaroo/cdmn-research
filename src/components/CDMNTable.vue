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
      columns: ['Column1', 'Column2'], // Replace with dynamic columns if needed
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
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  td button {
    background-color: #e74c3c;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }
</style>