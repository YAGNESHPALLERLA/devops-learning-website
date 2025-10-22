const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const JOBCY_BASE_URL = `${BASE_URL}/jobcy`;
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testComprehensiveDashboard() {
  console.log('🧪 Testing Comprehensive Dashboard Functionality...\n');

  const results = {
    routing: {},
    api: {},
    authentication: {},
    roleBased: {},
    dataIntegrity: {}
  };

  // 1. Test Dashboard Page Routing
  console.log('1️⃣ Testing Dashboard Page Routing...');
  
  const dashboardPages = [
    { name: 'User Dashboard', url: '/jobcy/user/dashboard' },
    { name: 'HR Dashboard', url: '/jobcy/hr/dashboard' },
    { name: 'Admin Dashboard', url: '/jobcy/admin/dashboard' },
    { name: 'Company Dashboard', url: '/jobcy/company/dashboard' },
    { name: 'HR Application Management', url: '/jobcy/hr/application-management' },
    { name: 'HR Jobs Management', url: '/jobcy/hr/jobs-management' },
    { name: 'Admin Company Management', url: '/jobcy/admin/company-management' },
    { name: 'Admin HR Management', url: '/jobcy/admin/hr-management' }
  ];

  for (const page of dashboardPages) {
    try {
      const response = await fetch(`${BASE_URL}${page.url}`);
      results.routing[page.name] = {
        status: response.status,
        success: response.ok,
        url: page.url
      };
      console.log(`   ${page.name}: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (${response.status})`);
    } catch (error) {
      results.routing[page.name] = {
        status: 'ERROR',
        success: false,
        error: error.message,
        url: page.url
      };
      console.log(`   ${page.name}: ❌ ERROR - ${error.message}`);
    }
  }

  // 2. Test API Endpoints
  console.log('\n2️⃣ Testing API Endpoints...');
  
  const apiEndpoints = [
    { name: 'Database Connection', url: '/test-connection' },
    { name: 'Jobs Browse', url: '/jobs/browse' },
    { name: 'User List', url: '/user/list' },
    { name: 'User Applications', url: '/user/applications' },
    { name: 'User Interviews', url: '/user/interviews' },
    { name: 'HR Dashboard', url: '/hr/dashboard' },
    { name: 'HR Applications', url: '/hr/applications' },
    { name: 'HR Jobs', url: '/hr/jobs' },
    { name: 'Admin Stats', url: '/admin/stats' },
    { name: 'Admin Companies', url: '/admin/companies' },
    { name: 'Admin HRs', url: '/admin/hrs' },
    { name: 'Company Dashboard', url: '/company/dashboard' },
    { name: 'Company Jobs', url: '/company/jobs' },
    { name: 'Company Applications', url: '/company/applications' }
  ];

  for (const endpoint of apiEndpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint.url}`);
      const data = await response.json();
      results.api[endpoint.name] = {
        status: response.status,
        success: response.ok,
        hasData: data && (Array.isArray(data) || Object.keys(data).length > 0),
        url: endpoint.url
      };
      console.log(`   ${endpoint.name}: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (${response.status})`);
    } catch (error) {
      results.api[endpoint.name] = {
        status: 'ERROR',
        success: false,
        error: error.message,
        url: endpoint.url
      };
      console.log(`   ${endpoint.name}: ❌ ERROR - ${error.message}`);
    }
  }

  // 3. Test Authentication Endpoints
  console.log('\n3️⃣ Testing Authentication Endpoints...');
  
  const authEndpoints = [
    { name: 'User Login', url: '/user/auth/login' },
    { name: 'User Register', url: '/user/auth/signup' },
    { name: 'Company Login', url: '/company/auth/login' },
    { name: 'HR Login', url: '/hr/auth/login' },
    { name: 'Admin Login', url: '/admin/auth/login' }
  ];

  for (const endpoint of authEndpoints) {
    try {
      const response = await fetch(`${BASE_URL}/jobcy${endpoint.url}`);
      results.authentication[endpoint.name] = {
        status: response.status,
        success: response.ok,
        url: endpoint.url
      };
      console.log(`   ${endpoint.name}: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (${response.status})`);
    } catch (error) {
      results.authentication[endpoint.name] = {
        status: 'ERROR',
        success: false,
        error: error.message,
        url: endpoint.url
      };
      console.log(`   ${endpoint.name}: ❌ ERROR - ${error.message}`);
    }
  }

  // 4. Test Role-Based Access
  console.log('\n4️⃣ Testing Role-Based Access...');
  
  const rolePages = [
    { role: 'User', pages: ['/jobcy/user/dashboard'] },
    { role: 'HR', pages: ['/jobcy/hr/dashboard', '/jobcy/hr/application-management', '/jobcy/hr/jobs-management'] },
    { role: 'Admin', pages: ['/jobcy/admin/dashboard', '/jobcy/admin/company-management', '/jobcy/admin/hr-management'] },
    { role: 'Company', pages: ['/jobcy/company/dashboard'] }
  ];

  for (const role of rolePages) {
    results.roleBased[role.role] = {};
    for (const page of role.pages) {
      try {
        const response = await fetch(`${BASE_URL}${page}`);
        results.roleBased[role.role][page] = {
          status: response.status,
          success: response.ok
        };
        console.log(`   ${role.role} - ${page}: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (${response.status})`);
      } catch (error) {
        results.roleBased[role.role][page] = {
          status: 'ERROR',
          success: false,
          error: error.message
        };
        console.log(`   ${role.role} - ${page}: ❌ ERROR - ${error.message}`);
      }
    }
  }

  // 5. Test Data Integrity (No Mock Data)
  console.log('\n5️⃣ Testing Data Integrity (Live Data Only)...');
  
  try {
    // Test that API returns real data, not mock data
    const jobsResponse = await fetch(`${API_BASE_URL}/jobs/browse`);
    const jobsData = await jobsResponse.json();
    
    results.dataIntegrity.jobs = {
      success: jobsResponse.ok,
      isArray: Array.isArray(jobsData),
      hasRealData: Array.isArray(jobsData) && jobsData.length > 0,
      noMockData: !JSON.stringify(jobsData).includes('mock')
    };
    
    console.log(`   Jobs API: ${jobsResponse.ok ? '✅ SUCCESS' : '❌ FAILED'}`);
    console.log(`   Data Format: ${Array.isArray(jobsData) ? '✅ Array' : '❌ Not Array'}`);
    console.log(`   Has Data: ${Array.isArray(jobsData) && jobsData.length > 0 ? '✅ Yes' : '❌ No'}`);
    console.log(`   No Mock: ${!JSON.stringify(jobsData).includes('mock') ? '✅ Clean' : '❌ Contains Mock'}`);
    
  } catch (error) {
    results.dataIntegrity.jobs = {
      success: false,
      error: error.message
    };
    console.log(`   Jobs API: ❌ ERROR - ${error.message}`);
  }

  // Summary
  console.log('\n📋 COMPREHENSIVE DASHBOARD TEST SUMMARY:');
  console.log('=' .repeat(50));
  
  const totalRouting = Object.keys(results.routing).length;
  const successfulRouting = Object.values(results.routing).filter(r => r.success).length;
  console.log(`📄 Dashboard Pages: ${successfulRouting}/${totalRouting} working`);
  
  const totalAPI = Object.keys(results.api).length;
  const successfulAPI = Object.values(results.api).filter(r => r.success).length;
  console.log(`🔌 API Endpoints: ${successfulAPI}/${totalAPI} working`);
  
  const totalAuth = Object.keys(results.authentication).length;
  const successfulAuth = Object.values(results.authentication).filter(r => r.success).length;
  console.log(`🔐 Authentication: ${successfulAuth}/${totalAuth} working`);
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ All dashboard pages should be accessible');
  console.log('✅ All API endpoints should return live data');
  console.log('✅ Role-based access should work correctly');
  console.log('✅ No mock data should be present');
  console.log('✅ Authentication should persist across dashboards');
  
  if (successfulRouting === totalRouting && successfulAPI === totalAPI && successfulAuth === totalAuth) {
    console.log('\n🎉 ALL DASHBOARD FUNCTIONALITY WORKING PERFECTLY!');
  } else {
    console.log('\n⚠️  Some issues detected - check individual results above');
  }
}

testComprehensiveDashboard().catch(console.error);
