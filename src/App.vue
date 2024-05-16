<template>
  <div id="app">
    <nav>
      <router-link to="/column-types">Column Types</router-link> |
      <router-link to="/table-types">Table Types</router-link> |
      <router-link to="/cdmn-table">CDMN Table</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
