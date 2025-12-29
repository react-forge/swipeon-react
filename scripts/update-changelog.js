#!/usr/bin/env node

/**
 * Changelog Update Script
 * 
 * This script automatically updates CHANGELOG.md when a new version is published.
 * It reads the version from package.json and adds a new entry to the changelog.
 * 
 * Usage:
 *   node scripts/update-changelog.js
 *   node scripts/update-changelog.js "Your custom changelog message"
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json');
const CHANGELOG_PATH = path.join(ROOT_DIR, 'CHANGELOG.md');

function getPackageVersion() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.version;
}

function getPackageName() {
  const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf8'));
  return packageJson.name;
}

function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function versionExistsInChangelog(version) {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const versionPattern = new RegExp(`\\[${version.replace(/\./g, '\\.')}\\]`, 'i');
  return versionPattern.test(changelog);
}

function getVersionType(version) {
  if (version.includes('alpha')) return 'alpha';
  if (version.includes('beta')) return 'beta';
  if (version.includes('rc')) return 'rc';
  return 'stable';
}

function generateDefaultEntry(version, type) {
  const date = getCurrentDate();
  
  let emoji = '📦';
  let title = 'Changes';
  
  switch (type) {
    case 'alpha':
      emoji = '🧪';
      title = 'Alpha Release';
      break;
    case 'beta':
      emoji = '🔬';
      title = 'Beta Release';
      break;
    case 'rc':
      emoji = '🚀';
      title = 'Release Candidate';
      break;
    case 'stable':
      // Determine if it's a major, minor, or patch release
      const parts = version.split('.');
      if (parts[2] === '0' && parts[1] === '0') {
        emoji = '🎉';
        title = 'Major Release';
      } else if (parts[2] === '0') {
        emoji = '✨';
        title = 'Minor Release';
      } else {
        emoji = '🔧';
        title = 'Patch Release';
      }
      break;
  }
  
  return `## [${version}] - ${date}

### ${emoji} ${title}

- Version bump and improvements

`;
}

function updateChangelog(version, customMessage) {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const type = getVersionType(version);
  
  // Generate the new entry
  let newEntry;
  if (customMessage) {
    const date = getCurrentDate();
    newEntry = `## [${version}] - ${date}

### 📦 Changes

${customMessage.split('\n').map(line => `- ${line}`).join('\n')}

`;
  } else {
    newEntry = generateDefaultEntry(version, type);
  }
  
  // Find the position after the header section (after "Semantic Versioning" line)
  const headerEndPattern = /and this project adheres to \[Semantic Versioning\].*?\n\n/;
  const match = changelog.match(headerEndPattern);
  
  if (!match) {
    console.error('Could not find the proper insertion point in CHANGELOG.md');
    process.exit(1);
  }
  
  const insertPosition = match.index + match[0].length;
  
  // Insert the new entry
  const updatedChangelog = 
    changelog.slice(0, insertPosition) + 
    newEntry + 
    changelog.slice(insertPosition);
  
  // Update the version links at the bottom
  const packageName = getPackageName();
  const repoUrl = `https://github.com/react-forge/${packageName}`;
  const newLink = `[${version}]: ${repoUrl}/releases/tag/v${version}`;
  
  // Find where to insert the new link (before the first version link)
  const linkPattern = /\n\[[\d.]+.*?\]:/;
  const linkMatch = updatedChangelog.match(linkPattern);
  
  let finalChangelog;
  if (linkMatch) {
    const linkPosition = linkMatch.index;
    finalChangelog = 
      updatedChangelog.slice(0, linkPosition) + 
      '\n' + newLink + 
      updatedChangelog.slice(linkPosition);
  } else {
    // No existing links, add at the end
    finalChangelog = updatedChangelog.trimEnd() + '\n\n' + newLink + '\n';
  }
  
  fs.writeFileSync(CHANGELOG_PATH, finalChangelog);
  console.log(`✅ Updated CHANGELOG.md with version ${version}`);
}

function main() {
  const version = getPackageVersion();
  const customMessage = process.argv[2];
  
  console.log(`📋 Current version: ${version}`);
  
  if (versionExistsInChangelog(version)) {
    console.log(`ℹ️  Version ${version} already exists in CHANGELOG.md, skipping update.`);
    return;
  }
  
  updateChangelog(version, customMessage);
}

main();

