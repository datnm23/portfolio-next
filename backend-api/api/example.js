// Example API route - Replace with your actual API logic
export default async function handler(req, res) {
  // Enable CORS for your GitHub Pages domain
  res.setHeader('Access-Control-Allow-Origin', 'https://datnm23.github.io');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Your secure API logic here
    // Access environment variables securely
    const apiKey = process.env.API_KEY; // This stays on the server!

    // Example: Make external API call
    // const response = await fetch('https://api.example.com/data', {
    //   headers: { 'Authorization': `Bearer ${apiKey}` }
    // });
    // const data = await response.json();

    res.status(200).json({
      message: 'API working!',
      data: 'Your secure data here'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
