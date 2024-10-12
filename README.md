# Ice and Fire API

The Ice and Fire API is a middleware solution that leverages GraphQL to retrieve data related to houses, characters, and books from the famous "A Song of Ice and Fire" series by George R.R. Martin. This API allows users to manage and retrieve information about these entities efficiently.

For the underlying data, the API utilizes the Open API found at [https://anapioficeandfire.com/](https://anapioficeandfire.com/).

Additionally, this API is configured to use **Redis** for caching and **MongoDB** as its database, both of which are set up within a Docker container. **React** is also used alongside **Redux** for state management.



## Table of Contents

- [Installation](#installation)
- [Queries](#queries)
  - [House Query](#house-query)
  - [Character Query](#character-query)
  - [Book Query](#book-query)
- [Mutations](#mutations)
  - [House Mutation](#house-mutation)
  - [Book Mutation](#book-mutation)
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

3. Access the frontend when container is running:

```
http://localhost:3000

The frontend accesses graphql for data retrieval at http://localhost:5000/graphql

```

## Queries
// TODO
## Mutations
// TODO
## Remaining tasks

- Add Integration and Unit Tests for BE and FE
- Implement frontend
- Implement JWT Authentication and Authorization
- Major codebase refactoring in BE
- Validation and error page handling