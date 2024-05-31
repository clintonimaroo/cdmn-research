<template>
  <div>
    <h2>CDMN Table</h2>
    <form @submit.prevent="addRow">
      <table>
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(column, index) in columns" :key="index">
              <input v-model="newRow[column]" :placeholder="column" />
            </td>
            <td><button type="submit" class="add-row-button">+</button></td>
          </tr>
          <tr v-for="(row, index) in rows" :key="index">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
            <td><button class="remove" @click="removeRow(index)">x</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
import { db } from '@/firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc } from 'firebase/firestore';

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
      rows: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const userId = this.$root.$userId; // Get the user ID from the global properties
      const docId = this.cdmnId || userId; // Use cdmnId if present, otherwise use userId
      const cdmnDoc = doc(db, 'cdmn', docId);

      onSnapshot(cdmnDoc, (doc) => {
        if (doc.exists()) {
          this.rows = doc.data().rows || [];
        } else {
          console.log('No such document!');
        }
      });
    },
    async addRow() {
      if (!this.newRow.Name || !this.newRow.Age || !this.newRow.Salary) {
        console.error('All fields are required');
        alert('All fields are required');
        return;
      }

      const userId = this.$root.$userId; // Get the user ID from the global properties
      const docId = this.cdmnId || userId; // Use cdmnId if present, otherwise use userId
      const cdmnDoc = doc(db, 'cdmn', docId);

      try {
        const docSnapshot = await getDoc(cdmnDoc);
        if (!docSnapshot.exists()) {
          await setDoc(cdmnDoc, { rows: [] });
        }

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
      const userId = this.$root.$userId; 
      const docId = this.cdmnId || userId; 
      const cdmnDoc = doc(db, 'cdmn', docId);
      const updatedRows = [...this.rows];
      updatedRows.splice(index, 1);

      try {
        await updateDoc(cdmnDoc, {
          rows: updatedRows
        });
        console.log('Row removed successfully');
      } catch (error) {
        console.error('Error removing row:', error);
      }
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
