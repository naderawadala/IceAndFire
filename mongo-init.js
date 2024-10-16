db = db.getSiblingDB('IceAndFireDB');

db.characters.insertMany([
  {
    name: "Jon Snow",
    gender: "Male",
    culture: "Northmen",
    born: "283 AC",
    died: null,
    titles: ["King in the North"],
    aliases: ["Ned Stark’s illegitimate son"],
    father: "Eddard Stark",
    mother: "Unknown",
    spouse: "Ygritte",
    allegiances: ["House Stark"],
    books: ["A Game of Thrones", "A Storm of Swords"],
    povBooks: ["A Dance with Dragons"],
    tvSeries: ["Game of Thrones"],
    playedBy: ["Kit Harington"],
    url: "http://example.com/jon_snow"
  },
  {
    name: "Daenerys Targaryen",
    gender: "Female",
    culture: "Valyrian",
    born: "284 AC",
    died: null,
    titles: ["Queen of Dragons"],
    aliases: ["Dany", "Khaleesi"],
    father: "Aerys II Targaryen",
    mother: "Rhaella Targaryen",
    spouse: null,
    allegiances: ["House Targaryen"],
    books: ["A Game of Thrones", "A Clash of Kings"],
    povBooks: ["A Storm of Swords"],
    tvSeries: ["Game of Thrones"],
    playedBy: ["Emilia Clarke"],
    url: "http://example.com/daenerys"
  }
]);
