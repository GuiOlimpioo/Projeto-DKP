const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configuração do MySQL
const conn = mysql.createConnection({
  host: '127.0.0.1',
  database: 'dkpbase',
  user: 'root',
  senha: 'olimpio',
});

// Middleware para permitir o uso do bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para cadastrar um novo fornecedor
app.post('/routes/fornecedores/cadastrar', (req, res) => {
  const { nome, id_fornecedor, contato } = req.body;

  console.log('Corpo da requisição:', req.body);  // Adicionando log para verificar o corpo da requisição

  // Verifica se todos os campos estão preenchidos
  if (!nome || !id_fornecedor || !contato) {
    console.error('Campos incompletos. Por favor, preencha todos os campos.');  // Adicionando log de erro
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' });
  }

  conn.execute('INSERT INTO tbl_fornecedores (nome, id_fornecedor, contato) VALUES (?, ?, ?)', [nome, id_fornecedor, contato], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar fornecedor:', err);  // Adicionando log de erro
      return res.status(500).json({ msg: 'Erro ao cadastrar fornecedor', error: err });
    }

    console.log('Fornecedor cadastrado com sucesso!');  // Adicionando log de sucesso
    return res.status(201).json({ msg: 'Fornecedor cadastrado com sucesso!', data: results });
  });
});

// Rota para listar todos os fornecedores
app.get('/routes/fornecedores/listar', (req, res) => {
  conn.execute('SELECT * FROM tbl_fornecedores', (err, results) => {
    if (err) {
      console.error('Erro ao obter fornecedores:', err);  // Adicionando log de erro
      return res.status(500).json({ msg: 'Erro ao obter fornecedores', error: err });
    }
    return res.status(200).json({ data: results });
  });
});

// Rota para obter informações de um fornecedor específico
app.get('/routes/fornecedores/:id', (req, res) => {
  const fornecedorId = req.params.id;
  conn.execute('SELECT * FROM tbl_fornecedores WHERE id = ?', [fornecedorId], (err, results) => {
    if (err) {
      console.error('Erro ao obter informações do fornecedor:', err);  // Adicionando log de erro
      return res.status(500).json({ msg: 'Erro ao obter informações do fornecedor', error: err });
    }
    return res.status(200).json({ data: results[0] });
  });
});

// Rota para atualizar um fornecedor
app.patch('/routes/fornecedores/alterar/:id', (req, res) => {
  const fornecedorId = req.params.id;
  const { nome, contato } = req.body;

  console.log('Corpo da requisição:', req.body);  // Adicionando log para verificar o corpo da requisição

  // Verifica se todos os campos estão preenchidos
  if (!nome || !contato) {
    console.error('Campos incompletos. Por favor, preencha todos os campos.');  // Adicionando log de erro
    return res.status(400).json({ msg: 'Por favor, preencha todos os campos.' });
  }

  conn.execute('UPDATE tbl_fornecedores SET nome = ?, contato = ? WHERE id = ?', [nome, contato, fornecedorId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar fornecedor:', err);  // Adicionando log de erro
      return res.status(500).json({ msg: 'Erro ao atualizar fornecedor', error: err });
    }
    return res.status(200).json({ msg: 'Fornecedor atualizado com sucesso!', data: results });
  });
});

// Rota para excluir um fornecedor
app.delete('/routes/fornecedores/excluir/:id', (req, res) => {
  const fornecedorId = req.params.id;
  conn.execute('DELETE FROM tbl_fornecedores WHERE id = ?', [fornecedorId], (err, results) => {
    if (err) {
      console.error('Erro ao excluir fornecedor:', err);  // Adicionando log de erro
      return res.status(500).json({ msg: 'Erro ao excluir fornecedor', error: err });
    }
    return res.status(200).json({ msg: 'Fornecedor excluído com sucesso!', data: results });
  });
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


