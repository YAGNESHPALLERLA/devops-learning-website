import Terminal from '@/components/terminal';
import DocsLayout from '@/components/docs-layout';

export default function TerminalPage() {
  const onThisPage = [
    { id: 'interactive-terminal', title: 'Interactive Terminal' },
    { id: 'available-commands', title: 'Available Commands' },
    { id: 'learning-tips', title: 'Learning Tips' }
  ];

  return (
    <DocsLayout onThisPage={onThisPage}>
      <div className="max-w-6xl mx-auto">
        <h1 id="interactive-terminal" className="text-4xl font-bold text-gray-900 mb-8">
          🖥️ Interactive Linux Terminal
        </h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-700 mb-6">
            Practice Linux commands in this interactive terminal simulation. This is a safe environment 
            where you can experiment with common Linux commands without affecting your actual system.
          </p>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> This is a simulated terminal for learning purposes. 
                  Commands are processed locally and don't affect your actual system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Component */}
        <div className="mb-8">
          <Terminal className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available Commands */}
          <div id="available-commands">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Commands</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">File System Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><code className="bg-gray-200 px-2 py-1 rounded">ls</code> - List directory contents</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">pwd</code> - Print working directory</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">cd</code> - Change directory</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">cat</code> - Display file contents</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">mkdir</code> - Create directory</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">touch</code> - Create file</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">System Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><code className="bg-gray-200 px-2 py-1 rounded">whoami</code> - Display current user</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">date</code> - Display current date/time</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">uname -a</code> - System information</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">ps</code> - Running processes</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">df -h</code> - Disk usage</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">free -h</code> - Memory usage</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Utility Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li><code className="bg-gray-200 px-2 py-1 rounded">echo</code> - Display text</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">clear</code> - Clear terminal</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">history</code> - Command history</li>
                    <li><code className="bg-gray-200 px-2 py-1 rounded">help</code> - Show all commands</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Tips */}
          <div id="learning-tips">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Tips</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🚀 Getting Started</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Start with <code className="bg-gray-200 px-1 rounded">help</code> to see all available commands</li>
                    <li>• Try <code className="bg-gray-200 px-1 rounded">ls</code> to see what's in your current directory</li>
                    <li>• Use <code className="bg-gray-200 px-1 rounded">pwd</code> to see where you are</li>
                    <li>• Navigate with <code className="bg-gray-200 px-1 rounded">cd</code> to explore directories</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">📁 File Operations</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Create files with <code className="bg-gray-200 px-1 rounded">touch filename</code></li>
                    <li>• Create directories with <code className="bg-gray-200 px-1 rounded">mkdir dirname</code></li>
                    <li>• Read files with <code className="bg-gray-200 px-1 rounded">cat filename</code></li>
                    <li>• Use <code className="bg-gray-200 px-1 rounded">echo "text"</code> to display text</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">🔍 System Monitoring</h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Check system info with <code className="bg-gray-200 px-1 rounded">uname -a</code></li>
                    <li>• Monitor processes with <code className="bg-gray-200 px-1 rounded">ps</code></li>
                    <li>• Check disk space with <code className="bg-gray-200 px-1 rounded">df -h</code></li>
                    <li>• Monitor memory with <code className="bg-gray-200 px-1 rounded">free -h</code></li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                  <p className="text-sm text-yellow-700">
                    <strong>Pro Tip:</strong> Use <code className="bg-yellow-200 px-1 rounded">history</code> to see all your previous commands, 
                    and <code className="bg-yellow-200 px-1 rounded">clear</code> to clean up your terminal screen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}

