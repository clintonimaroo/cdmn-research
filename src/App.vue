<template>
  <div id="app">
    <nav>
      <router-link to="/column-types">+ Column Types</router-link>
      <router-link to="/table-types">+ Table Types</router-link>
      <router-link to="/cdmn-table">+ CDMN Table</router-link>
      <button class="info-button" @click="showPeekView = true">
        <img src="@/assets/info.png" alt="What's CDMN?" class="info-button-gif" />
      </button>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
    <footer>
      SmartKlass™️ | All Rights Reserved | Copyright 2024
    </footer>
    <div v-if="showPeekView" class="peek-view-overlay" @click="closePeekView">
      <div class="peek-view" @click.stop>
        <h2>What is CDMN?</h2>
        <p>CDMN (Custom Decision Model and Notation) is a table format that allows you to describe knowledge about a
          certain domain. This knowledge can then be used to carry out various types of reasoning. It is particularly
          useful for defining and working with rules and logic in a structured manner.</p>
        <button @click="closePeekView">Close</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      showPeekView: false
    };
  },
  methods: {
    closePeekView() {
      this.showPeekView = false;
    }
  }
};

</script>
<style>
</style>