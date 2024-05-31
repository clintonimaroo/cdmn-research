<template>
    <div>
        <h2>Join Collaboration</h2>
        <p v-if="message">{{ message }}</p>
        <p v-if="error">{{ error }}</p>
        <NotificationMessage v-if="notification" :message="notification.message" :type="notification.type" />
    </div>
</template>

<script>
import NotificationMessage from '@/components/Notification.vue';

export default {
    name: 'JoinCollaboration',
    components: { NotificationMessage },
    data() {
        return {
            message: '',
            error: '',
            notification: null
        };
    },
    async created() {
        const urlParams = new URLSearchParams(window.location.search);
        const cdmnId = urlParams.get('cdmnId');
        const token = urlParams.get('token');

        if (cdmnId && token) {
            try {
                const response = await fetch(`/api/join?cdmnId=${cdmnId}&token=${token}`);
                const data = await response.json();
                if (response.ok) {
                    this.message = data.message;
                    this.notification = { message: 'Successfully joined the collaboration!', type: 'success' };
                    this.$router.push({ path: `/cdmn-table/${cdmnId}` });
                } else {
                    this.error = data.error;
                    this.notification = { message: data.error, type: 'error' };
                }
            } catch (err) {
                this.error = 'An error occurred while joining the collaboration. Please try again later.';
                this.notification = { message: 'An error occurred while joining the collaboration. Please try again later.', type: 'error' };
            }
        } else {
            this.error = 'Invalid join URL.';
            this.notification = { message: 'Invalid join URL.', type: 'error' };
        }
    }
};
</script>