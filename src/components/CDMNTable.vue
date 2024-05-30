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
import { collection, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

export default {
  name: 'CDMNTable',
  data() {
    return {
      columns: ['Name', 'Age', 'Salary'],
      newRow: {},
      rows: []
    };
  },
  created() {
    const cdmnId = this.$route.params.cdmnId;
    const cdmnDoc = doc(collection(db, 'cdmn'), cdmnId);

    onSnapshot(cdmnDoc, (doc) => {
      if (doc.exists()) {
        this.rows = doc.data().rows;
      }
    });
  },
  methods: {
    async addRow() {
      const cdmnId = this.$route.params.cdmnId;
      const cdmnDoc = doc(collection(db, 'cdmn'), cdmnId);

      try {
        await updateDoc(cdmnDoc, {
          rows: arrayUnion(this.newRow)
        });
        this.newRow = {};
      } catch (error) {
        console.error('Error adding row:', error);
      }
    },
    async removeRow(index) {
      const cdmnId = this.$route.params.cdmnId;
      const cdmnDoc = doc(collection(db, 'cdmn'), cdmnId);
      const updatedRows = [...this.rows];
      updatedRows.splice(index, 1);

      try {
        await updateDoc(cdmnDoc, {
          rows: updatedRows
        });
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
