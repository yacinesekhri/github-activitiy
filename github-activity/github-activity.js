#!/usr/bin/env node

const https = require('https');

// Get the GitHub username from command-line arguments
const username = process.argv[2];

if (!username) {
  console.error('Error: Please provide a GitHub username.');
  process.exit(1);
}
function fetchGitHubActivity(username) {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${username}/events`,
      method: 'GET',
      headers: {
        'User-Agent': 'node.js', // GitHub API requires a user-agent header
      },
    };
  
    const req = https.request(options, (res) => {
      let data = '';
  
      // Collect data chunks as they arrive
      res.on('data', (chunk) => {
        data += chunk;
      });
  
      // When all data is received, process it
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const events = JSON.parse(data);
  
            if (events.length === 0) {
              console.log('No recent activity found for this user.');
            } else {
              // Display user activity (handle different event types)
              events.forEach((event) => {
                switch (event.type) {
                  case 'PushEvent':
                    console.log(
                      `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`
                    );
                    break;
                  case 'IssuesEvent':
                    console.log(`Opened a new issue in ${event.repo.name}`);
                    break;
                  case 'WatchEvent':
                    console.log(`Starred ${event.repo.name}`);
                    break;
                  default:
                    console.log(`Performed ${event.type} in ${event.repo.name}`);
                }
              });
            }
          } catch (error) {
            console.error('Error parsing response:', error.message);
          }
        } else if (res.statusCode === 404) {
          console.error('Error: User not found.');
        } else {
          console.error(`Error: Received status code ${res.statusCode}`);
        }
      });
    });
  
    req.on('error', (error) => {
      console.error('Request error:', error.message);
    });
  
    req.end(); // End the request
  }
  
  // Fetch activity for the provided username
  fetchGitHubActivity(username);
