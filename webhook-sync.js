// Webhook handler for syncing Jobcy portal changes
// This should be deployed as a serverless function

const { exec } = require('child_process');
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Verify webhook signature (optional but recommended)
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);
  const secret = process.env.WEBHOOK_SECRET;
  
  if (secret) {
    const expectedSignature = 'sha256=' + crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }
  }

  // Only sync on push to main branch
  if (req.body.ref === 'refs/heads/main') {
    console.log('🔄 Jobcy repo updated, starting sync...');
    
    // Run sync script
    exec('./sync-jobcy-repo.sh', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Sync failed:', error);
        return res.status(500).json({ message: 'Sync failed', error: error.message });
      }
      
      console.log('✅ Sync completed:', stdout);
      return res.status(200).json({ message: 'Sync completed successfully' });
    });
  } else {
    return res.status(200).json({ message: 'No sync needed' });
  }
}
