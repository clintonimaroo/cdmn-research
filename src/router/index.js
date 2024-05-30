import { createRouter, createWebHistory } from 'vue-router';
import ColumnTypes from '../components/ColumnTypes.vue';
import TableTypes from '../components/TableTypes.vue';
import CDMNTable from '../components/CDMNTable.vue';
import Join from '../components/Join.vue'; 

const routes = [
  { path: '/column-types', component: ColumnTypes },
  { path: '/table-types', component: TableTypes },
  { path: '/cdmn-table', component: CDMNTable },
  { path: '/join', component: Join }, 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;