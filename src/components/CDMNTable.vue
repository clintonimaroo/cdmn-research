<template>
  <div>
    <h2>CDMN Table</h2>
    <form @submit.prevent="addRow">
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index" :class="getColumnClass(index)">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(column, index) in columns" :key="index">
              <input v-model="newRow[column]" :placeholder="column" />
            </td>
          </tr>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
            <td><button @click="removeRow(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="add-row-button">Add Row</button>
    </form>
  </div>
</template>

<script>
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/storage';

export default {
  name: 'CDMNTable',
  data() {
    return {
      columns: ['Column1', 'Column2', 'Column3'],
      newRow: {},
      rows: loadFromLocalStorage('rows') || []
    };
  },
  methods: {
    addRow() {
      this.rows.push({ ...this.newRow });
      this.newRow = {};
      saveToLocalStorage('rows', this.rows);
    },
    removeRow(index) {
      this.rows.splice(index, 1);
      saveToLocalStorage('rows', this.rows);
    },
    getColumnClass(index) {
      return index % 2 === 0 ? 'column-even' : 'column-odd';
    }
  }
};
</script>

<style scoped>
th {
  color: #333;
}

.column-even {
  background-color: #b5d7a8;
}

.column-odd {
  background-color: #cfe1f3;
}

table {
  width: 80%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

td input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

tr:nth-child(even) td {
  background-color: #f9f9f9;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #42b983;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

td button {
  background-color: #e74c3c;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

.add-row-button {
  margin-top: 10px;
}
</style>