// Test script to verify connections API is working
const testConnectionsAPI = async () => {
  try {
    console.log('Testing connections API...');
    
    // Get token from localStorage (you'll need to run this in browser console)
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please login first.');
      return;
    }
    
    console.log('Token found, testing API...');
    
    // Test connections API
    const response = await fetch('/api/jobcy/connections/connections', {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Connections data:', data);
      console.log('Number of connections:', data.length);
      
      if (data.length > 0) {
        console.log('First connection:', data[0]);
        console.log('User name:', data[0].name);
        console.log('User title:', data[0].title);
      } else {
        console.log('No connections found');
      }
    } else {
      const error = await response.text();
      console.error('API Error:', error);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
};

// Run the test
testConnectionsAPI();
