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
            <td @dblclick="enableEditing(index, 'name')">
              <template v-if="isEditing(index, 'name')">
                <input v-model="editingData[index].name" @blur="saveEdit(index, 'name')"
                  @keyup.enter="saveEdit(index, 'name')" />
              </template>
              <template v-else>
                {{ type.name }}
              </template>
            </td>
            <td @dblclick="enableEditing(index, 'fixed')">
              <template v-if="isEditing(index, 'fixed')">
                <select v-model="editingData[index].fixed" @blur="saveEdit(index, 'fixed')"
                  @change="saveEdit(index, 'fixed')">
                  <option value="true">Fixed</option>
                  <option value="false">Variable</option>
                </select>
              </template>
              <template v-else>
                {{ type.fixed ? 'Fixed' : 'Variable' }}
              </template>
            </td>
            <td @dblclick="enableEditing(index, 'columns')" v-if="type.fixed === 'true'">
              <template v-if="isEditing(index, 'columns')">
                <input v-model="editingData[index].columns" type="number" @blur="saveEdit(index, 'columns')"
                  @keyup.enter="saveEdit(index, 'columns')" />
              </template>
              <template v-else>
                {{ type.columns }}
              </template>
            </td>
            <td v-else>N/A</td>
            <td><button @click="removeTableType(index)">Remove</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

export default {
  name: 'TableTypes',
  data() {
    return {
      newTableType: { name: '', fixed: 'true', columns: '' },
      tableTypes: [],
      editingData: {}
    };
  },
  async created() {
    const userId = this.$root.$userId;
    try {
      const querySnapshot = await getDocs(collection(db, 'users', userId, 'tableTypes'));
      this.tableTypes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.resetEditingData();
      console.log("Loaded table types: ", this.tableTypes);
    } catch (error) {
      console.error("Error loading table types: ", error);
    }
  },
  methods: {
    resetEditingData() {
      this.editingData = this.tableTypes.map(type => ({ ...type }));
    },
    isEditing(index, field) {
      this.$set(this.editingData, index, { ...this.tableTypes[index] });
      this.$set(this.editingData[index], field, this.tableTypes[index][field]);
      console.log(`Editing enabled for index ${index} field ${field}`);
    },
    async saveEdit(index, field) {
      const updatedType = { ...this.tableTypes[index], [field]: this.editingData[index][field] };
      this.tableTypes[index] = updatedType;
      const docRef = doc(db, 'tableTypes', updatedType.id);

      try {
        await updateDoc(docRef, updatedType);
        this.$delete(this.editingData[index], field);
        console.log('Field updated successfully: ', updatedType);
      } catch (error) {
        console.error('Error updating field: ', error);
      }
    },
    async addTableType() {
      try {
        console.log("Adding table type: ", this.newTableType);
        const docRef = await addDoc(collection(db, 'tableTypes'), this.newTableType);
        this.tableTypes.push({ id: docRef.id, ...this.newTableType });
        this.newTableType = { name: '', fixed: 'true', columns: '' };
        this.resetEditingData();
        console.log('Table type added successfully: ', this.tableTypes);
      } catch (error) {
        console.error('Error adding table type: ', error);
      }
    },
    async removeTableType(index) {
      const type = this.tableTypes[index];
      const docRef = doc(db, 'tableTypes', type.id);

      try {
        await deleteDoc(docRef);
        this.tableTypes.splice(index, 1);
        this.resetEditingData();
        console.log('Table type removed successfully: ', type);
      } catch (error) {
        console.error('Error removing table type: ', error);
      }
    }
  }
};
</script>

<style scoped>
th {
  background-color: #eb9ba4;
  color: #333;
}

td {
  cursor: pointer;
}

td input,
td select {
  width: 100%;
  box-sizing: border-box;
}
</style>
