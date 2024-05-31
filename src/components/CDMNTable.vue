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
            <td><button type="submit" class="add-row-button">+</button></td>
          </tr>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(column, colIndex) in columns" :key="colIndex">
              <div @dblclick="editCell(rowIndex, column)">
                <template v-if="isEditing(rowIndex, column)">
                  <input v-model="editingData[rowIndex][column]" @blur="saveEdit(rowIndex, column)"
                    @keyup.enter="saveEdit(rowIndex, column)" />
                </template>
                <template v-else>
                  {{ row[column] }}
                </template>
              </div>
            </td>
            <td><button class="remove" @click="removeRow(rowIndex)">x</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>


<script>
import { db } from '@/firebase';
import { collection, doc, onSnapshot, updateDoc, setDoc, getDoc } from 'firebase/firestore';

export default {
  name: 'CDMNTable',
  props: ['cdmnId'],
  data() {
    return {
      columns: ['Name', 'Age', 'Salary'],
      newRow: {
        Name: '',
        Age: '',
        Salary: ''
      },
      rows: [],
      editingData: {}
    };
  },
  created() {
    const cdmnDoc = doc(collection(db, 'cdmn'), this.cdmnId);

    onSnapshot(cdmnDoc, (doc) => {
      if (doc.exists()) {
        console.log('Document data:', doc.data());
        this.rows = doc.data().rows || [];
        this.resetEditingData();
      } else {
        console.log('No such document!');
      }
    });
  },
  methods: {
    resetEditingData() {
      this.editingData = this.rows.map(row => ({ ...row }));
    },
    isEditing(rowIndex, column) {
      return this.editingData[rowIndex] && this.editingData[rowIndex][column] !== undefined;
    },
    editCell(rowIndex, column) {
      if (!this.editingData[rowIndex]) {
        this.$set(this.editingData, rowIndex, { ...this.rows[rowIndex] });
      }
      this.$set(this.editingData[rowIndex], column, this.rows[rowIndex][column]);
    },
    async saveEdit(rowIndex, column) {
      this.rows[rowIndex][column] = this.editingData[rowIndex][column];
      const cdmnDoc = doc(collection(db, 'cdmn'), this.cdmnId);

      try {
        await updateDoc(cdmnDoc, {
          rows: this.rows
        });
        delete this.editingData[rowIndex][column];
        console.log('Cell updated successfully');
      } catch (error) {
        console.error('Error updating cell:', error);
      }
    },
    async addRow() {
      if (!this.newRow.Name || !this.newRow.Age || !this.newRow.Salary) {
        console.error('All fields are required');
        alert('All fields are required');
        return;
      }

      const cdmnDoc = doc(collection(db, 'cdmn'), this.cdmnId);

      try {
        const docSnapshot = await getDoc(cdmnDoc);
        if (!docSnapshot.exists()) {
          await setDoc(cdmnDoc, { rows: [] });
        }

        console.log('Adding row:', this.newRow);
        const updatedRows = [...this.rows, this.newRow];
        await updateDoc(cdmnDoc, {
          rows: updatedRows
        });
        this.newRow = {
          Name: '',
          Age: '',
          Salary: ''
        };
        console.log('Row added successfully');
      } catch (error) {
        console.error('Error adding row:', error);
      }
    },
    async removeRow(index) {
      const cdmnDoc = doc(collection(db, 'cdmn'), this.cdmnId);
      const updatedRows = [...this.rows];
      updatedRows.splice(index, 1);

      try {
        console.log('Removing row at index:', index);
        await updateDoc(cdmnDoc, {
          rows: updatedRows
        });
        console.log('Row removed successfully');
      } catch (error) {
        console.error('Error removing row:', error);
      }
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
  width: 100%;
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
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  color: #000000;
  font-size: 15px;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-row-button {
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  color: #000000;
  font-size: 15px;
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
