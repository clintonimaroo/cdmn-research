<template>
  <div>
    <h2>Table Types</h2>
    <form @submit.prevent="addTableType">
      <input v-model="newTableType.name" placeholder="Name" required />
      <select v-model="newTableType.fixed">
        <option value="true">Fixed</option>
        <option value="false">Variable</option>
      </select>
      <input v-if="newTableType.fixed === 'true'" v-model="newTableType.columns" placeholder="Number of Columns"
        type="number" min="1" required />
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
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  gap: 10px;
}

input,
select {
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

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
}

li button {
  background-color: #e74c3c;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>