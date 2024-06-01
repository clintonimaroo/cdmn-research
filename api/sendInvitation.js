import { Resend } from 'resend';
import { db } from '../src/firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, cdmnId } = req.body;

    if (!email || !cdmnId) {
      return res.status(400).json({ error: 'Email and cdmnId are required' });
    }

    const uniqueToken = Math.random().toString(36).substr(2);
    const uniqueUrl = `https://www.cdmn.xyz/join?cdmnId=${cdmnId}&token=${uniqueToken}`;
    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 24); // Link expires in 24 hours

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invitation to Collaborate on CDMN Table</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background-color: #000000;
            color: #ffffff;
            text-color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 20px;
            text-align: left;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            text-color: #ffffff;
            background-color: #000000;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            text-align: center;
          }
          .footer {
            background-color: #f1f1f1;
            color: #555555;
            padding: 10px;
            text-align: center;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Invitation to Collaborate</h1>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have been invited to collaborate on a CDMN (Custom Decision Model and Notation) table.</p>
            <p>This invitation is valid until ${expirationTime.toLocaleString()}.</p>
            <p>Click the button below to join the collaboration and start working together:</p>
            <a href="${uniqueUrl}" class="button">Accept Collaboration</a>
            <p>If the button above does not work, copy and paste the following URL into your browser:</p>
            <p><a href="${uniqueUrl}">${uniqueUrl}</a></p>
            <p>Thank you,</p>
            <p>The CDMN Team</p>
          </div>
          <div class="footer">
            <p>SmartKlass™ | All Rights Reserved | Copyright 2024</p>
          </div>
        </div>
      </body>
      </html>
    `;

    try {
      await setDoc(doc(collection(db, 'invitations'), uniqueToken), {
        email,
        url: uniqueUrl,
        cdmnId,
        timestamp: new Date(),
        expirationTime: expirationTime
      });

      await resend.emails.send({
        from: 'CDMN Invitations <noreply@cdmn.xyz>',
        to: email,
        subject: 'Invitation to Collaborate on CDMN Table',
        html: emailContent
      });

      res.status(200).json({ message: 'Invitation sent!' });
    } catch (error) {
      console.error('Error sending invitation:', error);
      res.status(500).json({ error: 'Failed to send invitation. Please try again.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
};