import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import FuncionarioFormVue from './components/FuncionarioForm.vue';
import DependentesFormVue from './components/DependentesForm.vue';
import FornecedorFormVue from './components/FornecedorForm.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(VueRouter);


const routes = [
  { path: '/', component: FuncionarioFormVue },
  { path: '/funcionarios', component: FuncionarioFormVue },
  { path: '/dependentes', component: DependentesFormVue },
  { path: '/fornecedores', component: FornecedorFormVue },
];


const router = new VueRouter({
  routes,
});

Vue.config.productionTip = false

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')

export default router;

