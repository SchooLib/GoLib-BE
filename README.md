# GoLib RESTful API

GoLib is a RESTful API built with a tech stack comprising PostgreSQL, ExpressJS, NodeJS, Firebase, and Docker. It provides a comprehensive set of endpoints for managing achievements, books, classifications, users, and authentication.

## Database Schema
- **Database Documentation**: [View Database Schema](https://dbdocs.io/hy.rezaalfanda/LIB-GIGIH)
![LIB GIGIH](https://github.com/SchooLib/GoLib-BE/assets/93983098/21db3510-84e3-40f2-bd3c-110acb953ca7)



## Documentation Links

- **Postman Documentation**: [View API Endpoints and Examples](https://documenter.getpostman.com/view/15041975/2s9YRGxpFf)


## Demo
- **API Deployment**: [Access the Live API](http://103.193.176.43:3000/api/v1)


# GoLib RESTful API Endpoints

| Category        | Method | Endpoint                        | Description                               | Authentication Required |
|-----------------|--------|---------------------------------|-------------------------------------------|-------------------------|
| **Achievements**| GET    | `/api/v1/achievement/`          | Show all achievements.                    | No                      |
|                 | GET    | `/api/v1/achievement/:id`       | Show a specific achievement.              | No                      |
|                 | POST   | `/api/v1/achievement/`          | Add a new achievement.                    | Yes (Firebase)          |
|                 | PUT    | `/api/v1/achievement/:id`       | Update an existing achievement.           | Yes (Firebase)          |
|                 | DELETE | `/api/v1/achievement/:id`       | Remove an achievement.                    | Yes (Admin)             |
|                 | PATCH  | `/api/v1/achievement/claim`     | Claim an achievement.                     | Yes (User)              |
| **Books**       | GET    | `/api/v1/books/`                | Retrieve all books.                       | No                      |
|                 | GET    | `/api/v1/books/:id`             | Retrieve a specific book.                 | No                      |
|                 | POST   | `/api/v1/books/`                | Add a new book.                           | Yes (Admin, Firebase)   |
|                 | PUT    | `/api/v1/books/:id`             | Update a book.                            | Yes (Admin, Firebase)   |
|                 | DELETE | `/api/v1/books/:id`             | Remove a book.                            | Yes (Admin)             |
|                 | POST   | `/api/v1/books/review`          | Review a book.                            | Yes (User)              |
| **Classifications** | GET | `/api/v1/classifications/`      | Retrieve all classifications.             | No                      |
|                 | GET    | `/api/v1/classifications/:id`   | Retrieve a specific classification.       | No                      |
|                 | POST   | `/api/v1/classifications/`      | Add a new classification.                 | Yes (Admin)             |
|                 | PUT    | `/api/v1/classifications/:id`   | Update a classification.                  | Yes (Admin)             |
|                 | DELETE | `/api/v1/classifications/:id`   | Delete a classification.                  | Yes (Admin)             |
| **Users**       | POST   | `/api/v1/users/`                | Create a new user.                        | Yes (Admin, Firebase)   |
|                 | GET    | `/api/v1/users/:idUser`         | Get a user by ID.                         | Yes (User)              |
|                 | GET    | `/api/v1/users/`                | Get all users.                            | No                      |
|                 | PUT    | `/api/v1/users/:idUser`         | Edit a user.                              | Yes (Admin, Firebase)   |
|                 | DELETE | `/api/v1/users/:idUser`         | Delete a user.                            | Yes (Admin)             |
| **Auth**        | POST   | `/api/v1/auth/admin/login`      | Login for admin.                          | No                      |
|                 | POST   | `/api/v1/auth/login`            | Login for users.                          | No                      |


## To run the project locally, follow these steps:

1. Clone this repository `git clone https://github.com/SchooLib/GoLib-BE`.
2. Install the required dependencies using `yarn`.
3. Set up the database and environment variables.
4. Run the application using `yarn dev`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this project useful, please consider giving it a ⭐️ on [GitHub](https://github.com/SchooLib/GoLib-BE). Your support is greatly appreciated! 😄

