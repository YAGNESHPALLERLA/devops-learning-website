"use client";

import { useState, useEffect } from 'react';

export default function TestEnvironmentPage() {
  const [testResults, setTestResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const runTests = async () => {
    setIsLoading(true);
    const results: any = {};

    try {
      // Test 1: Database Connection
      console.log('Testing database connection...');
      const dbResponse = await fetch('/api/jobcy/test-connection');
      const dbData = await dbResponse.json();
      results.database = {
        status: dbResponse.status,
        success: dbData.success,
        collections: dbData.collections?.length || 0,
        userCount: dbData.userCount || 0
      };

      // Test 2: Jobs API
      console.log('Testing jobs API...');
      const jobsResponse = await fetch('/api/jobcy/jobs/browse');
      const jobsData = await jobsResponse.json();
      results.jobs = {
        status: jobsResponse.status,
        isArray: Array.isArray(jobsData),
        count: Array.isArray(jobsData) ? jobsData.length : 0
      };

      // Test 3: User List API
      console.log('Testing user list API...');
      const usersResponse = await fetch('/api/jobcy/user/list');
      const usersData = await usersResponse.json();
      results.users = {
        status: usersResponse.status,
        isArray: Array.isArray(usersData),
        count: Array.isArray(usersData) ? usersData.length : 0
      };

      // Test 4: Environment Variables Check
      results.environment = {
        nodeEnv: process.env.NODE_ENV,
        apiUrl: process.env.NEXT_PUBLIC_API_URL,
        socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL
      };

    } catch (error) {
      results.error = error.message;
    }

    setTestResults(results);
    setIsLoading(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔧 Environment Test Page
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'Not set'}
            </div>
            <div>
              <strong>API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL || 'Not set'}
            </div>
            <div>
              <strong>Socket URL:</strong> {process.env.NEXT_PUBLIC_SOCKET_URL || 'Not set'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">API Tests</h2>
          {isLoading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2">Running tests...</p>
            </div>
          ) : testResults ? (
            <div className="space-y-4">
              {/* Database Test */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Database Connection</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Status: <span className={testResults.database?.status === 200 ? 'text-green-600' : 'text-red-600'}>{testResults.database?.status}</span></div>
                  <div>Success: <span className={testResults.database?.success ? 'text-green-600' : 'text-red-600'}>{testResults.database?.success ? 'Yes' : 'No'}</span></div>
                  <div>Collections: {testResults.database?.collections}</div>
                  <div>Users: {testResults.database?.userCount}</div>
                </div>
              </div>

              {/* Jobs API Test */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Jobs API</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Status: <span className={testResults.jobs?.status === 200 ? 'text-green-600' : 'text-red-600'}>{testResults.jobs?.status}</span></div>
                  <div>Is Array: <span className={testResults.jobs?.isArray ? 'text-green-600' : 'text-red-600'}>{testResults.jobs?.isArray ? 'Yes' : 'No'}</span></div>
                  <div>Count: {testResults.jobs?.count}</div>
                </div>
              </div>

              {/* Users API Test */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">Users API</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Status: <span className={testResults.users?.status === 200 ? 'text-green-600' : 'text-red-600'}>{testResults.users?.status}</span></div>
                  <div>Is Array: <span className={testResults.users?.isArray ? 'text-green-600' : 'text-red-600'}>{testResults.users?.isArray ? 'Yes' : 'No'}</span></div>
                  <div>Count: {testResults.users?.count}</div>
                </div>
              </div>

              {testResults.error && (
                <div className="border border-red-300 bg-red-50 rounded-lg p-4">
                  <h3 className="font-semibold text-red-800 mb-2">Error</h3>
                  <p className="text-red-600 text-sm">{testResults.error}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">📝 Instructions</h3>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• If Database Connection shows "No", environment variables are not set in Vercel</li>
            <li>• If APIs return 308 status, there's a routing issue</li>
            <li>• If APIs return "Is Array: No", the API format fix didn't deploy</li>
            <li>• All tests should show green for a working deployment</li>
          </ul>
        </div>

        <div className="mt-6">
          <button
            onClick={runTests}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            🔄 Run Tests Again
          </button>
        </div>
      </div>
    </div>
  );
}