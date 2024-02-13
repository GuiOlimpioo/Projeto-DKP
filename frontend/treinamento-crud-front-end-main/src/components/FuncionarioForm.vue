<template>
  <div class="funcionario-form">
    <h1>Cadastro</h1>
    <h2>Cadastro de Funcionários</h2>
    <hr>

    <div class="form-table-container">
      <form @submit.prevent="cadastrarNovoFuncionario">
        <label for="nome">Nome:</label>
        <input 
          type="text" 
          id="nome" 
          name="nome"
          v-model="nome"
          required
        />
        <br><br>
        <button type="submit">Cadastrar</button>
      </form>

      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="funcionario in funcionarios" :key="funcionario.id">
            <td>{{ funcionario.id }}</td>
            <td>{{ funcionario.nome }}</td>
            <td>
              <button @click="atualizarFuncionario(funcionario.id)">Alterar</button>
              <button @click="excluirFuncionario(funcionario.id)">Excluir</button>
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
  name: 'FuncionarioForm',
  data() {
    return {
      nome: '',
      funcionarios: [],
    }
  },
  mounted() {
    this.listar();
  },
  methods: {
    cadastrarNovoFuncionario() {
      
  if (!this.nome) {
    alert("Por favor, preencha o campo de nome.");
    return;
  }
      axios
        .post('http://localhost:3000/routes/funcionarios/cadastrar', {
          nome: this.nome
        })
        .then(response => {
          console.log(response);
          this.listar();
        })
        .catch(error => console.log("Erro ao cadastrar funcionário:",error));
        alert("Ocorreu um erro ao cadastrar o funcionário. Por favor, tente novamente.");
    },
    
    atualizarFuncionario(id) {
      axios
        .get(`http://localhost:3000/routes/funcionarios/${id}`)
        .then(response => {
          const nome_funcionario = window.prompt("Nome do funcionário:", response.data.data.nome);
          if (nome_funcionario !== null) {
            axios
              .patch(`http://localhost:3000/routes/funcionarios/alterar/${id}`, {
                nome: nome_funcionario,
              })
              .then(response => {
                console.log(response);
                this.listar();
              })
              .catch(error => {
            console.error("Erro ao atualizar funcionário:", error);
            alert("Ocorreu um erro ao atualizar o funcionário. Por favor, tente novamente.");
          });
          } else {
            console.log("Operação cancelada.");
          }
        })
        .catch(error => {
      console.error("Erro ao obter informações do funcionário:", error);
      alert("Ocorreu um erro ao obter informações do funcionário. Por favor, tente novamente.");
    });
    },
    excluirFuncionario(id) {
      const result = window.confirm("Você tem certeza que deseja excluir este Funcionário?");
      if (result) {
        axios
          .delete(`http://localhost:3000/routes/funcionarios/excluir/${id}`)
          .then(response => {
            console.log(response);
            this.listar();
          })
          .catch(error => {
        console.error("Erro ao excluir funcionário:", error);
        alert("Ocorreu um erro ao excluir o funcionário. Por favor, tente novamente.");
      });
      } else {
        window.alert("Exclusão cancelada.");
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
hr {
  width: 100%;
  border: 0;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 1rem;
}
input {
  margin-left: .5rem;
}
</style>
