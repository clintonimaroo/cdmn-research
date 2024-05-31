<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
        <NotificationMessage v-if="notification.message" :message="notification.message" :type="notification.type" />
    </div>
</template>

<script>
import NotificationMessage from '../components/Notification.vue';

export default {
    name: 'InviteCollaborator',
    components: {
        NotificationMessage,
    },
    props: ['cdmnId'],
    data() {
        return {
            email: '',
            notification: {
                message: '',
                type: '',
            },
        };
    },
    methods: {
        async sendInvitation() {
            try {
                const response = await fetch('/api/sendInvitation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: this.email, cdmnId: this.cdmnId }),
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to send invitation');
                }

                this.notification.message = 'Invitation sent!';
                this.notification.type = 'success';
            } catch (error) {
                this.notification.message = `Failed to send invitation. Please try again. Error: ${error.message}`;
                this.notification.type = 'error';
            }
        },
    },
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
