<template>
    <div>
        <h2>Join Collaboration</h2>
        ```vue
        <notification-message v-if="message" :message="message" type="success" />
        <notification-message v-if="error" :message="error" type="error" />
    </div>
</template>

<script>
import NotificationMessage from '../components/Notification.vue';

export default {
    name: 'JoinCollaboration',
    components: {
        NotificationMessage,
    },
    data() {
        return {
            message: '',
            error: '',
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
                    this.$router.push({ path: `/cdmn-table/${cdmnId}` });
                } else {
                    this.error = data.error;
                }
            } catch (err) {
                this.error = 'An error occurred while joining the collaboration. Please try again later.';
            }
        } else {
            this.error = 'Invalid join URL.';
        }
    },
};
</script>

<style scoped>
</style>
