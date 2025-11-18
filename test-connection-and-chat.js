/**
 * Test script to verify two users can:
 * 1. Register/Login as two separate users
 * 2. Send connection request from User1 to User2
 * 3. Accept connection request by User2
 * 4. Verify they appear in each other's connected list
 * 5. Create/open chat between them
 * 6. Send messages between them
 * 7. Verify messages are received
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const API_BASE = `${BASE_URL}/api/jobcy`;

// Test users
let user1 = {
  name: 'Test User 1',
  email: `testuser1_${Date.now()}@test.com`,
  password: 'Test@123456',
  token: null,
  id: null
};

let user2 = {
  name: 'Test User 2',
  email: `testuser2_${Date.now()}@test.com`,
  password: 'Test@123456',
  token: null,
  id: null
};

let connectionRequestId = null;
let chatId = null;

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token && { Authorization: `Bearer ${options.token}` }),
      ...options.headers
    }
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers
    }
  });

  const data = await response.json().catch(() => ({}));
  return { response, data, status: response.status };
}

// Test functions
async function testUserRegistration(user) {
  console.log(`\n📝 Registering ${user.name}...`);
  const { response, data } = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      role: 'user'
    })
  });

  if (response.ok) {
    user.token = data.token;
    user.id = data.user?.id || data.user?._id;
    console.log(`✅ ${user.name} registered successfully`);
    console.log(`   User ID: ${user.id}`);
    return true;
  } else {
    console.log(`❌ Registration failed: ${data.error || data.message}`);
    return false;
  }
}

async function testUserLogin(user) {
  console.log(`\n🔐 Logging in ${user.name}...`);
  const { response, data } = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  });

  if (response.ok) {
    user.token = data.token;
    user.id = data.user?.id || data.user?._id;
    console.log(`✅ ${user.name} logged in successfully`);
    console.log(`   User ID: ${user.id}`);
    return true;
  } else {
    console.log(`❌ Login failed: ${data.error || data.message}`);
    return false;
  }
}

async function testSendConnectionRequest(fromUser, toUser) {
  console.log(`\n📤 ${fromUser.name} sending connection request to ${toUser.name}...`);
  const { response, data } = await apiCall('/connections/send', {
    method: 'POST',
    token: fromUser.token,
    body: JSON.stringify({
      toUserId: toUser.id
    })
  });

  if (response.ok) {
    connectionRequestId = data.connection?.id || data.connection?._id;
    console.log(`✅ Connection request sent successfully`);
    console.log(`   Request ID: ${connectionRequestId}`);
    return true;
  } else {
    console.log(`❌ Failed to send connection request: ${data.error || data.message}`);
    return false;
  }
}

async function testGetReceivedRequests(user) {
  console.log(`\n📥 Fetching connection requests for ${user.name}...`);
  const { response, data } = await apiCall('/connections/received', {
    method: 'GET',
    token: user.token
  });

  if (response.ok) {
    console.log(`✅ Found ${data.length} connection request(s)`);
    if (data.length > 0) {
      console.log(`   Requests:`, data.map(r => ({
        id: r._id,
        from: r.sender?.name,
        message: r.message
      })));
      return data;
    }
    return [];
  } else {
    console.log(`❌ Failed to fetch requests: ${data.error || data.message}`);
    return [];
  }
}

async function testAcceptConnectionRequest(user, requestId) {
  console.log(`\n✅ ${user.name} accepting connection request...`);
  const { response, data } = await apiCall(`/connections/${requestId}/accept`, {
    method: 'PUT',
    token: user.token
  });

  if (response.ok) {
    console.log(`✅ Connection request accepted successfully`);
    return true;
  } else {
    console.log(`❌ Failed to accept request: ${data.error || data.message}`);
    return false;
  }
}

async function testGetConnectedUsers(user) {
  console.log(`\n👥 Fetching connected users for ${user.name}...`);
  const { response, data } = await apiCall('/connections/connections', {
    method: 'GET',
    token: user.token
  });

  if (response.ok) {
    console.log(`✅ Found ${data.length} connected user(s)`);
    if (data.length > 0) {
      console.log(`   Connected users:`, data.map(u => ({
        id: u.id,
        name: u.name,
        title: u.title
      })));
    }
    return data;
  } else {
    console.log(`❌ Failed to fetch connections: ${data.error || data.message}`);
    return [];
  }
}

async function testCreateOrGetChat(user1, user2) {
  console.log(`\n💬 Creating/getting chat between ${user1.name} and ${user2.name}...`);
  const { response, data } = await apiCall(`/chat/chat/${user2.id}`, {
    method: 'GET',
    token: user1.token
  });

  if (response.ok) {
    chatId = data.chat?.id || data.chat?._id;
    console.log(`✅ Chat found/created successfully`);
    console.log(`   Chat ID: ${chatId}`);
    console.log(`   Participants:`, data.chat?.participants?.map(p => p.name));
    return data.chat;
  } else {
    console.log(`❌ Failed to create/get chat: ${data.error || data.message}`);
    return null;
  }
}

async function testSendMessage(user, chatId, message) {
  console.log(`\n📨 ${user.name} sending message: "${message}"...`);
  const { response, data } = await apiCall(`/chat/messages/${chatId}`, {
    method: 'POST',
    token: user.token,
    body: JSON.stringify({
      content: message
    })
  });

  if (response.ok) {
    console.log(`✅ Message sent successfully`);
    console.log(`   Message ID: ${data.message?.id || data.message?._id}`);
    return data.message;
  } else {
    console.log(`❌ Failed to send message: ${data.error || data.message}`);
    return null;
  }
}

async function testGetMessages(user, chatId) {
  console.log(`\n📬 Fetching messages for ${user.name}...`);
  const { response, data } = await apiCall(`/chat/messages/${chatId}`, {
    method: 'GET',
    token: user.token
  });

  if (response.ok) {
    console.log(`✅ Found ${data.messages?.length || 0} message(s)`);
    if (data.messages && data.messages.length > 0) {
      console.log(`   Messages:`);
      data.messages.forEach((msg, idx) => {
        console.log(`   ${idx + 1}. [${msg.sender?.name}]: ${msg.content}`);
      });
    }
    return data.messages || [];
  } else {
    console.log(`❌ Failed to fetch messages: ${data.error || data.message}`);
    return [];
  }
}

// Main test flow
async function runTests() {
  console.log('🚀 Starting Connection and Chat Test Suite\n');
  console.log('='.repeat(60));

  let allTestsPassed = true;

  // Step 1: Register/Login User1
  console.log('\n📋 STEP 1: User Registration/Login');
  console.log('-'.repeat(60));
  const user1Registered = await testUserRegistration(user1);
  if (!user1Registered) {
    // Try login if registration fails (user might already exist)
    const user1LoggedIn = await testUserLogin(user1);
    if (!user1LoggedIn) {
      console.log('❌ Cannot proceed without User1 authentication');
      return;
    }
  }

  // Step 2: Register/Login User2
  const user2Registered = await testUserRegistration(user2);
  if (!user2Registered) {
    // Try login if registration fails
    const user2LoggedIn = await testUserLogin(user2);
    if (!user2LoggedIn) {
      console.log('❌ Cannot proceed without User2 authentication');
      return;
    }
  }

  // Step 3: User1 sends connection request to User2
  console.log('\n📋 STEP 2: Connection Request');
  console.log('-'.repeat(60));
  const requestSent = await testSendConnectionRequest(user1, user2);
  if (!requestSent) {
    allTestsPassed = false;
    console.log('⚠️  Continuing with remaining tests...');
  }

  // Step 4: User2 fetches received requests
  console.log('\n📋 STEP 3: Fetch Connection Requests');
  console.log('-'.repeat(60));
  const requests = await testGetReceivedRequests(user2);
  if (requests.length === 0 && requestSent) {
    console.log('⚠️  No requests found, but request was sent. Waiting 1 second...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    const requestsRetry = await testGetReceivedRequests(user2);
    if (requestsRetry.length > 0) {
      connectionRequestId = requestsRetry[0]._id;
    }
  } else if (requests.length > 0) {
    connectionRequestId = requests[0]._id;
  }

  // Step 5: User2 accepts connection request
  if (connectionRequestId) {
    console.log('\n📋 STEP 4: Accept Connection Request');
    console.log('-'.repeat(60));
    const accepted = await testAcceptConnectionRequest(user2, connectionRequestId);
    if (!accepted) {
      allTestsPassed = false;
    }
  } else {
    console.log('⚠️  No connection request ID found, skipping accept test');
    allTestsPassed = false;
  }

  // Step 6: Verify connections appear in both users' lists
  console.log('\n📋 STEP 5: Verify Connections');
  console.log('-'.repeat(60));
  const user1Connections = await testGetConnectedUsers(user1);
  const user2Connections = await testGetConnectedUsers(user2);
  
  const user1HasUser2 = user1Connections.some(c => c.id === user2.id || c.id?.toString() === user2.id?.toString());
  const user2HasUser1 = user2Connections.some(c => c.id === user1.id || c.id?.toString() === user1.id?.toString());
  
  if (user1HasUser2 && user2HasUser1) {
    console.log('✅ Both users can see each other in connected list');
  } else {
    console.log('❌ Connection verification failed');
    console.log(`   User1 has User2: ${user1HasUser2}`);
    console.log(`   User2 has User1: ${user2HasUser1}`);
    allTestsPassed = false;
  }

  // Step 7: Create/Get chat
  console.log('\n📋 STEP 6: Create/Get Chat');
  console.log('-'.repeat(60));
  const chat = await testCreateOrGetChat(user1, user2);
  if (!chat) {
    allTestsPassed = false;
  }

  // Step 8: User1 sends a message
  if (chatId) {
    console.log('\n📋 STEP 7: Send Messages');
    console.log('-'.repeat(60));
    const message1 = await testSendMessage(user1, chatId, 'Hello from User1! 👋');
    if (!message1) {
      allTestsPassed = false;
    }

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));

    // User2 sends a message
    const message2 = await testSendMessage(user2, chatId, 'Hi User1! Nice to connect! 😊');
    if (!message2) {
      allTestsPassed = false;
    }

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 500));

    // Step 9: Verify messages
    console.log('\n📋 STEP 8: Verify Messages');
    console.log('-'.repeat(60));
    const user1Messages = await testGetMessages(user1, chatId);
    const user2Messages = await testGetMessages(user2, chatId);

    if (user1Messages.length >= 2 && user2Messages.length >= 2) {
      console.log('✅ Both users can see all messages');
    } else {
      console.log('❌ Message verification failed');
      console.log(`   User1 messages: ${user1Messages.length}`);
      console.log(`   User2 messages: ${user2Messages.length}`);
      allTestsPassed = false;
    }
  }

  // Final summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  if (allTestsPassed) {
    console.log('✅ All tests passed! Connection and chat functionality is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the output above for details.');
  }
  console.log('\n');
}

// Run tests
if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  global.fetch = fetch;
  runTests().catch(console.error);
} else {
  // Browser environment
  runTests().catch(console.error);
}

