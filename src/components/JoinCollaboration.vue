<template>
    <div>
        <h2>Join Collaboration</h2>
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
            notification: null
        };
    },
    async created() {
        const urlParams = new URLSearchParams(window.location.search);
        const sessionId = urlParams.get('sessionId');
        const token = urlParams.get('token');

        if (sessionId && token) {
            try {
                const response = await fetch(`/api/join?sessionId=${sessionId}&token=${token}`);
                const data = await response.json();
                if (response.ok) {
                    this.notification = { message: data.message, type: 'success' };
                    localStorage.setItem('userSessionId', sessionId);
                    this.$router.push({ name: 'cdmn-table', params: { sessionId } });
                } else {
                    this.notification = { message: data.error, type: 'error' };
                }
            } catch (err) {
                this.notification = { message: 'An error occurred while joining the collaboration. Please try again later.', type: 'error' };
            }
        } else {
            this.notification = { message: 'Invalid join URL.', type: 'error' };
        }
    }
};
</script>

<style scoped>
</style>
