const fs = require('fs');
const { exec } = require('child_process');

// Load the existing mint.json file
let config;

try {
  config = require('./mint.json');
} catch (error) {
  console.error('Error loading mint.json:', error);
  process.exit(1);
}

// Helper function to update the navigation groups
function updateNavigation(oldNavigation, newNavigation) {
  const updatedNavigation = [...oldNavigation];

  // Track existing groups for removal check
  const existingGroups = new Set(newNavigation.map(newGroup => newGroup.group));

  // Update existing groups
  newNavigation.forEach(newGroup => {
    const groupIndex = oldNavigation.findIndex(
      oldGroup => 
        oldGroup.group === newGroup.group && 
        oldGroup.pages.length > 0 && 
        oldGroup.pages[0].startsWith("api-reference/")
    );

    if (groupIndex !== -1) {
      updatedNavigation[groupIndex] = newGroup;
    } else {
      updatedNavigation.push(newGroup);
    }
  });

  // Remove groups not present in new navigation
  return updatedNavigation.filter(
    oldGroup => 
      !oldGroup.pages.length || 
      !oldGroup.pages[0].startsWith("api-reference/") ||
      !oldGroup.pages[0].slice("api-reference/".length).includes('/') || //Don't include any groups that have pages direct in api-reference folder, like overviews,etc
      existingGroups.has(oldGroup.group)
  );
}

// Execute the Mintlify scraping command
exec('npx @mintlify/scraping@latest openapi-file apiv2.json -o api-reference', (err, stdout, stderr) => {
  if (err) {
    console.error('Error running Mintlify scraping command:', err);
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

    const updatedNavigation = updateNavigation(config.navigation, newNavigation);
    config.navigation = updatedNavigation;

    fs.writeFile('./mint.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        console.error('Error writing to mint.json:', err);
      } else {
        console.log('mint.json updated successfully');
      }
    });
  } catch (parseError) {
    console.error('Error parsing new navigation JSON:', parseError);
    console.error('Captured navigation:', navigationMatch[1]);
  }
});