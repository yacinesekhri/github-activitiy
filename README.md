1. Set Up the Project
a) Install Node.js (if not already installed)
Node.js is required for building this project in JavaScript. If you haven't installed it yet, follow the instructions for your operating system here.

To verify installation, run the following commands in your terminal:

bash
Copier le code
node -v
npm -v
b) Create the Project Directory
Create a new folder for your project:

bash
Copier le code
mkdir github-activity-cli
cd github-activity-cli
Initialize a Node.js Project: Initialize your project by creating a package.json file:

bash
Copier le code
npm init -y
This will create a package.json file that manages your project’s dependencies and settings.

c) Create the Project Files
Inside the project directory, create the main JavaScript file:

bash
Copier le code
touch github-activity.js
Now, you have the base structure ready to start coding.

2. Fetch GitHub Activity Using the GitHub API
a) Learn the GitHub API Endpoint
GitHub provides an API to fetch user activity:

Endpoint: https://api.github.com/users/<username>/events
Example: https://api.github.com/users/kamranahmedse/events
This endpoint returns recent events performed by the specified user, such as push events, star events, and issue events.

b) Use Node.js https Module to Fetch Data
In Node.js, you can use the built-in https module to make HTTP requests. This will be used to fetch the user’s activity.

Here is how the structure of your program should look:

3. Write the Code for Fetching Activity
Open the github-activity.js file and start writing the code step-by-step.

a) Capture the GitHub Username as a Command-Line Argument
You can capture the GitHub username provided as a command-line argument using process.argv.

javascript
Copier le code
const https = require('https');

// Get the GitHub username from command-line arguments
const username = process.argv[2];

if (!username) {
  console.error('Error: Please provide a GitHub username.');
  process.exit(1); // Exit the program if no username is provided
}
b) Make an HTTPS Request to the GitHub API
You need to send a GET request to GitHub's API to fetch user activity:

javascript
Copier le code
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
c) Handle API Errors Gracefully
Make sure to handle common errors such as:

Invalid usernames (e.g., a 404 status code if the user is not found).
Request errors (network issues or failures).
Empty response (no recent activity).
4. Test the CLI
After writing the code, save the file and test your CLI in the terminal.

Run the script with a GitHub username:

bash
Copier le code
node github-activity.js kamranahmedse
The program should display the user’s recent activity, for example:

bash
Copier le code
Pushed 3 commits to kamranahmedse/developer-roadmap
Opened a new issue in kamranahmedse/developer-roadmap
Starred kamranahmedse/developer-roadmap
If you don’t provide a username:

bash
Copier le code
node github-activity.js
You should see:

javascript
Copier le code
Error: Please provide a GitHub username.
If the username doesn’t exist:

bash
Copier le code
node github-activity.js invalidusername
You should see:

javascript
Copier le code
Error: User not found.
5. Enhance and Expand (Optional)
Once the basic functionality is working, you can enhance your CLI with additional features:

a) Filter Events by Type:
Allow users to filter the activity by event type (e.g., PushEvent, IssuesEvent).

b) Display Additional Information:
You could fetch more details, like the repository descriptions, timestamps, or include more event types.

c) Caching:
To reduce API calls, you could cache the data locally and update it only after a certain period.

d) Handle Rate Limiting:
The GitHub API has a rate limit (especially for unauthenticated requests). You can check for rate-limiting errors and notify the user if they hit the limit.

6. Package Your CLI
To make your CLI more usable, you can make it globally available on your machine. Here's how:

a) Add a Shebang to the Top of Your Script
Add the following line to the top of your script to allow it to be executed directly from the terminal:

javascript
Copier le code
#!/usr/bin/env node
b) Update package.json for Global Usage
Edit your package.json to include a bin field:

json
Copier le code
"bin": {
  "github-activity": "./github-activity.js"
}
Then, you can link the project globally:

bash
Copier le code
npm link
Now you can run your CLI from anywhere using:

bash
Copier le code
github-activity <username>
Summary:
Set up a Node.js project with npm init.
Capture the GitHub username from the command line using process.argv.
Make an HTTPS request to GitHub's API using the built-in https module.
Process and display the activity based on different event types (e.g., PushEvent, IssuesEvent).
Handle errors like invalid usernames, network issues, or missing input.
Test your CLI and expand it with additional features.
This step-by-step guide will help you build a simple yet effective CLI to fetch and display GitHub user activity.
