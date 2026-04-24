const fs = require('fs');
const { exec } = require('child_process');

// Load the existing docs.json file
const configPath = './docs.json';
let config;

try {
  const rawConfig = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(rawConfig);
} catch (error) {
  console.error('Error loading docs.json:', error);
  process.exit(1);
}

// Helper function to update the navigation groups
function updateNavigation(oldGroups, newGroups) {
  const updatedGroups = [...oldGroups];
  const preservedRootLevelPages = new Set([
    'api-reference/overview',
    'api-reference/getting-started',
    'api-reference/authentication'
  ]);

  // Track existing groups for removal check
  const existingGroups = new Set(newGroups.map(newGroup => newGroup.group));

  // Update existing groups
  newGroups.forEach(newGroup => {
    const groupIndex = oldGroups.findIndex(
      oldGroup => 
        oldGroup.group === newGroup.group && 
        oldGroup.pages.length > 0 && 
        oldGroup.pages[0].startsWith("api-reference/")
    );

    if (groupIndex !== -1) {
      updatedGroups[groupIndex] = newGroup;
    } else {
      updatedGroups.push(newGroup);
    }
  });

  // Remove groups not present in new navigation
  return updatedGroups.filter(
    oldGroup => 
      !oldGroup.pages.length || 
      !oldGroup.pages[0].startsWith("api-reference/") ||
      oldGroup.pages.every(page => preservedRootLevelPages.has(page)) ||
      existingGroups.has(oldGroup.group)
  );
}

// Execute the Mintlify scraping command
exec('npx @mintlify/scraping@latest openapi-file apiv2.json -o api-reference', (err, stdout, stderr) => {
  if (err) {
    console.error('Error running Mintlify scraping command:', err);
    return;
  }

  if (stderr && stderr.includes('Failed to validate OpenAPI schema')) {
    console.error('Mintlify scraping failed because apiv2.json did not pass OpenAPI validation.');
    console.error(stderr);
    return;
  }

  const navigationMatch = stdout.match(/navigation object suggestion:\s*\n(\[.*\n*\s*.*\])/s);

  if (!navigationMatch) {
    console.error('Navigation object suggestion not found in output');
    console.error('stdout:', stdout);
    console.error('stderr:', stderr);
    return;
  }

  try {
    const newNavigationString = navigationMatch[1].replace(/\\n/g, '').replace(/\s+/g, ' ');
    const newNavigation = JSON.parse(newNavigationString);
    if (!config.navigation || !Array.isArray(config.navigation.tabs)) {
      console.error('docs.json navigation.tabs not found or invalid');
      return;
    }

    const apiReferenceTab = config.navigation.tabs.find(tab => tab.tab === 'API Reference');
    if (!apiReferenceTab) {
      console.error('API Reference tab not found in docs.json navigation');
      return;
    }

    const existingGroups = apiReferenceTab.groups || [];
    apiReferenceTab.groups = updateNavigation(existingGroups, newNavigation);

    fs.writeFile(configPath, JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error writing to docs.json:', err);
      } else {
        console.log('docs.json updated successfully');
      }
    });
  } catch (parseError) {
    console.error('Error parsing new navigation JSON:', parseError);
    console.error('Captured navigation:', navigationMatch[1]);
  }
});
