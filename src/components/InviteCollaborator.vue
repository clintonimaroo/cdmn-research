<template>
    <div>
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" />
        <button @click="sendInvitation">Send Invitation</button>
    </div>
</template>

<script>
export default {
    name: 'InviteCollaborator',
    props: ['cdmnId'],
    data() {
        return {
            email: ''
        };
    },
    methods: {
        async sendInvitation() {
            if (!this.email || !this.cdmnId) {
                console.error(`Email or CDMN ID is missing: ${this.email} ${this.cdmnId}`);
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
            } catch (error) {
                console.error('Error sending invitation:', error);
                alert(`Failed to send invitation. Please try again. Error: ${error.message}`);
            }
        }
    },
    mounted() {
        console.log(`InviteCollaborator mounted with cdmnId: ${this.cdmnId}`);
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>
