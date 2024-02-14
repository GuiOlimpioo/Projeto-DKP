<template>
    <div class="dependentes-form">
      <h1>Cadastro</h1>
      <h2>Cadastro de Dependentes</h2>
      <hr>
  
      <div class="form-table-container">
        <form @submit.prevent="cadastrarNovoDependente">
          <label for="funcionario">Funcionário:</label>
          <select v-model="funcionario" id="funcionario" required>
            <option value=""></option>
            <option v-for="funcionario in funcionarios_disponiveis" :key="funcionario.id" :value="funcionario.id">
              {{ funcionario.nome }}
            </option>
          </select>
          <br><br>
          <label for="nome">Nome:</label>
          <input type="text" v-model="nome" id="nome" required>
          <br><br>
          <button type="submit">Cadastrar</button>
        </form>
  
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Funcionário</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dependente in dependentes" :key="dependente.id">
              <td>{{ dependente.id }}</td>
              <td>{{ dependente.funcionario }}</td>
              <td>{{ dependente.dependente }}</td>
              <td>
                <button @click="atualizarDependente(dependente.id)">Alterar</button>
                <button @click="excluirDependente(dependente.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'DependentesForm',
    data() {
      return {
        funcionario: '',
        nome: '',
        funcionarios_disponiveis: [],
        dependentes: [],
      };
    },
    mounted() {
      this.preencherSelect();
      this.listar();
    },
    methods: {
      cadastrarNovoDependente() {
  if (!this.funcionario || !this.nome) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
        axios
          .post('http://localhost:3000/routes/dependentes/cadastrar', {
            id_funcionario: this.funcionario,
            nome: this.nome,
          })
          .then(response => {
            console.log(response);
            this.listar();
          })
          .catch(error => console.log(error));
      },
      preencherSelect() {
        axios
          .get('http://localhost:3000/routes/funcionarios/listar')
          .then(response => {
            this.funcionarios_disponiveis = response.data.data;
          })
          .catch(error => console.log(error));
      },
      listar() {
        axios
          .get('http://localhost:3000/routes/dependentes/listar')
          .then(response => {
            this.dependentes = response.data.data;
          })
          .catch(error => console.log(error));
      },
      atualizarDependente(id) {
        axios
          .get(`http://localhost:3000/routes/dependentes/${id}`)
          .then(response => {
            const id_funcionario = window.prompt("ID do funcionário:", response.data.data.id_funcionario);
            if (id_funcionario !== null) {
              const nome_dependente = window.prompt("Nome do dependente:", response.data.data.dependente);
              if (nome_dependente !== null) {
                axios
                  .patch(`http://localhost:3000/routes/dependentes/alterar/${id}`, {
                    id_funcionario: id_funcionario,
                    nome: nome_dependente,
                  })
                  .then(response => {
                    console.log(response);
                    this.listar();
                  })
                  .catch(error => console.log(error));
              } else {
                console.log("Operação cancelada.");
              }
            } else {
              console.log("Operação cancelada.");
            }
          })
          .catch(error => console.log(error));
      },
      excluirDependente(id) {
        const result = window.confirm("Você tem certeza que deseja excluir este Dependente?");
        if (result) {
          axios
            .delete(`http://localhost:3000/routes/dependentes/excluir/${id}`)
            .then(response => {
              console.log(response);
              this.listar();
            })
            .catch(error => console.log(error));
        } else {
          window.alert("Exclusão cancelada.");
        }
      },
    },
  };
  </script>

<style scoped>
hr {
    width: 100%;
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 1rem;
}
input, select {
  margin-left: .5rem;
}
</style>