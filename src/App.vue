<template>
  <div id="app">
    <nav>
      <router-link to="/column-types">+ Column Types</router-link>
      <router-link to="/table-types">+ Table Types</router-link>
      <router-link :to="{ name: 'CDMNTable', params: { cdmnId: currentCDMNId } }">+ CDMN Table</router-link>
      <button class="info-button" @click="showPeekView = true">
        <img src="@/assets/info.png" alt="What's CDMN?" class="info-button-gif" />
      </button>
      <button class="invite-button" @click="showInvite = true">
        Invite Collaborator
      </button>
    </nav>
    <div class="container">
      <router-view :cdmnId="currentCDMNId"></router-view>
    </div>
    <footer>
      Clinton Imaro © 2024 • All Rights Reserved
    </footer>
    <footer>
      built by <a href="https://www.linkedin.com/in/clintonimaro/" target="_blank" rel="noopener noreferrer">Clinton
        Imaro</a>
    </footer>
    <div v-if="showPeekView" class="peek-view-overlay" @click="closePeekView">
      <div class="peek-view" @click.stop>
        <h2>What is CDMN?</h2>
        <p>CDMN (Custom Decision Model and Notation) is a table format that allows you to describe knowledge about a
          certain domain. This knowledge can then be used to carry out various types of reasoning. It is particularly
          useful for defining and working with rules and logic in a structured manner.</p>
        <!-- Container for Buy Me a Coffee Button -->
        <div id="bmc-container"></div>
        <button class="close-button" @click="closePeekView">×</button>
      </div>
    </div>
    <div v-if="showInvite" class="invite-modal-overlay" @click="closeInvite">
      <div class="invite-modal" @click.stop>
        <button class="close-button" @click="closeInvite">×</button>
        <InviteCollaborator :cdmnId="currentCDMNId" />
      </div>
    </div>
  </div>
</template>

<script>
import InviteCollaborator from '@/components/InviteCollaborator';

function generateUniqueID() {
  return 'cdmn_' + Math.random().toString(36).substr(2, 9);
}

export default {
  data() {
    return {
      showPeekView: false,
      showInvite: false,
      currentCDMNId: ''
    };
  },
  created() {
    let storedID = localStorage.getItem('cdmnId');
    if (!storedID) {
      storedID = generateUniqueID();
      localStorage.setItem('cdmnId', storedID);
    }
    this.currentCDMNId = storedID;
    console.log('Current CDMN ID:', this.currentCDMNId);
  },
  mounted() {
    this.loadBuyMeCoffeeButton();
  },
  methods: {
    closePeekView() {
      this.showPeekView = false;
    },
    closeInvite() {
      this.showInvite = false;
    },
    loadBuyMeCoffeeButton() {
      const script = document.createElement('script');
      script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
      script.setAttribute('data-name', 'bmc-button');
      script.setAttribute('data-slug', 'afrostream2');
      script.setAttribute('data-color', '#FFDD00');
      script.setAttribute('data-emoji', '🍵');
      script.setAttribute('data-font', 'Cookie');
      script.setAttribute('data-text', 'Buy me a tea');
      script.setAttribute('data-outline-color', '#000000');
      script.setAttribute('data-font-color', '#000000');
      script.setAttribute('data-coffee-color', '#ffffff');

      document.getElementById('bmc-container').appendChild(script);
    }
  },
  components: {
    InviteCollaborator
  }
};
</script>

<style>
</style>