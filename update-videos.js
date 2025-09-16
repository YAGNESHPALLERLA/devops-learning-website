const fs = require('fs');
const path = require('path');

const topics = [
  'cloud',
  'concepts', 
  'iac',
  'linux-basics',
  'monitoring',
  'scripting-languages',
  'tools',
  'version-control'
];

const importStatement = `import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';`;

const getVideoSectionCode = (topicName, displayName) => `
          <VideoSection videos={${topicName}Videos} title="${displayName} Video Tutorials" />`;

topics.forEach(topic => {
  const filePath = path.join(__dirname, 'src', 'app', 'docs', topic, 'page.tsx');
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add imports
    if (!content.includes('VideoSection')) {
      content = content.replace(
        "import DocsLayout from '@/components/docs-layout';",
        `import DocsLayout from '@/components/docs-layout';
import VideoSection from '@/components/VideoSection';
import { getVideosForTopic } from '@/data/videoTutorials';`
      );
    }
    
    // Add video data
    const topicName = topic.replace('-', '');
    const displayName = topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    if (!content.includes('Videos = getVideosForTopic')) {
      // Find the pageHeadings array and add video data after it
      const pageHeadingsMatch = content.match(/const pageHeadings = \[[\s\S]*?\];/);
      if (pageHeadingsMatch) {
        const insertPoint = pageHeadingsMatch.index + pageHeadingsMatch[0].length;
        content = content.slice(0, insertPoint) + 
          `\n\n  const ${topicName}Videos = getVideosForTopic('${topic}');` +
          content.slice(insertPoint);
      }
    }
    
    // Add video-tutorials to pageHeadings
    if (!content.includes('video-tutorials')) {
      content = content.replace(
        /(\s+{ id: '[^']+', title: '[^']+' },\s*)({ id: 'summary', title: 'Summary' })/,
        `$1{ id: 'video-tutorials', title: 'Video Tutorials' },\n    $2`
      );
    }
    
    // Add video section before summary
    if (!content.includes('VideoSection videos=')) {
      content = content.replace(
        /(\s+)(<h2 id="summary")/,
        `$1<VideoSection videos={${topicName}Videos} title="${displayName} Video Tutorials" />\n\n$1$2`
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${topic} page`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('All pages updated!');
