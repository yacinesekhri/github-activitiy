# GitHub Activity CLI

A simple command-line interface (CLI) to fetch and display the recent activity of a GitHub user. This project allows you to practice working with APIs, handling JSON data, and building a basic CLI application.

## Features

- Fetch recent activity of a specified GitHub user.
- Display activity in a user-friendly format.
- Handle errors gracefully, such as invalid usernames or API failures.

## Requirements

- [Node.js](https://nodejs.org/) (version 12 or higher)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/github-activity-cli.git
   cd github-activity
Install dependencies (if any):

bash
Copier le code
npm install
(Optional) Link the CLI globally for easier access:

bash
Copier le code
npm link
Usage
Run the CLI from the command line, providing a GitHub username as an argument:

bash
Copier le code
github-activity <username>
Example
bash
Copier le code
github-activity kamranahmedse
Output
You will see output similar to the following, displaying the user's recent activity:

bash
Copier le code
Pushed 3 commits to kamranahmedse/developer-roadmap
Opened a new issue in kamranahmedse/developer-roadmap
Starred kamranahmedse/developer-roadmap
...
Error Handling
The CLI handles various errors gracefully:

No username provided: Displays an error message.
User not found: Displays an error message indicating that the specified user does not exist.
API request failures: Displays relevant error messages.
Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

Fork the repository.
Create your feature branch:
bash
Copier le code
git checkout -b feature/MyFeature
Commit your changes:
bash
Copier le code
git commit -m 'Add some feature'
Push to the branch:
bash
Copier le code
git push origin feature/MyFeature
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

go
Copier le code

### Instructions for Adding the `README.md` File

1. **Create the `README.md` File**:
   In your project directory, create a new file named `README.md`:

   ```bash
   touch README.md
Copy the Sample Content: Open the README.md file in a text editor and paste the sample content provided above. Modify any sections as needed to match your project specifics, such as the repository URL, additional features, or installation instructions.

Save the File: Save the changes to the README.md file.

Conclusion
Having a README.md is essential for any project as it helps users and potential contributors understand the purpose of the project, how to use it, and how to contribute. Feel free to adjust the content to suit your project needs!
