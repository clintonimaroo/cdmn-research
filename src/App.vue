<template>
  <div id="app">
    <nav>
      <router-link to="/column-types">+ Column Types</router-link>
      <router-link to="/table-types">+ Table Types</router-link>
      <router-link to="/cdmn-table">+ CDMN Table</router-link>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>