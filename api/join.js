import { db } from '../src/firebase.js';
import { collection, doc, getDoc } from 'firebase/firestore';

export default async (req, res) => {
    if (req.method === 'GET') {
        const { cdmnId, token } = req.query;

        if (!cdmnId || !token) {
            return res.status(400).json({ error: 'Missing cdmnId or token' });
        }

        try {
            const docRef = doc(collection(db, 'invitations'), token);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                return res.status(400).json({ error: 'Invalid token' });
            }

            res.status(200).json({ message: 'Successfully joined the collaboration!' });
        } catch (error) {
            console.error('Error joining collaboration:', error);
            res.status(500).json({ error: 'An error occurred while joining the collaboration. Please try again later.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
};
