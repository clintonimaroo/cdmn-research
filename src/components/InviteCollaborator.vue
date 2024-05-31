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
    }
};
</script>

<style scoped>
.error {
    color: red;
    margin-top: 10px;
}
</style>