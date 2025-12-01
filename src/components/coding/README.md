# Made in Ghana Frontend

## Overview
The "Made in Ghana" project aims to provide a comprehensive educational platform focusing on various aspects of modern education, including foundational skills, coding, and cultural education. This frontend application is built using React and React Bootstrap, ensuring a responsive and user-friendly interface.

## Project Structure
The project is organized into several directories, each serving a specific purpose:

- **src/pages**: Contains the main pages of the application.
  - **Education.js**: The main component for the education section, featuring navigation for different educational topics.
  - **BasicCoding.js**: Entry point for the Basic Coding section, integrating Python and Scratch programming.
  - **education/BasicCodingPage.js**: Detailed content for the Basic Coding section, including explanations and resources.

- **src/components/coding**: Contains components related to coding education.
  - **PythonSection.js**: Focuses on Python programming, including concepts and exercises.
  - **ScratchSection.js**: Dedicated to Scratch programming, introducing its interface and project creation.
  - **CodeEditor.js**: Provides an interactive code editor for users to write and test code.
  - **CodeExample.js**: Displays code examples for Python and Scratch.

- **src/assets**: Contains assets used in the application.
  - **python-logo.svg**: Logo for Python programming.
  - **scratch-logo.svg**: Logo for Scratch programming.
  - **coding-exercises**: JSON files with coding exercises for Python and Scratch.

- **src/styles**: Contains CSS styles specific to the application.
  - **BasicCoding.css**: Styles for the Basic Coding section.

## Features
- **Interactive Learning**: Users can learn coding through interactive sections for both Python and Scratch.
- **Resource Integration**: Links to external resources and exercises to enhance learning.
- **Responsive Design**: Built with React Bootstrap for a mobile-friendly experience.

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd made-in-ghana-Frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage
- Navigate through the educational sections using the navigation bar.
- Explore the Basic Coding section to learn about Python and Scratch programming.
- Utilize the interactive code editor to practice coding skills.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.