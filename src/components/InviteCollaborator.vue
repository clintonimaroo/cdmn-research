<template>
    <div class="invite-container">
        <h2>Invite Collaborator</h2>
        <input v-model="email" placeholder="User Email" class="invite-input" />
        <button @click="sendInvitation" class="invite-button">Send Invitation</button>
    </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Resend } from 'resend';

const resend = new Resend(process.env.VUE_APP_RESEND_API_KEY);

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
            const uniqueToken = Math.random().toString(36).substr(2);
            const uniqueUrl = `https://www.cdmn.xyz/join?cdmnId=${this.cdmnId}&token=${uniqueToken}`;
            const emailContent = `
        <p>You have been invited to collaborate on a cDMN table.</p>
        <p>Click <a href="${uniqueUrl}">here</a> to join.</p>
      `;

            try {
                
                await setDoc(doc(collection(db, 'invitations'), uniqueToken), {
                    email: this.email,
                    url: uniqueUrl,
                    timestamp: new Date()
                });

                
                await resend.emails.send({
                    from: 'noreply@cdmn.xyz', 
                    to: this.email,
                    subject: 'Invitation to Collaborate on cDMN Table',
                    html: emailContent
                });

                alert('Invitation sent!');
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