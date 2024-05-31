<template>
  <div id="app">
    <nav>
      <router-link to="/column-types">+ Column Types</router-link>
      <router-link to="/table-types">+ Table Types</router-link>
      <router-link :to="{ name: 'cdmn-table', params: { sessionId: userSessionId } }">+ CDMN Table</router-link>
      <button class="info-button" @click="showPeekView = true">
        <img src="@/assets/info.png" alt="What's CDMN?" class="info-button-gif" />
      </button>
      <button class="invite-button" @click="showInvite = true">
        Invite Collaborator
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
        <button class="close-button" @click="closePeekView">×</button>
      </div>
    </div>
    <div id="mobile-restriction">
      This site is not available on mobile devices. Please use a desktop or laptop to access the site.
    </div>
    <div v-if="showInvite" class="invite-modal-overlay" @click="closeInvite">
      <div class="invite-modal" @click.stop>
        <button class="close-button" @click="closeInvite">×</button>
        <InviteCollaborator :sessionId="userSessionId" />
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import InviteCollaborator from '@/components/InviteCollaborator';

export default {
  data() {
    return {
      showPeekView: false,
      showInvite: false,
      userSessionId: null,
    };
  },
  created() {
    const savedSessionId = localStorage.getItem('userSessionId');
    if (savedSessionId) {
      this.userSessionId = savedSessionId;
    } else {
      this.userSessionId = uuidv4();
      localStorage.setItem('userSessionId', this.userSessionId);
    }
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
</style>
