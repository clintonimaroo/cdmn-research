<template>
  <div>
    <h2>Column Types</h2>
    <form @submit.prevent="addColumnType">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Data Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input v-model="newColumnType.name" placeholder="Name" required /></td>
            <td><input v-model="newColumnType.dataType" placeholder="Data Type" required /></td>
            <td><button type="submit">Add Column Type</button></td>
          </tr>
          <tr v-for="(type, index) in columnTypes" :key="index">
            <td>{{ type.name }}</td>
            <td>{{ type.dataType }}</td>
            <td><button @click="removeColumnType(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { saveToLocalStorage, loadFromLocalStorage } from '@/utils/storage';

export default {
  name: 'ColumnTypes',
  data() {
    return {
      newColumnType: { name: '', dataType: '' },
      columnTypes: loadFromLocalStorage('columnTypes') || []
    };
  },
  methods: {
    addColumnType() {
      this.columnTypes.push({ ...this.newColumnType });
      this.newColumnType.name = '';
      this.newColumnType.dataType = '';
      saveToLocalStorage('columnTypes', this.columnTypes);
    },
    removeColumnType(index) {
      this.columnTypes.splice(index, 1);
      saveToLocalStorage('columnTypes', this.columnTypes);
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

</style>