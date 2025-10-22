const fetch = require('node-fetch');

async function testAPIRoutes() {
  console.log('🔍 Testing Jobcy API Routes...\n');
  
  const baseUrl = 'http://localhost:3000';
  
  // Test basic routes
  const routes = [
    '/api/jobcy/test',
    '/api/jobcy/simple', 
    '/api/jobcy/jobs',
    '/api/jobcy/users',
    '/api/jobcy/admin/stats',
    '/api/jobcy/hr/applications',
    '/api/jobcy/company/dashboard',
    '/api/jobcy/user/notifications',
    '/api/jobcy/connections/connections',
    '/api/jobcy/chat/chats'
  ];
  
  for (const route of routes) {
    try {
      console.log(`Testing ${route}...`);
      const response = await fetch(`${baseUrl}${route}`);
      const data = await response.json();
      console.log(`✅ ${route} - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${route} - Error: ${error.message}`);
    }
  }
  
  console.log('\n🎯 API Routes test completed!');
}

testAPIRoutes();
