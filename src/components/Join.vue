<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="join-container">
        <h2>Join Collaboration</h2>
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <p>You have successfully joined the collaboration!</p>

        </div>
    </div>
</template>

<script>
import { db } from '@/firebase';

export default {
    data() {
        return {
            loading: true,
            error: null,
        };
    },
    async created() {
        const queryParams = new URLSearchParams(window.location.search);
        const cdmnId = queryParams.get('cdmnId');
        const token = queryParams.get('token');

        if (!cdmnId || !token) {
            this.error = 'Invalid or missing collaboration details.';
            this.loading = false;
            return;
        }

        try {
            const invitationDoc = await db.collection('invitations').doc(token).get();
            if (!invitationDoc.exists) {
                this.error = 'Invalid or expired invitation token.';
            } else {
                // Handle the successful joining of the collaboration
                // e.g., Load the CDMN table data and initialize the collaboration session
            }
        } catch (err) {
            console.error('Error joining collaboration:', err);
            this.error = 'An error occurred while joining the collaboration. Please try again later.';
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.join-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.join-container h2 {
    margin-bottom: 20px;
}

.join-container p {
    margin-bottom: 10px;
}
</style>