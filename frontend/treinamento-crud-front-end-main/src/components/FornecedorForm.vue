<template>
  <div class="fornecedor-form">
    <h2>Controle de Fornecedores</h2>
    <hr>

    <div class="form-table-container">
      <!-- Formulário para Cadastro -->
      <form @submit.prevent="cadastrarNovoFornecedor">
        <div class="form-group">
          <label for="nome">Fornecedor:</label>
          <input type="text" v-model="nome" id="nome" required>
        </div>
        <div class="form-group">
          <label for="atividade">Atividade:</label>
          <input type="text" v-model="atividade" id="atividade" required>
        </div>
        <div class="form-group">
          <label for="contato">Contato:</label>
          <input type="text" v-model="contato" id="contato" required>
        </div>
        <b-button type="submit">Cadastrar</b-button>
      </form>

      <!-- Tabela de Fornecedores -->
      <table class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Fornecedor</th>
            <th>Atividade</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="fornecedor in fornecedores" :key="fornecedor.id">
            <td>{{ fornecedor.empresa }}</td>
            <td>{{ fornecedor.atividade }}</td>
            <td>{{ fornecedor.contato }}</td>
            <td>
              <b-button variant="primary" @click="atualizarFornecedor(fornecedor.id)" style="margin-right: 10px;">Alterar</b-button>
              <b-button variant="danger" @click="excluirFornecedor(fornecedor.id)" style="margin-left: 10px;">Excluir</b-button>
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
  name: 'FornecedorForm',
  data() {
    return {
      nome: '',
      atividade: '',
      contato: '',
      fornecedores: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    cadastrarNovoFornecedor() {
      const { nome, atividade, contato } = this;

      if (!nome || !atividade || !contato) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      axios
        .post('http://localhost:3000/routes/fornecedores/cadastrar', {
          nome: nome,
          atividade: atividade,
          contato: contato,
        })
        .then(response => {
          console.log(response);
          this.listar();
        })
        .catch(error => console.log(error));
    },

    listar() {
      axios
        .get('http://localhost:3000/routes/fornecedores/listar')
        .then(response => {
          this.fornecedores = response.data.data;
        })
        .catch(error => console.log(error));
    },

    atualizarFornecedor(id) {
      axios
        .get(`http://localhost:3000/routes/fornecedores/${id}`)
        .then(response => {
          const nome_fornecedor = window.prompt("Nome do fornecedor:", response.data.data.nome);
          const atividade_fornecedor = window.prompt("Atividade do fornecedor:", response.data.data.atividade);
          const contato_fornecedor = window.prompt("Contato do fornecedor:", response.data.data.contato);

          if (nome_fornecedor !== null && atividade_fornecedor !== null && contato_fornecedor !== null) {
            axios
              .patch(`http://localhost:3000/routes/fornecedores/alterar/${id}`, {
                nome: nome_fornecedor,
                atividade: atividade_fornecedor,
                contato: contato_fornecedor,
              })
              .then(response => {
                console.log(response);
                this.listar();
              })
              .catch(error => console.log(error));
          } else {
            console.log("Operação cancelada.");
          }
        })
        .catch(error => console.log(error));
    },

    excluirFornecedor(id) {
      const result = window.confirm("Você tem certeza que deseja excluir este Fornecedor?");
      if (result) {
        axios
          .delete(`http://localhost:3000/routes/fornecedores/excluir/${id}`)
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





