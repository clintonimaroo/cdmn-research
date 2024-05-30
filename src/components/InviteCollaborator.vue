<template>
    <div class="invite-container">
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" class="invite-input" />
        <button @click="sendInvitation" class="invite-button">Send Invitation</button>
    </div>
</template>

<script>
export default {
    props: {
        cdmnId: {
            type: String,
            required: true
        }
    },
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

                if (response.ok) {
                    const data = await response.json();
                    alert(data.message);
                } else {
                    const error = await response.json();
                    throw new Error(error.error);
                }
            } catch (error) {
                console.error('Error sending invitation:', error);
                alert(`Failed to send invitation. Please try again. Error: ${error.message}`);
            }

            this.email = ''; 
        }
    }
};
</script>

<style scoped>
.invite-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.invite-input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    box-sizing: border-box;
}

.invite-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #42b983;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.invite-button:hover {
    background-color: #369b6e;
}
</style>
