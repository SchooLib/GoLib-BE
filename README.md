# GoLib RESTful API

GoLib is a RESTful API built with a tech stack comprising PostgreSQL, ExpressJS, NodeJS, Firebase, and Docker. It provides a comprehensive set of endpoints for managing achievements, books, classifications, users, and authentication.


## Endpoints
# GoLib RESTful API Endpoints

| Category        | Method | Endpoint                  | Description                               | Authentication Required |
|-----------------|--------|---------------------------|-------------------------------------------|-------------------------|
| **Achievements**| GET    | `/achievement/`           | Show all achievements.                    | No                      |
|                 | GET    | `/achievement/:id`        | Show a specific achievement.              | No                      |
|                 | POST   | `/achievement/`           | Add a new achievement.                    | Yes (Firebase)          |
|                 | PUT    | `/achievement/:id`        | Update an existing achievement.           | Yes (Firebase)          |
|                 | DELETE | `/achievement/:id`        | Remove an achievement.                    | Yes (Admin)             |
|                 | PATCH  | `/achievement/claim`      | Claim an achievement.                     | Yes (User)              |
| **Books**       | GET    | `/books/`                 | Retrieve all books.                       | No                      |
|                 | GET    | `/books/:id`              | Retrieve a specific book.                 | No                      |
|                 | POST   | `/books/`                 | Add a new book.                           | Yes (Admin, Firebase)   |
|                 | PUT    | `/books/:id`              | Update a book.                            | Yes (Admin, Firebase)   |
|                 | DELETE | `/books/:id`              | Remove a book.                            | Yes (Admin)             |
|                 | POST   | `/books/review`           | Review a book.                            | Yes (User)              |
| **Classifications** | GET | `/classifications/`      | Retrieve all classifications.             | No                      |
|                 | GET    | `/classifications/:id`    | Retrieve a specific classification.       | No                      |
|                 | POST   | `/classifications/`       | Add a new classification.                 | Yes (Admin)             |
|                 | PUT    | `/classifications/:id`    | Update a classification.                  | Yes (Admin)             |
|                 | DELETE | `/classifications/:id`    | Delete a classification.                  | Yes (Admin)             |
| **Users**       | POST   | `/users/`                 | Create a new user.                        | Yes (Admin, Firebase)   |
|                 | GET    | `/users/:idUser`          | Get a user by ID.                         | Yes (User)              |
|                 | GET    | `/users/`                 | Get all users.                            | No                      |
|                 | PUT    | `/users/:idUser`          | Edit a user.                              | Yes (Admin, Firebase)   |
|                 | DELETE | `/users/:idUser`          | Delete a user.                            | Yes (Admin)             |
| **Auth**        | POST   | `/auth/admin/login`       | Login for admin.                          | No                      |
|                 | POST   | `/auth/login`             | Login for users.                          | No                      |
