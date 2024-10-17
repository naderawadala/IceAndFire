# Ice and Fire API

The Ice and Fire API is a middleware solution that leverages GraphQL to retrieve data related to houses, characters, and books from the famous "A Song of Ice and Fire" series by George R.R. Martin. This API allows users to manage and retrieve information about these entities efficiently.

For the underlying data, the API utilizes the Open API found at [https://anapioficeandfire.com/](https://anapioficeandfire.com/).

Additionally, this API is configured to use **Redis** for caching and **MongoDB** as its database, both of which are set up within a Docker container. **React** is also used alongside **Redux** for state management.



## Table of Contents

- [Installation](#installation)
- [Queries](#queries)
  - [Character Query](#character-query)
  - [Character By Name](#character-by-name)
  - [House Query](#house-query)
  - [House By Name](#house-by-name)
  - [Book Query](#book-query)
  - [Book By Name](#book-by-name)
- [Mutations](#mutations)
  - [Create House](#create-house)
  - [Update House](#update-house)
  - [Delete House](#delete-house)
  - [Create Book](#create-book)
  - [Update Book](#update-book)
  - [Delete Book](#delete-book)
  - [Login](#login)
  - [Register](#register)
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

```

Additionally you can also access the backend:
```
https://localhost:5000/graphql
```

## Queries

### Character Query
Fetch details about a list of characters.

```
query {
  characters {
    aliases
    allegiances
    books
    born
    culture
    died
    father
    gender
    id
    mother
    name
    playedBy
    povBooks
    spouse
    titles
    tvSeries
  }
}
```
### Character By Name

Fetch details about a specific character by name

```
query {
  characterByName(name: "name") {
    aliases
    allegiances
    books
    born
    culture
    died
    father
    gender
    id
    mother
    name
    playedBy
    povBooks
    spouse
    titles
    tvSeries
  }
}
```

### House Query
Retrieve information about all houses.

```
query {
  houses {
    ancestralWeapons
    cadetBranches
    coatOfArms
    currentLord
    diedOut
    founded
    founder
    heir
    id
    name
    overlord
    region
    seats
    swornMembers
    titles
    url
    words
  }
}
```

### House By Name 

Fetch details about a specific house by name
```
query {
  houseByName(name: "name") {
    ancestralWeapons
    cadetBranches
    coatOfArms
    currentLord
    diedOut
    founded
    founder
    heir
    id
    name
    overlord
    region
    seats
    swornMembers
    titles
    url
    words
  }
}
```

### Book Query
Retrieve information about all books.

```
query {
  books {
    authors
    characters
    country
    id
    isbn
    mediaType
    name
    numberOfPages
    povCharacters
    publisher
    released
    url
  }
}
```

### Book By Name 

Fetch details about a specific book by name
```
query {
  bookByName(name: "name") {
    authors
    characters
    country
    id
    isbn
    mediaType
    name
    numberOfPages
    povCharacters
    publisher
    released
    url
  }
}
```

## Mutations
### Create House
```
mutation {
  createHouse(
    houseDto: {
      ancestralWeapons: null
      cadetBranches: null
      coatOfArms: null
      currentLord: null
      diedOut: null
      founded: null
      founder: null
      heir: null
      name: null
      overlord: null
      region: null
      seats: null
      swornMembers: null
      titles: null
      url: null
      words: null
    }
  ) {
    ancestralWeapons
    cadetBranches
    coatOfArms
    currentLord
    diedOut
    founded
    founder
    heir
    id
    name
    overlord
    region
    seats
    swornMembers
    titles
    url
    words
  }
}
```
### Update House
```
mutation {
  updateHouse(
    name: null
    houseDto: {
      ancestralWeapons: null
      cadetBranches: null
      coatOfArms: null
      currentLord: null
      diedOut: null
      founder: null
      founded: null
      heir: null
      name: null
      overlord: null
      region: null
      seats: null
      swornMembers: null
      titles: null
      url: null
    }
  ) {
    ancestralWeapons
    cadetBranches
    coatOfArms
    currentLord
    diedOut
    founded
    founder
    heir
    id
    name
    overlord
    region
    seats
    swornMembers
    titles
    url
    words
  }
}
```
### Delete House
```
mutation {
  deleteHouse(name: null) 
}
```
### Create Book

```
mutation {
  createBook(
    bookDto: {
      authors: null
      characters: null
      isbn: null
      country: null
      mediaType: null
      name: null
      numberOfPages: null
      povCharacters: null
      publisher: null
      released: null
      url: null
    }
  ) {
    authors
    characters
    country
    id
    isbn
    mediaType
    name
    numberOfPages
    povCharacters
    publisher
    released
    url
  }
}
```
### Update Book
```
mutation {
  updateBook(
    isbn: null
    bookDto: {
      authors: null
      characters: null
      country: null
      isbn: null
      mediaType: null
      name: null
      numberOfPages: null
      povCharacters: null
      publisher: null
      released: null
      url: null
    }
  ) {
    authors
    characters
    country
    id
    isbn
    name
    mediaType
    numberOfPages
    povCharacters
    publisher
    released
    url
  }
}
```
### Delete Book
```
mutation {
  deleteBook(isbn: null)
}
```
### Login
```
mutation {
  login(loginDto: { password: null, username: null }) {
    refreshToken
    role
    token
  }
}
```
### Register
```
mutation {
  register(userDto: { password: null, username: null }) {
    id
    password
    refreshToken
    refreshTokenExpiration
    role
    token
    username
  }
}
```

## Remaining tasks

- Add more unit tests to the back end and front end
- Fix JWT Auth token generation
- Make improvements to UX in FE
