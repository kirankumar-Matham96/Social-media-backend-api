# Social Media App (NODE-API)

A Node.js application to create, update, delete posts, comments and likes. Build using REST Full API with user authorization feature.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Create, update, retrieve by id, filter by user, and all retrieve posts
- Add, update and retrieve by id, retrieve by post id, and retrieve all the comments
- Like and dislike the post
- Pagination for posts, comments and likes

## Prerequisites

- Node.js (>=14.x)
- npm (>=6.x)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kirankumar-Matham96/Social-media-backend-api.git
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create environments file (.env)

   ```bash
   SECRET_CODE = [Add your secret code here]
   PORT = [add port number to run the server]
   ```

4. Start the application:

- if nodemon is not installed

  ```bash
  npm run start
  ```

- if nodemon is installed

  ```bash
  npm run dev
  ```

5. Open your browser and navigate to `http://localhost:[portNumber]`

## Project Structure

```
├── src/
│ ├── features/
| | ├── comments/
│ │ │ ├── controllers/
│ │ │ | └── comment.controller.js
│ │ │ ├── models/
│ │ │ | └── comment.model.js
│ │ │ └── routes/
│ │ |   └── comment.routes.js
| | ├── likes/
│ │ │ ├── controllers/
│ │ │ | └── like.controller.js
│ │ │ ├── models/
│ │ │ | └── like.model.js
│ │ │ └── routes/
│ │ │   └── like.routes.js
| | ├── posts/
│ │ │ ├── controllers/
│ │ │ | └── post.controller.js
│ │ │ ├── models/
│ │ │ | └── post.model.js
│ │ │ └── routes/
│ │ |   └── post.routes.js
| | └── users/
│ │   ├── controllers/
│ │   | └── user.controller.js
│ │   ├── models/
│ │   | └── user.model.js
│ │   └── routes/
│ │     └── user.routes.js
│ ├── media/
│ └── middlewares/
│   └── customErrorHandling.middleware.js
│   └── fileUpload.middleware.js
│   └── jwtAuth.middleware.js
│   └── logger.middleware.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## API Endpoints

# NOTE:

- After login, send the "token" header in the request headers to use the apis.
  ```bash
  token: <TOKEN_FROM_THE_LOGIN_RESPONSE>
  ```

### User Routes

- `POST /register`: Register a new user
- `POST /login`: Login a user

### Post Routes

- `POST /api/posts/`: Create a new post
- `GET /api/posts/all`: Get all posts
- `GET /api/posts/<POST_ID>`: Get a specific post by ID
- `GET /api/posts/`: Filter posts by user
- `PUT /api/posts/<POST_ID>`: Update post by ID
- `DELETE /api/posts/<POST_ID>`: Delete post by ID

### Comment Routes

- `POST /api/comments/<POST_ID>`: Add a new comment
- `GET /api/comments/<POST_ID>`: Get all comments related to a post
- `PUT /api/comments/<POST_ID>`: Update comment by ID
- `DELETE /api/comments/<POST_ID>`: Delete comment by ID

### Like Routes

- `GET /api/comments/<POST_ID>`: Get all likes of a post
- `GET /api/comments/toggle/<POST_ID>`: Like or dislike a post

## Technologies Used

- Node.js
- Express
- Multer (for file handling)
- jsonwebtoken (for auth)
- winston (for logs)
- express-validator (for validation)
- uuid (for unique id generation)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

### NOTE:

    please use prefixes for the commit messages as fallowing:

    - feat: for adding a feature
    - bug-fix: for fixing a bug
    - update: for any update
    - refracted: for any logic or syntax modifications

## License

This project is licensed under the ISC License.

[Comment]< the [LICENSE](LICENSE) file for details.>
