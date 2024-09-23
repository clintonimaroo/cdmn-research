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
    <footer class="footer-text">
      Clinton Imaro © 2024 • All Rights Reserved
      <span class="hover-effect" style="margin-left: 30px;">
        Inspired by
        <a href="https://x.com/IHarbaty" target="_blank" class="hover-effect-link" id="samuel-link">
          Samuel,
        </a>
      </span>
      <span class="hover-effect">
        built by
        <a href="https://x.com/clintonimaroo" target="_blank" class="hover-effect-link" id="clinton-link">
          Clinton
        </a>
      </span>
      <div class="image-container">
        <img src="https://i.postimg.cc/JhY8s78h/Ellipse-82.png" alt="Samuel" id="samuel-image"
          class="footer-image small-image" />
        <div class="tooltip" id="samuel-tooltip">
          <img src="https://i.postimg.cc/3rPQPJYX/Spotify-Primary-Logo-RGB-Green.png" alt="Spotify"
            class="spotify-logo" />
          I'm listening to 🎧: <a href="https://open.spotify.com/album/23csADVrKk0TsKL5z9tqEh" target="_blank"
            class="tooltip-link hover-effect-link">Are You Listening? by Taves</a>
        </div>
      </div>
      <div class="image-container">
        <img src="https://i.postimg.cc/pLVpwTXG/Ellipse-82.png" alt="Clinton" id="clinton-image"
          class="footer-image small-image" />
        <div class="tooltip" id="clinton-tooltip">
          <img src="https://i.postimg.cc/3rPQPJYX/Spotify-Primary-Logo-RGB-Green.png" alt="Spotify"
            class="spotify-logo" />
          I'm listening to 🎧: <a href="https://open.spotify.com/album/23csADVrKk0TsKL5z9tqEh" target="_blank"
            class="tooltip-link hover-effect-link">Lungu Boy by Asake</a>
        </div>
      </div>
    </footer>
    <div v-if="showPeekView" class="peek-view-overlay" @click="closePeekView">
      <div class="peek-view" @click.stop>
        <h2>What is CDMN?</h2>
        <p>CDMN (Custom Decision Model and Notation) is a table format that allows you to describe knowledge about a
          certain domain. This knowledge can then be used to carry out various types of reasoning. It is particularly
          useful for defining and working with rules and logic in a structured manner.</p>
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
  },
  methods: {
    closePeekView() {
      this.showPeekView = false;
    },
    closeInvite() {
      this.showInvite = false;
    },
    toggleTheme() {
      document.body.classList.toggle('dark-mode');
    },
  },
  components: {
    InviteCollaborator
  }
};
</script>

<style>

.image-container {
  display: inline-block;
  -webkit-font-smoothing: inherit;
  transform-origin: 50% 50% 0px;
  transform: none;
  overflow: visible;
  position: relative;
  margin-left: 0px;
}

.tooltip {
  display: none;
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  white-space: nowrap;
  z-index: 10;
  font-size: 14px;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image-container:hover .tooltip {
  display: block;
  opacity: 1;
  transform: translate(-50%, -10px);
}

.image-container:hover img {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.footer-image.small-image {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  border-radius: inherit;
  object-position: center;
  -webkit-font-smoothing: inherit;
  margin-left: 2px;
}

.spotify-logo {
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>