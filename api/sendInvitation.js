import { Resend } from 'resend';
import { db } from '../../src/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
    if (req.method === 'POST') {
        const { email, cdmnId } = req.body;

        const uniqueToken = Math.random().toString(36).substr(2);
        const uniqueUrl = `https://www.cdmn.xyz/join?cdmnId=${cdmnId}&token=${uniqueToken}`;
        const emailContent = `
      <p>You have been invited to collaborate on a cDMN table.</p>
      <p>Click <a href="${uniqueUrl}">here</a> to join.</p>
    `;

        try {
            
            await setDoc(doc(collection(db, 'invitations'), uniqueToken), {
                email,
                url: uniqueUrl,
                timestamp: new Date()
            });

            await resend.emails.send({
                from: 'noreply@cdmn.xyz', 
                to: email,
                subject: 'Invitation to Collaborate on cDMN Table',
                html: emailContent
            });

            res.status(200).json({ message: 'Invitation sent!' });
        } catch (error) {
            console.error('Error sending invitation:', error);
            res.status(500).json({ error: 'Failed to send invitation. Please try again.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
