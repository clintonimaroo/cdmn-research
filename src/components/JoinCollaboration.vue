<template>
    <div>
        <h2>Join Collaboration</h2>
        <p v-if="message">{{ message }}</p>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
export default {
    name: 'JoinCollaboration',
    data() {
        return {
            message: '',
            error: ''
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
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
