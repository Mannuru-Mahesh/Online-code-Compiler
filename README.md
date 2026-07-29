# Online Code Compiler

## Overview

The Online Code Compiler is a web-based application that enables users to write, compile, and execute source code directly from their browser. The application provides a simple interface for coding while using Docker containers to securely execute user programs in an isolated environment.

---

## Features

- Write and edit code in the browser
- Compile and execute code instantly
- Secure code execution using Docker containers
- Display compilation errors and program output
- Responsive user interface
- Fast backend processing
- Isolated execution environment
- Easy to extend for additional programming languages

---

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js

### Containerization
- Docker

### Tools
- Visual Studio Code
- Git
- npm

---

## Project Structure

```
ONLINE-CODE-COMPILER/
│
├── backend/
│   ├── node_modules/
│   ├── temp/
│   ├── utils/
│   │   └── executeCode.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── index.html
│   └── README.md
│
└── README.md
```

---

## Prerequisites

Before running the project, make sure the following software is installed:

- Node.js
- npm
- Docker
- Git

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/online-code-compiler.git
```

```bash
cd online-code-compiler
```

---

### Install Backend Dependencies

```bash
cd backend
npm install
```

---

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Running the Project

### Start Docker

Ensure Docker Desktop is running before starting the backend.

---

### Start Backend

```bash
cd backend
npm start
```

The backend server starts on:

```
http://localhost:5000
```

---

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend runs on:

```
http://localhost:5173
```

Open the above URL in your browser.

---

## How It Works

1. The user writes code in the frontend editor.
2. The frontend sends the code to the Node.js backend.
3. The backend creates a temporary source file.
4. Docker executes the code inside an isolated container.
5. The output or compilation error is captured.
6. The backend sends the result back to the frontend.
7. The frontend displays the execution output.

---

## Docker Integration

Docker is used to execute user programs securely.

Benefits include:

- Isolated execution environment
- Improved security
- Automatic cleanup after execution
- Consistent runtime environment
- Prevents direct access to the host machine

---

## Future Enhancements

- Support additional programming languages
- User authentication
- Save and manage code snippets
- Dark mode
- Execution history
- Online collaboration
- Custom input support
- AI-assisted code suggestions

---

## License

This project is licensed under the MIT License.

---

