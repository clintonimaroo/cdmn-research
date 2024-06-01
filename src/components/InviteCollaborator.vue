<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
        <NotificationMessage v-if="notificationMessage" :message="notificationMessage.message"
            :type="notificationMessage.type" />
    </div>
</template>

<script>
import NotificationMessage from '../components/Notification.vue';

export default {
    name: 'InviteCollaborator',
    components: {
        NotificationMessage
    },
    props: ['cdmnId'],
    data() {
        return {
            email: '',
            notificationMessage: null
        };
    },
    methods: {
        async sendInvitation() {
            if (!this.email || !this.cdmnId) {
                console.error('Email or CDMN ID is missing:', this.email, this.cdmnId);
                this.notificationMessage = {
                    message: 'Email or CDMN ID is missing',
                    type: 'error'
                };
                return;
            }
            try {
                const response = await fetch('/api/sendInvitation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: this.email, cdmnId: this.cdmnId })
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to send invitation');
                }

                this.notificationMessage = {
                    message: 'Invitation sent!',
                    type: 'success'
                };
            } catch (error) {
                console.error('Error sending invitation:', error);
                this.notificationMessage = {
                    message: `Failed to send invitation. Please try again. Error: ${error.message}`,
                    type: 'error'
                };
            }
        }
    },
    mounted() {
        console.log('InviteCollaborator mounted with cdmnId:', this.cdmnId);
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
