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