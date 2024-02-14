<template>
  <div id="app">
    <nav>
      <router-link to="/funcionarios" active-class="active">Funcionários</router-link>
      <router-link to="/dependentes" active-class="active">Dependentes</router-link>
    </nav>
    <div>
      <router-view></router-view>
    </div>
    <footer class="bg-success text-light">
      <div>Design in {{ new Date().getFullYear() }}</div>
    </footer>
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  width: 70%;
  display: flex;
  margin: 2rem auto;
  justify-content: space-evenly;
}
nav a {
  text-decoration: none;
  color: #34496E;
  font-weight: bold;
}
.active {
  color: #41B883;
  border-bottom: 5px solid #41B883;
}
table {
  border: 1px solid;
}
table thead {
  background-color: gray;
  color: white;
}
td {
  border: 1px solid;
}
th, td {
  padding: .5rem;
}
.componente-form-table {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
footer{
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
}
</style>
