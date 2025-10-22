const http = require('http');

function testServer() {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/jobcy/test-connection',
    method: 'GET'
  };

  console.log('Testing server connection...');
  
  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Server response status:', res.statusCode);
      if (res.statusCode === 200) {
        try {
          const result = JSON.parse(data);
          console.log('✅ Server is working!');
          console.log('Database connection:', result.success ? 'SUCCESS' : 'FAILED');
          if (result.success) {
            console.log('Collections:', result.collections.length);
            console.log('Users:', result.userCount);
          }
        } catch (error) {
          console.log('❌ Server response error:', error.message);
          console.log('Raw response:', data.substring(0, 200));
        }
      } else {
        console.log('❌ Server error:', res.statusCode);
        console.log('Response:', data.substring(0, 200));
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ Connection failed:', error.message);
  });
  
  req.end();
}

testServer();
