import { db } from '../src/firebase.js';
import { getDoc, doc } from 'firebase/firestore';

export default async (req, res) => {
    try {
        const { cdmnId, token } = req.query;

        if (!cdmnId || !token) {
            console.error('Missing cdmnId or token');
            return res.status(400).json({ error: 'Missing cdmnId or token' });
        }

        const inviteDoc = await getDoc(doc(db, 'invitations', token));

        if (!inviteDoc.exists()) {
            console.error('Invalid invitation link');
            return res.status(404).json({ error: 'Invalid invitation link' });
        }

        const inviteData = inviteDoc.data();
        const now = new Date();

        console.log('Invite data:', inviteData);

        if (now > inviteData.expirationTime.toDate()) {
            console.error('Invitation link expired');
            return res.status(400).json({ error: 'This invitation link has expired' });
        }

        res.status(200).json({ message: 'Successfully joined the collaboration!' });
    } catch (error) {
        console.error('Error processing invitation:', error);
        res.status(500).json({ error: 'An error occurred while processing the invitation' });
    }
};
