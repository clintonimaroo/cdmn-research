import { db } from '../src/firebase.js';
import { getDoc, doc } from 'firebase/firestore';

export default async (req, res) => {
    try {
        const { cdmnId, token, sessionId } = req.query;

        if (!cdmnId || !token || !sessionId) {
            return res.status(400).json({ error: 'Missing cdmnId, token or sessionId' });
        }

        const inviteDoc = await getDoc(doc(db, 'invitations', token));

        if (!inviteDoc.exists()) {
            return res.status(404).json({ error: 'Invalid invitation link' });
        }

        const inviteData = inviteDoc.data();
        const now = new Date();

        if (now > inviteData.expirationTime.toDate()) {
            return res.status(400).json({ error: 'This invitation link has expired' });
        }

        res.status(200).json({ message: 'Successfully joined the collaboration!', sessionId });
    } catch (error) {
        console.error('Error processing invitation:', error);
        res.status(500).json({ error: 'An error occurred while processing the invitation' });
    }
};
