<template>
  <div id="app">
    <header>
      <h1>cDMN Table Creator</h1>
    </header>
    <main>
      <section id="column-types-crud">
        <h2>Column Types</h2>
        <button class="primary-button" @click="addColumnType">Add Column Type</button>
        <div v-for="(type, index) in columnTypes" :key="index" class="item">
          <span>{{ type }}</span>
          <button @click="editColumnType(index)">Edit</button>
          <button @click="deleteColumnType(index)">Delete</button>
        </div>
      </section>

      <section id="cdmn-table-types-crud">
        <h2>cDMN Table Types</h2>
        <button class="primary-button" @click="addTableType">Add cDMN Table Type</button>
        <div v-for="(type, index) in cdmnTableTypes" :key="index" class="item">
          <span>{{ type.name }}</span>
          <button @click="editTableType(index)">Edit</button>
          <button @click="deleteTableType(index)">Delete</button>
        </div>
      </section>

      <section id="cdmn-tables-crud">
        <h2>cDMN Tables</h2>
        <button class="primary-button" @click="addTable">Add cDMN Table</button>
        <div v-for="(table, index) in cdmnTables" :key="index" class="item">
          <span>{{ table.name }}</span>
          <button @click="viewTable(index)">View/Edit</button>
          <button @click="deleteTable(index)">Delete</button>
        </div>
      </section>
    </main>

    <div v-if="showModal" id="cdmn-table-detail-modal" class="modal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <h2>Edit cDMN Table</h2>
        <div>
          <h3>{{ currentTable.name }}</h3>
          <div id="columns">
            <h4>Columns</h4>
            <button class="primary-button" @click="addColumn">Add Column</button>
            <div v-for="(column, index) in currentTable.columns" :key="index" class="item">
              <span>{{ column }}</span>
              <button @click="editColumn(index)">Edit</button>
              <button @click="deleteColumn(index)">Delete</button>
            </div>
          </div>
          <div id="rows">
            <h4>Rows</h4>
            <button class="primary-button" @click="addRow">Add Row</button>
            <div v-for="(row, rowIndex) in currentTable.rows" :key="rowIndex" class="item">
              <div v-for="(cell, cellIndex) in row" :key="cellIndex">
                {{ cell }}
              </div>
              <button @click="editRow(rowIndex)">Edit</button>
              <button @click="deleteRow(rowIndex)">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columnTypes: JSON.parse(localStorage.getItem('columnTypes')) || [],
      cdmnTableTypes: JSON.parse(localStorage.getItem('cdmnTableTypes')) || [],
      cdmnTables: JSON.parse(localStorage.getItem('cdmnTables')) || [],
      showModal: false,
      currentTable: null,
      currentTableIndex: -1,
    };
  },
  methods: {
    addColumnType() {
      const newType = prompt('New Column Type');
      if (newType) {
        this.columnTypes.push(newType);
        this.saveColumnTypes();
      }
    },
    editColumnType(index) {
      const newType = prompt('Edit Column Type', this.columnTypes[index]);
      if (newType) {
        this.columnTypes[index] = newType;
        this.saveColumnTypes();
      }
    },
    deleteColumnType(index) {
      this.columnTypes.splice(index, 1);
      this.saveColumnTypes();
    },
    saveColumnTypes() {
      localStorage.setItem('columnTypes', JSON.stringify(this.columnTypes));
    },
    addTableType() {
      const newType = prompt('New cDMN Table Type Name');
      if (newType) {
        this.cdmnTableTypes.push({ name: newType });
        this.saveTableTypes();
      }
    },
    editTableType(index) {
      const newName = prompt('Edit cDMN Table Type Name', this.cdmnTableTypes[index].name);
      if (newName) {
        this.cdmnTableTypes[index].name = newName;
        this.saveTableTypes();
      }
    },
    deleteTableType(index) {
      this.cdmnTableTypes.splice(index, 1);
      this.saveTableTypes();
    },
    saveTableTypes() {
      localStorage.setItem('cdmnTableTypes', JSON.stringify(this.cdmnTableTypes));
    },
    addTable() {
      const newName = prompt('New cDMN Table Name');
      if (newName) {
        this.cdmnTables.push({ name: newName, columns: [], rows: [] });
        this.saveTables();
      }
    },
    deleteTable(index) {
      this.cdmnTables.splice(index, 1);
      this.saveTables();
    },
    viewTable(index) {
      this.currentTableIndex = index;
      this.currentTable = JSON.parse(JSON.stringify(this.cdmnTables[index])); // Deep copy
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentTable = null;
      this.currentTableIndex = -1;
    },
    addColumn() {
      const newColumn = prompt('New Column Name');
      if (newColumn) {
        this.currentTable.columns.push(newColumn);
        this.saveCurrentTable();
      }
    },
    editColumn(index) {
      const newColumn = prompt('Edit Column', this.currentTable.columns[index]);
      if (newColumn) {
        this.currentTable.columns[index] = newColumn;
        this.saveCurrentTable();
      }
    },
    deleteColumn(index) {
      this.currentTable.columns.splice(index, 1);
      this.saveCurrentTable();
    },
    addRow() {
      const newRow = prompt('New Row Values (comma separated)');
      if (newRow) {
        this.currentTable.rows.push(newRow.split(', '));
        this.saveCurrentTable();
      }
    },
    editRow(index) {
      const newRow = prompt('Edit Row', this.currentTable.rows[index].join(', '));
      if (newRow) {
        this.currentTable.rows[index] = newRow.split(', ');
        this.saveCurrentTable();
      }
    },
    deleteRow(index) {
      this.currentTable.rows.splice(index, 1);
      this.saveCurrentTable();
    },
    saveCurrentTable() {
      this.$set(this.cdmnTables, this.currentTableIndex, this.currentTable);
      this.saveTables();
    },
    saveTables() {
      localStorage.setItem('cdmnTables', JSON.stringify(this.cdmnTables));
    }
  }
};
</script>

<style scoped>
/* You can move these styles to the styles.css file if needed */
#app {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

h1 {
  color: #343a40;
}

h2 {
  color: #495057;
  margin-bottom: 10px;
}

/* Button Styles */
button {
  cursor: pointer;
  padding: 10px 15px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
}

.primary-button {
  background-color: #007bff;
  color: white;
}

.primary-button:hover {
  background-color: #0056b3;
}

/* Section Styles */
section {
  margin-bottom: 20px;
  padding: 15px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  margin-bottom: 5px;
}

.item button {
  margin-left: 5px;
}

/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
}

.close-button {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close-button:hover,
.close-button:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
