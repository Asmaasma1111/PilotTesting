addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request)) 
})

async function handleRequest(request) {
  // Add CORS headers to allow requests from anywhere
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  
  // Handle OPTIONS request (for CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Only allow POST requests for the actual API call
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers });
  }

  try {
    // Get the request data
    const requestData = await request.json();
    
    // Your Google Gemini API key (will be hidden from users)
    const API_KEY = "AIzaSyBbXah_hCxDd6Vu5tL1PAsoSXZZ2qmnqs4"; // Replace with your real API key
    
    // Forward the request to Google's Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      }
    );
    
    // Return the API response
    const result = await response.json();
    return new Response(JSON.stringify(result), { headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500, 
      headers 
    });
  }
}
