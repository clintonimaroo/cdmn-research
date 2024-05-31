import { createRouter, createWebHistory } from 'vue-router';
import ColumnTypes from '../components/ColumnTypes.vue';
import TableTypes from '../components/TableTypes.vue';
import CDMNTable from '../components/CDMNTable.vue';
import JoinCollaboration from '../components/JoinCollaboration.vue';
import InviteCollaborator from '../components/InviteCollaborator.vue';

const routes = [
  { path: '/column-types', component: ColumnTypes },
  { path: '/table-types', component: TableTypes },
  { path: '/cdmn-table/:sessionId', component: CDMNTable, props: true, name: 'cdmn-table' },
  { path: '/join', component: JoinCollaboration },
  { path: '/invite/:cdmnId', component: InviteCollaborator, props: true }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;