<template>
  <div>
    <h2>Table Types</h2>
    <form @submit.prevent="addTableType">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fixed/Variable</th>
            <th>Columns (if Fixed)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="newTableType.name" placeholder="Name" required /></td>
            <td>
              <select v-model="newTableType.fixed">
                <option value="true">Fixed</option>
                <option value="false">Variable</option>
              </select>
            </td>
            <td><input v-if="newTableType.fixed === 'true'" v-model="newTableType.columns"
                placeholder="Number of Columns" type="number" min="1" required /></td>
            <td><button type="submit">Add Table Type</button></td>
          </tr>
          <tr v-for="(type, index) in tableTypes" :key="index">
            <td>{{ type.name }}</td>
            <td>{{ type.fixed ? 'Fixed' : 'Variable' }}</td>
            <td>{{ type.fixed ? type.columns : 'N/A' }}</td>
            <td><button @click="removeTableType(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/storage';

export default {
  name: 'TableTypes',
  data() {
    return {
      newTableType: { name: '', fixed: 'true', columns: '' },
      tableTypes: loadFromLocalStorage('tableTypes') || []
    };
  },
  methods: {
    addTableType() {
      this.tableTypes.push({ ...this.newTableType });
      this.newTableType.name = '';
      this.newTableType.fixed = 'true';
      this.newTableType.columns = '';
      saveToLocalStorage('tableTypes', this.tableTypes);
    },
    removeTableType(index) {
      this.tableTypes.splice(index, 1);
      saveToLocalStorage('tableTypes', this.tableTypes);
    }
  }
};
</script>

<style scoped>
th {
  background-color: #eb9ba4;
  color: #333;
}
</style>