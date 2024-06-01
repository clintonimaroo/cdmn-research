<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
</template>

<script>
export default {
    name: 'InviteCollaborator',
    props: ['cdmnId'],
    data() {
        return {
            email: '',
            errorMessage: ''
        };
    },
    methods: {
        async sendInvitation() {
            if (!this.email || !this.cdmnId) {
                this.errorMessage = 'Email and CDMN ID are required';
                console.error('Email or CDMN ID is missing:', this.email, this.cdmnId);
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

                alert('Invitation sent!');
                this.errorMessage = '';
            } catch (error) {
                console.error('Error sending invitation:', error);
                this.errorMessage = `Failed to send invitation. Please try again. Error: ${error.message}`;
            }
        }
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
