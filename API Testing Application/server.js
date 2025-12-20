const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Proxy endpoint – fully functioning
app.post('/proxy', async (req, res) => {
  const { url, method = 'GET', headers = {}, body } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios({
      url: url.trim(),
      method: method.toUpperCase(),
      headers: {
        ...headers,
        'User-Agent': 'API-Testing-App/2.0 (+https://your-live-url.com)'  // Avoid blocks
      },
      data: body,
      timeout: 30000,
      maxRedirects: 10,
      validateStatus: () => true  // Never reject – we handle all statuses
    });

    // Forward exact response from target
    res.json({
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data
    });

  } catch (error) {
    // Clear network/timeout errors
    let errorResponse = { error: 'Proxy request failed' };

    if (error.response) {
      // Target returned error status (e.g., 404, 500)
      errorResponse = {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        data: error.response.data || null
      };
    } else if (error.request) {
      // No response received (network issue)
      errorResponse.error = 'No response from target (check URL or network)';
    } else {
      errorResponse.error = error.message || 'Unknown error';
    }

    res.json(errorResponse);
  }
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`API Testing App fully running at http://localhost:${PORT}`);
});