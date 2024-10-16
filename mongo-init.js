db = db.getSiblingDB('IceAndFireDB');

db.characters.insertMany([
  {
    "name": "Jon Snow",
    "gender": "Male",
    "culture": "Northmen",
    "born": "283 AC",
    "died": "Currently Alive",
    "titles": ["King in the North"],
    "aliases": ["Ned Stark’s illegitimate son"],
    "father": "Eddard Stark",
    "mother": "Unknown",
    "spouse": "Ygritte",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Kit Harington"]
  },
  {
    "name": "Daenerys Targaryen",
    "gender": "Female",
    "culture": "Valyrian",
    "born": "284 AC",
    "died": "Currently Alive",
    "titles": ["Queen of Dragons"],
    "aliases": ["Dany", "Khaleesi"],
    "father": "Aerys II Targaryen",
    "mother": "Rhaella Targaryen",
    "spouse": "None",
    "allegiances": ["House Targaryen"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["A Storm of Swords"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Emilia Clarke"]
  },
  {
    "name": "Tyrion Lannister",
    "gender": "Male",
    "culture": "Westlands",
    "born": "273 AC",
    "died": "Currently Alive",
    "titles": ["Hand of the King"],
    "aliases": ["The Imp", "The Halfman"],
    "father": "Tywin Lannister",
    "mother": "Joanna Lannister",
    "spouse": "Sansa Stark",
    "allegiances": ["House Lannister"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Clash of Kings"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Peter Dinklage"]
  },
  {
    "name": "Arya Stark",
    "gender": "Female",
    "culture": "Northmen",
    "born": "289 AC",
    "died": "Currently Alive",
    "titles": ["No One"],
    "aliases": ["Arry", "No One"],
    "father": "Eddard Stark",
    "mother": "Catelyn Stark",
    "spouse": "None",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Clash of Kings"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Maisie Williams"]
  },
  {
    "name": "Sansa Stark",
    "gender": "Female",
    "culture": "Northmen",
    "born": "286 AC",
    "died": "Currently Alive",
    "titles": ["Lady of Winterfell"],
    "aliases": ["Sansa"],
    "father": "Eddard Stark",
    "mother": "Catelyn Stark",
    "spouse": "None",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Clash of Kings"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Sophie Turner"]
  },
  {
    "name": "Bran Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "283 AC",
    "died": "Currently Alive",
    "titles": ["Three-Eyed Raven"],
    "aliases": ["Brandon Stark"],
    "father": "Eddard Stark",
    "mother": "Catelyn Stark",
    "spouse": "None",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Clash of Kings"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Isaac Hempstead Wright"]
  },
  {
    "name": "Cersei Lannister",
    "gender": "Female",
    "culture": "Westlands",
    "born": "C. 266 AC",
    "died": "Currently Alive",
    "titles": ["Queen"],
    "aliases": ["Cersei"],
    "father": "Tywin Lannister",
    "mother": "Joanna Lannister",
    "spouse": "Robert Baratheon",
    "allegiances": ["House Lannister"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Feast for Crows"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Lena Headey"]
  },
  {
    "name": "Jaime Lannister",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 266 AC",
    "died": "Currently Alive",
    "titles": ["Kingsguard"],
    "aliases": ["The Kingslayer"],
    "father": "Tywin Lannister",
    "mother": "Joanna Lannister",
    "spouse": "None",
    "allegiances": ["House Lannister"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Feast for Crows"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Nikolaj Coster-Waldau"]
  },
  {
    "name": "Petyr Baelish",
    "gender": "Male",
    "culture": "Vale",
    "born": "C. 256 AC",
    "died": "Currently Alive",
    "titles": ["Lord Protector of the Vale"],
    "aliases": ["Littlefinger"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Baelish"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["A Storm of Swords"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Aidan Gillen"]
  },
  {
    "name": "Sandor Clegane",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 262 AC",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["The Hound"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Clegane"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Feast for Crows"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Rory McCann"]
  },
  {
    "name": "Jorah Mormont",
    "gender": "Male",
    "culture": "Northmen",
    "born": "C. 256 AC",
    "died": "Currently Alive",
    "titles": ["Ser"],
    "aliases": ["Jorah"],
    "father": "Jeor Mormont",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Mormont"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Iain Glen"]
  },
  {
    "name": "Brienne of Tarth",
    "gender": "Female",
    "culture": "Northmen",
    "born": "C. 275 AC",
    "died": "Currently Alive",
    "titles": ["Lady"],
    "aliases": ["Brienne"],
    "father": "Lord Selwyn Tarth",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Tarth"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["A Feast for Crows"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Gwendoline Christie"]
  },
  {
    "name": "Davos Seaworth",
    "gender": "Male",
    "culture": "None",
    "born": "C. 266 AC",
    "died": "Currently Alive",
    "titles": ["Ser"],
    "aliases": ["Onion Knight"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Stannis"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Liam Cunningham"]
  },
  {
    "name": "Theon Greyjoy",
    "gender": "Male",
    "culture": "Ironborn",
    "born": "C. 286 AC",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["Reek"],
    "father": "Balon Greyjoy",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Greyjoy"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Alfie Allen"]
  },
  {
    "name": "Melisandre",
    "gender": "Female",
    "culture": "Asshai",
    "born": "Unknown",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["The Red Woman"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["None"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Carice van Houten"]
  },
  {
    "name": "Gendry",
    "gender": "Male",
    "culture": "None",
    "born": "C. 284 AC",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["None"],
    "father": "Robert Baratheon",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Baratheon"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["A Dance with Dragons"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Joe Dempsie"]
  },
  {
    "name": "Robb Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "283 AC",
    "died": "298 AC",
    "titles": ["King in the North"],
    "aliases": ["None"],
    "father": "Eddard Stark",
    "mother": "Catelyn Stark",
    "spouse": "Jeyne Westerling",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Richard Madden"]
  },
  {
    "name": "Rickon Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "289 AC",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["None"],
    "father": "Eddard Stark",
    "mother": "Catelyn Stark",
    "spouse": "None",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Art Parkinson"]
  },
  {
    "name": "Joffrey Baratheon",
    "gender": "Male",
    "culture": "Westlands",
    "born": "286 AC",
    "died": "298 AC",
    "titles": ["King"],
    "aliases": ["None"],
    "father": "Robert Baratheon",
    "mother": "Cersei Lannister",
    "spouse": "Margaery Tyrell",
    "allegiances": ["House Baratheon"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Jack Gleeson"]
  },
  {
    "name": "Margaery Tyrell",
    "gender": "Female",
    "culture": "Reach",
    "born": "C. 283 AC",
    "died": "Currently Alive",
    "titles": ["Lady"],
    "aliases": ["None"],
    "father": "Mace Tyrell",
    "mother": "Alerie Hightower",
    "spouse": "Joffrey Baratheon",
    "allegiances": ["House Tyrell"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["A Feast for Crows"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Natalie Dormer"]
  },
  {
    "name": "Olenna Tyrell",
    "gender": "Female",
    "culture": "Reach",
    "born": "C. 300 AC",
    "died": "Currently Alive",
    "titles": ["Queen of Thorns"],
    "aliases": ["None"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Tyrell"],
    "books": ["A Storm of Swords", "A Feast for Crows"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Diana Rigg"]
  },
  {
    "name": "Renly Baratheon",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 273 AC",
    "died": "Currently Alive",
    "titles": ["King"],
    "aliases": ["None"],
    "father": "Stannis Baratheon",
    "mother": "Selyse Baratheon",
    "spouse": "Margaery Tyrell",
    "allegiances": ["House Baratheon"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Gethin Anthony"]
  },
  {
    "name": "Stannis Baratheon",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 263 AC",
    "died": "Currently Alive",
    "titles": ["King"],
    "aliases": ["None"],
    "father": "Steffon Baratheon",
    "mother": "Cassana Baratheon",
    "spouse": "Selyse Baratheon",
    "allegiances": ["House Baratheon"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Stephen Dillane"]
  },
  {
    "name": "Euron Greyjoy",
    "gender": "Male",
    "culture": "Ironborn",
    "born": "C. 270 AC",
    "died": "Currently Alive",
    "titles": ["King of the Iron Islands"],
    "aliases": ["Crow's Eye"],
    "father": "Balon Greyjoy",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Greyjoy"],
    "books": ["A Dance with Dragons"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Pilou Asbæk"]
  },
  {
    "name": "Tywin Lannister",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 248 AC",
    "died": "C. 300 AC",
    "titles": ["Lord of Casterly Rock"],
    "aliases": ["The Lion"],
    "father": "Tytos Lannister",
    "mother": "Unknown",
    "spouse": "Joanna Lannister",
    "allegiances": ["House Lannister"],
    "books": ["A Game of Thrones", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Charles Dance"]
  },
  {
    "name": "Robert Baratheon",
    "gender": "Male",
    "culture": "Westlands",
    "born": "263 AC",
    "died": "298 AC",
    "titles": ["King of the Seven Kingdoms"],
    "aliases": ["None"],
    "father": "Steffon Baratheon",
    "mother": "Cassana Baratheon",
    "spouse": "Cersei Lannister",
    "allegiances": ["House Baratheon"],
    "books": ["A Game of Thrones"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Mark Addy"]
  },
  {
    "name": "Balon Greyjoy",
    "gender": "Male",
    "culture": "Ironborn",
    "born": "C. 250 AC",
    "died": "Currently Alive",
    "titles": ["Lord of the Iron Islands"],
    "aliases": ["None"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "Unknown",
    "allegiances": ["House Greyjoy"],
    "books": ["A Game of Thrones"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Patrick Malahide"]
  },
  {
    "name": "Ned Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "C. 250 AC",
    "died": "298 AC",
    "titles": ["Warden of the North"],
    "aliases": ["Eddard Stark"],
    "father": "Rickard Stark",
    "mother": "Unknown",
    "spouse": "Catelyn Stark",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Sean Bean"]
  },
  {
    "name": "Catelyn Stark",
    "gender": "Female",
    "culture": "Northmen",
    "born": "C. 264 AC",
    "died": "Currently Alive",
    "titles": ["Lady of Winterfell"],
    "aliases": ["Cat"],
    "father": "Hoster Tully",
    "mother": "Unknown",
    "spouse": "Eddard Stark",
    "allegiances": ["House Stark"],
    "books": ["A Game of Thrones"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Michelle Fairley"]
  },
  {
    "name": "Viserys Targaryen",
    "gender": "Male",
    "culture": "Valyrian",
    "born": "284 AC",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["None"],
    "father": "Aerys II Targaryen",
    "mother": "Rhaella Targaryen",
    "spouse": "None",
    "allegiances": ["House Targaryen"],
    "books": ["A Game of Thrones", "A Clash of Kings"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Harry Lloyd"]
  },
  {
    "name": "Rickard Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "C. 230 AC",
    "died": "C. 279 AC",
    "titles": ["Lord of Winterfell"],
    "aliases": ["None"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "Unknown",
    "allegiances": ["House Stark"],
    "books": ["None"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["None"]
  },
  {
    "name": "Brandon Stark",
    "gender": "Male",
    "culture": "Northmen",
    "born": "C. 250 AC",
    "died": "C. 278 AC",
    "titles": ["None"],
    "aliases": ["None"],
    "father": "Rickard Stark",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["House Stark"],
    "books": ["None"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["None"]
  },
  {
    "name": "Myrcella Baratheon",
    "gender": "Female",
    "culture": "Westlands",
    "born": "C. 287 AC",
    "died": "Currently Alive",
    "titles": ["Princess"],
    "aliases": ["None"],
    "father": "Robert Baratheon",
    "mother": "Cersei Lannister",
    "spouse": "None",
    "allegiances": ["House Baratheon"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Nell Tiger Free"]
  },
  {
    "name": "Tommen Baratheon",
    "gender": "Male",
    "culture": "Westlands",
    "born": "C. 289 AC",
    "died": "Currently Alive",
    "titles": ["King"],
    "aliases": ["None"],
    "father": "Robert Baratheon",
    "mother": "Cersei Lannister",
    "spouse": "None",
    "allegiances": ["House Baratheon"],
    "books": ["A Clash of Kings", "A Storm of Swords"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Dean-Charles Chapman"]
  },
  {
    "name": "Qyburn",
    "gender": "Male",
    "culture": "None",
    "born": "Unknown",
    "died": "Currently Alive",
    "titles": ["None"],
    "aliases": ["None"],
    "father": "Unknown",
    "mother": "Unknown",
    "spouse": "None",
    "allegiances": ["None"],
    "books": ["A Storm of Swords", "A Feast for Crows"],
    "povBooks": ["None"],
    "tvSeries": ["Game of Thrones"],
    "playedBy": ["Anton Lesser"]
  }
]);
