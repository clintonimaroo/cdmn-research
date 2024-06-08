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
            <td @dblclick="enableEditing(index, 'name')">
              <template v-if="isEditing(index, 'name')">
                <input v-model="editingData[index].name" @blur="saveEdit(index, 'name')"
                  @keyup.enter="saveEdit(index, 'name')" />
              </template>
              <template v-else>
                {{ type.name }}
              </template>
            </td>
            <td @dblclick="enableEditing(index, 'dataType')">
              <template v-if="isEditing(index, 'dataType')">
                <input v-model="editingData[index].dataType" @blur="saveEdit(index, 'dataType')"
                  @keyup.enter="saveEdit(index, 'dataType')" />
              </template>
              <template v-else>
                {{ type.dataType }}
              </template>
            </td>
            <td><button @click="removeColumnType(index)">Remove</button></td>
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
  name: 'ColumnTypes',
  data() {
    return {
      newColumnType: { name: '', dataType: '' },
      columnTypes: [],
      editingData: {}
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, 'columnTypes'));
      this.columnTypes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.resetEditingData();
      console.log("Loaded column types: ", this.columnTypes);
    } catch (error) {
      console.error("Error loading column types: ", error);
    }
  },
  methods: {
    resetEditingData() {
      this.editingData = this.columnTypes.map(type => ({ ...type }));
    },
    isEditing(index, field) {
      return this.editingData[index] && this.editingData[index][field] !== undefined;
    },
    enableEditing(index, field) {
      this.$set(this.editingData, index, { ...this.columnTypes[index] });
      this.$set(this.editingData[index], field, this.columnTypes[index][field]);
      console.log(`Editing enabled for index ${index} field ${field}`);
    },
    async saveEdit(index, field) {
      const updatedType = { ...this.columnTypes[index], [field]: this.editingData[index][field] };
      this.columnTypes[index] = updatedType;
      const docRef = doc(db, 'columnTypes', updatedType.id);

      try {
        await updateDoc(docRef, updatedType);
        this.$delete(this.editingData[index], field);
        console.log('Field updated successfully: ', updatedType);
      } catch (error) {
        console.error('Error updating field: ', error);
      }
    },
    async addColumnType() {
      try {
        console.log("Adding column type: ", this.newColumnType);
        const docRef = await addDoc(collection(db, 'columnTypes'), this.newColumnType);
        this.columnTypes.push({ id: docRef.id, ...this.newColumnType });
        this.newColumnType = { name: '', dataType: '' };
        this.resetEditingData();
        console.log('Column type added successfully: ', this.columnTypes);
      } catch (error) {
        console.error('Error adding column type: ', error);
      }
    },
    async removeColumnType(index) {
      const type = this.columnTypes[index];
      const docRef = doc(db, 'columnTypes', type.id);

      try {
        await deleteDoc(docRef);
        this.columnTypes.splice(index, 1);
        this.resetEditingData();
        console.log('Column type removed successfully: ', type);
      } catch (error) {
        console.error('Error removing column type: ', error);
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

td input {
  width: 100%;
  box-sizing: border-box;
}
</style>
