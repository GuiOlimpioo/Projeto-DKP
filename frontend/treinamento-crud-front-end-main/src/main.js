import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import FuncionarioFormVue from './components/FuncionarioForm.vue';
import DependentesFormVue from './components/DependentesForm.vue';

Vue.use(VueRouter);

// Defina suas rotas
const routes = [
  { path: '/', component: FuncionarioFormVue },
  { path: '/funcionarios', component: FuncionarioFormVue },
  { path: '/dependentes', component: DependentesFormVue }
];

// Crie uma instância do VueRouter e passe as rotas
const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false

new Vue({
  router, // Adicione o router à instância Vue
  render: h => h(App),
}).$mount('#app')

export default router;
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
