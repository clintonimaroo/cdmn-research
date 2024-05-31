<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
        <notification-message v-if="notification.message" :message="notification.message" :type="notification.type"
            :duration="notification.duration">
            <template v-slot:icon>
                <span v-if="notification.type === 'success'">✔️</span>
                <span v-if="notification.type === 'error'">❌</span>
            </template>
        </notification-message>
    </div>
</template>

<script>
import NotificationMessage from '../components/Notification.vue';

export default {
    name: 'InviteCollaborator',
    props: ['cdmnId'],
    data() {
        return {
            email: '',
            notification: {
                message: '',
                type: '',
                duration: 5000
            }
        };
    },
    methods: {
        async sendInvitation() {
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

                this.showNotification('Invitation sent!', 'success');
            } catch (error) {
                console.error('Error sending invitation:', error);
                this.showNotification(`Failed to send invitation. Please try again. Error: ${error.message}`, 'error');
            }
        },
        showNotification(message, type) {
            this.notification.message = message;
            this.notification.type = type;
            this.notification.duration = 5000;
        }
    },
    components: {
        NotificationMessage
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
