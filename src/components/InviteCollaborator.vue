<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
        <NotificationMessage v-if="notification" :message="notification.message" :type="notification.type" />
    </div>
</template>

<script>
import NotificationMessage from '@/components/Notification.vue';

export default {
    name: 'InviteCollaborator',
    props: ['cdmnId'],
    components: { NotificationMessage },
    data() {
        return {
            email: '',
            notification: null
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

                this.notification = { message: 'Invitation sent!', type: 'success' };
            } catch (error) {
                console.error('Error sending invitation:', error);
                this.notification = { message: `Failed to send invitation. Please try again. Error: ${error.message}`, type: 'error' };
            }
        }
    }
};
</script>