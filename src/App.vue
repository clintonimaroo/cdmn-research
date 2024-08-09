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
      SmartKlass™️ | All Rights Reserved | Copyright 2024
    </footer>
    <div v-if="showPeekView" class="peek-view-overlay" @click="closePeekView">
      <div class="peek-view" @click.stop>
        <h2>What is CDMN?</h2>
        <p>CDMN (Custom Decision Model and Notation) is a table format that allows you to describe knowledge about a
          certain domain. This knowledge can then be used to carry out various types of reasoning. It is particularly
          useful for defining and working with rules and logic in a structured manner.</p>
        <!-- Buy Me a Coffee Button -->
        <div class="bmc-button-container">
          <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
            data-name="bmc-button" data-slug="afrostream2" data-color="#FFDD00" data-emoji="🍵" data-font="Cookie"
            data-text="Buy me a tea" data-outline-color="#000000" data-font-color="#000000"
            data-coffee-color="#ffffff"></script>
        </div>
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
  methods: {
    closePeekView() {
      this.showPeekView = false;
    },
    closeInvite() {
      this.showInvite = false;
    }
  },
  components: {
    InviteCollaborator
  }
};
</script>

<style>
/* Add your existing styles here */

/* Peek view styles */
.peek-view-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.peek-view {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.bmc-button-container {
  margin-top: 20px;
  text-align: center;
}
</style>