# Ice and Fire API

The Ice and Fire API is a middleware solution that leverages GraphQL to retrieve data related to houses, characters, and books from the famous "A Song of Ice and Fire" series by George R.R. Martin. This API allows users to manage and retrieve information about these entities efficiently.

For the underlying data, the API utilizes the Open API found at [https://anapioficeandfire.com/](https://anapioficeandfire.com/).

Additionally, this API is configured to use **Redis** for caching and **MongoDB** as its database, both of which are set up within a Docker container.



## Table of Contents

- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [House Controller](#house-controller)
  - [Character Controller](#character-controller)
  - [Book Controller](#book-controller)
- [Remaining Tasks](#remaining-tasks)

## Installation

All you need to run this project is Visual Studio and Docker

1. Clone the repository

  ```
git clone https://github.com/naderawadala/IceAndFire.git
  ```

2. Start the docker container

```
docker-compose --build
```

3. Access API when container is running:

```
http://localhost:5000/api/house

http://localhost:5000/api/character

http://localhost:5000/api/book
```

## Api-Endpoints

### House Controller

- **Get all houses**
  - **Endpoint**: `GET api/houses`
  - **Response**: Returns a list of all houses.

- **Get a house by name**
  - **Endpoint**: `GET api/houses/{name}`
  - **Response**: Returns the details of a house by name. If the house is not found, returns a 404 status code.

- **Create a new house**
  - **Endpoint**: `POST api/houses`
  - **Request Body**: `HouseDto` (JSON)
    ```json
    {
      "url": "string",
      "name": "string",
      "region": "string",
      "coatOfArms": "string",
      "words": "string",
      "titles": ["string"],
      "seats": ["string"],
      "currentLord": "string",
      "heir": "string",
      "overlord": "string",
      "founded": "string",
      "founder": "string",
      "diedOut": "string",
      "ancestralWeapons": ["string"],
      "cadetBranches": ["string"],
      "swornMembers": ["string"]
    }
    ```
  - **Response**: Returns the created house along with a 201 status code.

- **Update a house**
  - **Endpoint**: `PUT api/houses/{name}`
  - **Request Body**: `HouseDto` (JSON)
    ```json
    {
      "url": "string",
      "name": "string",
      "region": "string",
      "coatOfArms": "string",
      "words": "string",
      "titles": ["string"],
      "seats": ["string"],
      "currentLord": "string",
      "heir": "string",
      "overlord": "string",
      "founded": "string",
      "founder": "string",
      "diedOut": "string",
      "ancestralWeapons": ["string"],
      "cadetBranches": ["string"],
      "swornMembers": ["string"]
    }
    ```
  - **Response**: Returns the updated house. If the house is not found, returns a 404 status code.

- **Delete a house**
  - **Endpoint**: `DELETE api/houses/{name}`
  - **Response**: Returns a 204 status code if the house was successfully deleted. If the house is not found, returns a 404 status code.

### Character Controller

- **Get all characters**
  - **Endpoint**: `GET api/characters`
  - **Response**: Returns a list of all characters.

- **Get a character by ID**
  - **Endpoint**: `GET api/characters/{id}`
  - **Response**: Returns the details of a character by name. If the character is not found, returns a 404 status code.

### Book Controller

- **Get all books**
  - **Endpoint**: `GET api/books`
  - **Response**: Returns a list of all books.

- **Get a book by ISBN**
  - **Endpoint**: `GET api/books/{isbn}`
  - **Response**: Returns the details of a book by its ISBN. If the book is not found, returns a 404 status code.

- **Create a new book**
  - **Endpoint**: `POST api/books`
  - **Request Body**: `BookDto` (JSON)
    ```json
    {
      "url": "string",
      "name": "string",
      "isbn": "string",
      "authors": ["string"],
      "numberOfPages": 0,
      "publisher": "string",
      "country": "string",
      "mediaType": "string",
      "released": "2023-10-08T00:00:00",
      "characters": ["string"],
      "povCharacters": ["string"]
    }
    ```
  - **Response**: Returns the created book along with a 201 status code.

- **Update a book**
  - **Endpoint**: `PUT api/books/{isbn}`
  - **Request Body**: `BookDto` (JSON)
    ```json
    {
      "url": "string",
      "name": "string",
      "isbn": "string",
      "authors": ["string"],
      "numberOfPages": 0,
      "publisher": "string",
      "country": "string",
      "mediaType": "string",
      "released": "2023-10-08T00:00:00",
      "characters": ["string"],
      "povCharacters": ["string"]
    }
    ```
  - **Response**: Returns the updated book. If the book is not found, returns a 404 status code.

- **Delete a book**
  - **Endpoint**: `DELETE api/books/{isbn}`
  - **Response**: Returns a 204 status code if the book was successfully deleted. If the book is not found, returns a 404 status code.

## Remaining tasks

- Add Integration and Unit Tests for BE and FE
- Implement frontend
- Implement JWT Authentication and Authorization
- Major codebase refactoring in BE
- Validation and error page handling
- Consider adding PATCH partial updating to controllers.