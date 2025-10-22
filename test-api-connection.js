const http = require('http');

function testAPI() {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/jobcy/test-connection',
    method: 'GET'
  };

  console.log('Testing API connection...');
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.success) {
          console.log('✅ API connection successful');
          console.log('📊 Collections:', result.collections);
          console.log('👥 Users in database:', result.userCount);
        } else {
          console.log('❌ API connection failed:', result.error);
        }
      } catch (error) {
        console.log('❌ Failed to parse API response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ API request failed:', error.message);
  });
  
  req.end();
}

// Wait a moment for server to start, then test
setTimeout(testAPI, 2000);
