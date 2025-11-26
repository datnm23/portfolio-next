// Contact form API - Example for sending emails
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://datnm23.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Add your email service integration here
    // Example: SendGrid, Resend, Nodemailer with Gmail, etc.
    // const emailService = process.env.EMAIL_API_KEY;

    console.log('Contact form submission:', { name, email, message });

    res.status(200).json({
      success: true,
      message: 'Message received!'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
