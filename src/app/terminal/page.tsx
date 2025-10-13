import MultiTerminal from '@/components/multi-terminal';

export default function TerminalPage() {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <h1 id="interactive-terminal" className="text-4xl font-bold text-white mb-8">
          🖥️ Multi-Technology Terminal
        </h1>
        
        <div className="mb-8">
          <p className="text-lg text-gray-300 mb-6">
            Practice commands for multiple technologies in this interactive terminal simulation. Switch between 
            Linux/DevOps, Python, Java, and SQL environments to practice technology-specific commands safely.
          </p>
          
          <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-300">
                  <strong>Multi-Technology Terminal:</strong> Switch between different technology environments using the tabs above. 
                  This is a simulated terminal for learning purposes - commands are processed locally and don't affect your actual system.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Technology Terminal Component */}
        <div className="mb-8">
          <MultiTerminal className="w-full" />
        </div>

        <div className="space-y-8">
          {/* Available Commands */}
          <div id="available-commands">
            <h2 className="text-2xl font-bold text-white mb-4">Technology-Specific Commands</h2>
            <div className="bg-[#252525] rounded-lg p-6 border border-gray-600">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">🐧 Linux/DevOps Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">docker ps</code> - List containers</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">git status</code> - Git repository status</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">systemctl status</code> - Service status</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">chmod</code> - Change permissions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">🐍 Python Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">python --version</code> - Check Python version</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">pip list</code> - List packages</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">pip install [pkg]</code> - Install package</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">python [file]</code> - Run script</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">☕ Java Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">java --version</code> - Check Java version</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">javac [file]</code> - Compile Java</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">mvn compile</code> - Maven compile</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">gradle build</code> - Gradle build</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">🗄️ SQL Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">mysql -u [user]</code> - Connect to MySQL</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">psql -U [user]</code> - Connect to PostgreSQL</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">sqlite3 [db]</code> - Open SQLite</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">show databases</code> - List databases</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">🔧 Common Commands</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">help</code> - Show all commands</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">clear</code> - Clear terminal</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">ls</code> - List files</li>
                    <li><code className="bg-gray-700 text-green-400 px-2 py-1 rounded">pwd</code> - Print directory</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Tips */}
          <div id="learning-tips">
            <h2 className="text-2xl font-bold text-white mb-4">Learning Tips</h2>
            <div className="bg-[#252525] rounded-lg p-6 border border-gray-600">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">🚀 Getting Started</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Start with <code className="bg-gray-700 text-green-400 px-1 rounded">help</code> to see all available commands</li>
                    <li>• Try <code className="bg-gray-700 text-green-400 px-1 rounded">ls</code> to see what's in your current directory</li>
                    <li>• Use <code className="bg-gray-700 text-green-400 px-1 rounded">pwd</code> to see where you are</li>
                    <li>• Navigate with <code className="bg-gray-700 text-green-400 px-1 rounded">cd</code> to explore directories</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">📁 File Operations</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Create files with <code className="bg-gray-700 text-green-400 px-1 rounded">touch filename</code></li>
                    <li>• Create directories with <code className="bg-gray-700 text-green-400 px-1 rounded">mkdir dirname</code></li>
                    <li>• Read files with <code className="bg-gray-700 text-green-400 px-1 rounded">cat filename</code></li>
                    <li>• Use <code className="bg-gray-700 text-green-400 px-1 rounded">echo "text"</code> to display text</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-white mb-2">🔍 System Monitoring</h3>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• Check system info with <code className="bg-gray-700 text-green-400 px-1 rounded">uname -a</code></li>
                    <li>• Monitor processes with <code className="bg-gray-700 text-green-400 px-1 rounded">ps</code></li>
                    <li>• Check disk space with <code className="bg-gray-700 text-green-400 px-1 rounded">df -h</code></li>
                    <li>• Monitor memory with <code className="bg-gray-700 text-green-400 px-1 rounded">free -h</code></li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                  <p className="text-sm text-yellow-300">
                    <strong>Pro Tip:</strong> Use <code className="bg-gray-700 text-green-400 px-1 rounded">history</code> to see all your previous commands, 
                    and <code className="bg-gray-700 text-green-400 px-1 rounded">clear</code> to clean up your terminal screen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

