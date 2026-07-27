const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { title, body, category } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const categoryLabels = {
      matokeo: '📋 Matokeo',
      taarifa: '📢 Taarifa',
      notes: '📝 Notes',
      vipimo: '🧪 Vipimo',
      mengineyo: '📌 Mengineyo'
    };

    const heading = categoryLabels[category] || '📚 Shuleka';

    const message = {
      notification: {
        title: heading,
        body: title,
      },
      data: {
        title: title,
        body: body || '',
        category: category || ''
      },
      topic: 'all_users',
      android: {
        notification: {
          channel_id: 'shuleka_notifications',
          click_action: 'OPENMainActivity'
        }
      }
    };

    const response = await admin.messaging().send(message);
    
    return res.status(200).json({ 
      success: true, 
      messageId: response,
      message: 'Notification sent successfully'
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};
