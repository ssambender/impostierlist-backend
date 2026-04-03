const { Server } = require("socket.io");

// start Socket.io server (with CORS enabled)
const io = require("socket.io")(server, {
  cors: {
    origin: "https://ssambender.github.io",
    methods: ["GET", "POST"],
    credentials: true
  }
});
// const io = new Server(8080, {
//     cors: { origin: "*" }
// });
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const gameStates = {};

// PROMPTS
let personalized_prompts = [
    "Most likely to become president",
    "Best odds of winning a fight against an alligator",
    "Most likely to get married last",
    "Best looking",
    "Most likely to become a famous actor",
    "Best cook",
    "Most adventurous",
    "Most likely to wear socks with sandals",
    "Most likely to wear Crocs to a formal event",
    "Most likely to win a Nobel Prize",
    "Most artistic/creative",
    "Most likely to survive a zombie apocalypse",
    "Best dancer",
    "Most likely to become a millionaire",
    "Most likely to become a famous musician",
    "Most organized person",
    "Best gamer",
    "Most likely to travel the world",
    "Most reliable person",
    "Most likely to write a bestselling novel",
    "Best sense of humor",
    "Most athletic person",
    "Most likely to start their own business",
    "Most fashionable",
    "Most likely to become a superhero",
    "Best problem solver",
    "Most likely to win a reality TV show",
    "Most tech-savvy",
    "Most photogenic",
    "Most likely to become a famous scientist",
    "Best storyteller",
    "Most likely to win a marathon",
    "Most likely to win an Olympic gold medal",
    "Most likely to become a famous comedian",
    "Most likely to become a famous author",
    "Highest IQ",
    "Most likely to win a game of trivia",
    "Gives the most backhanded compliments",
    "Lowest IQ",
    "Worst advice-giver",
    "Most likely to set kitchen on fire while cooking",
    "Most likely to trip over their own feet while walking",
    "Worst at keeping a secret",
    "Most likely to get lost in their own neighborhood",
    "First to get kicked out of a library for being too loud",
    "Would order chicken fingers and fries anywhere",
    "Most likely to get stuck in a revolving door",
    "Who would be the worst at keeping a pet alive",
    "Most likely to photobomb stranger's wedding pics",
    "Who would be the worst at sneaking around",
    "Who would accidentally superglue their hand to face",
    "Only ever takes L’s",
    "Most gullible person",
    "Most commonly mistaken for a celebrity",
    "Worst poker face",
    "Most likely to lock themselves out of their own house",
    "Worst driver",
    "NASCAR driver potential",
    "Never follows directions",
    "Has the most atrocious fits",
    "Gets done the dirtiest by barbershops",
    "Most likely to dye their hair a crazy color",
    "Probably get banned from a petting zoo for trying to ride the animals",
    "Never goes to class",
    "The worst at controlling a shopping cart in a crowded grocery store",
    "Worst at keeping their anger under control",
    "Argues about everything",
    "Most likely to not realize their clothes are inside out",
    "Always has snacks with them",
    "Most likely to skip an event to avoid parallel parking",
    "Most likely to wear mismatched socks",
    "Never gets off their phone",
    "Worst sense of time",
    "Best sense of direction",
    "Overall most knowledgeable",
    "Most extroverted",
    "Most introverted",
    "Most stubborn during an argument",
    "Biggest perfectionist",
    "Best wingman",
    "Has the most shoes in their closet",
    "Has the most browser tabs open right now",
    "Earliest bird",
    "Biggest night owl",
    "Most accident-prone",
    "Most competitive during board games",
    "Spends the most money on takeout and delivery",
    "Biggest sweet tooth",
    "Most states or countries visited",
    "Biggest flirt",
    "Most prone to road rage",
    "Most chronically late",
    "Most indecisive when picking where to eat",
    "Best liar",
    "Has the loudest, most recognizable laugh",
    "Most easily distracted",
    "Biggest hoarder of random sentimental items",
    "Hardest to stress out / most naturally chill",
    "Has the worst handwriting",
    "First to die in a horror movie",
    "Most likely to accidentally join a cult thinking it was a yoga retreat",
    "Most likely to talk their way out of a speeding ticket",
    "Most likely to leave 50 unread text messages",
    "Best person to be stranded on a desert island with",
    "Most likely to spend two hours picking a movie only to fall asleep 10 minutes in",
    "Most likely to order delivery from a restaurant that is a two-minute walk away",
    "Most likely to accidentally reply-all to a company-wide email",
    "Most likely to break a brand new phone within a week",
    "Most likely to believe a ridiculous conspiracy theory",
    "Most likely to give a fake name at a coffee shop just for fun",
    "Best taste in music",
    "Most likely to be secretly living a double life",
    "Most likely to ruin a surprise party",
    "Most likely to Irish exit a social event",
    "Most likely to start a podcast that only gets three listeners",
    "Worst spending habits",
    "Most likely to win a food eating contest",
    "Most likely to drop their phone on their own face while lying in bed",
    "Most likely to be recognized by name by the staff at a fast food place",
    "Most likely to  wear their shirt backwards all day without noticing",
    "Best at assembling IKEA furniture",
    "Worst quiet whisperer",
    "Best at keeping a straight face in serious situations",
    "Best at handling ridiculously spicy food",
    "Worst at handling even a little bit of spice",
    "Best at packing light for a vacation",
    "Worst at packing (brings 10 outfits for a two-day trip)",
    "Best photographer for the group (knows all the right angles)",
    "Worst photographer for the group (always gets the thumb in the picture)",
    "Best at giving thoughtful gifts",
    "Best at navigating without looking at a GPS"
];
let themes = {
    "Candy": {
        "questions": [
            "Best candy overall",
            "Best movie theater candy",
            "Most overrated candy",
            "Worst candy overall",
            "Weirdest candy",
            "Most iconic halloween candy",
            "Best candy to share with a group",
            "Best sour candy",
            "Most likely to get stuck in your teeth for hours",
            "Most polarizing candy (you either love it or hate it)",
            "Best gas station candy",
            "Most likely to break a tooth",
            "Best candy to mix into popcorn",
            "Best candy for refreshing your breath"
        ],
        "items": [
            "Kit-Kat",
            "Snickers",
            "100 Grand",
            "Skittles",
            "Reese’s Cup",
            "Circus Peanuts",
            "Starbursts",
            "Twizzlers",
            "Take 5",
            "Candy Corn",
            "Lemonheads",
            "Hershey Kisses",
            "Twix",
            "Butterfinger",
            "Whopper",
            "Gummy Bears",
            "Gummy Worms",
            "Mike and Ike",
            "Swedish Fish",
            "Good & Plenty",
            "Hot Tamale",
            "Heath",
            "DOTS",
            "Tootsie Roll",
            "Almond Joy",
            "Air Head",
            "Hershey’s Bar",
            "Crunch Bar",
            "Peeps",
            "Pixy Stix",
            "Milky Way",
            "SweeTarts",
            "Nerds",
            "Nerds Rope",
            "Nerds Gummy Clusters",
            "Fun Dip",
            "Candy Necklace",
            "PEZ",
            "Blow Pop",
            "Laffy Taffy",
            "3 Musketeers",
            "Sour Patch Kids",
            "Sour Patch Kids Watermelon",
            "Jelly Beans",
            "Chalk Sticks",
            "Sour Skittles",
            "Milk Duds",
            "York",
            "Junior Mints",
            "Smarties",
            "Jolly Ranchers"
        ]
    },
    "Cartoon Characters": {
        "questions": [
            "Funniest cartoon character",
            "Most attractive cartoon characters",
            "Character who would make the best friend",
            "Character most likely to get on my nerves",
            "Most quotable character",
            "Character you'd want as your bodyguard",
            "Character who would survive the longest in the real world",
            "Character who would be the most fun at a party",
            "Most likely to accidentally destroy a city",
            "Character most likely to be a millionaire in real life",
            "Character with the coolest house",

            "Character with the most iconic voice",
            "Smartest cartoon character",
            "Most relatable cartoon character",
            "Best cartoon villain of all time",
            "Most underrated cartoon character",
            "Character most likely to win a reality TV show",
            "Character who gives the best advice",
            "Character who would be the worst roommate",
            "Character with the best catchphrase",
            "Character you’d trust with a huge secret",
            "Character you’d most want to go on a road trip with"
        ],
        "items": [
            "Mickey Mouse",
            "Spongebob",
            "Patrick",
            "Squidward",
            "Ms. Puff",
            "Mr. Krabs",
            "Dr. Doofenshmirtz",
            "Mordecai",
            "Perry the Platypus",
            "Rigby",
            "Gumball",
            "Finn",
            "Jake the Dog",
            "Johnny Test",
            "Phineas",
            "Ferb",
            "Caillou",
            "Peppa Pig",
            "Timmy Turner",
            "Cosmo",
            "Wanda",
            "Scooby Doo",
            "Shaggy",
            "Velma",
            "Homer Simpson",
            "Bart Simpson",
            "Lisa Simpson",
            "Marge Simpson",
            "Peter Griffin",
            "Dora the Explorer",
            "Ms. Frizzle",
            "Dipper Pines",
            "Mabel Pines",
            "Bender",
            "Rick Sanchez",
            "Morty Smith",
            "Bugs Bunny",
            "Lola Bunny",
            "Fred Flintstone",
            "Yogi Bear",
            "Courage the Cowardly Dog",
            "Ben 10",
            "Shego",
            "Danny Phantom",
            "Raven",
            "Beast Boy",
            "Tom the Cat",
            "Jerry the Mouse",
            "Donald Duck",
            "Goofy",
            "Daffy Duck",
            "Tweety Bird",
            "Sylvester the Cat",
            "Wile E. Coyote",
            "Road Runner",
            "Popeye the Sailor",
            "Charlie Brown",
            "Snoopy",
            "Garfield",
            "Kim Possible",
            "Aang",
            "Katara",
            "Bluey",
            "Bingo Heeler",
            "Stewie Griffin",
            "Brian Griffin",
            "Eric Cartman",
            "Butters Stotch",
            "Bill Cipher",
            "Zim",
            "Samurai Jack",
            "Bubbles",
            "Blossom",
            "Buttercup",
            "Mojo Jojo",
            "Dexter",
            "Johnny Bravo",
            "Starfire",
            "Robin",
            "Cyborg"
        ]
    },
    "Video Games": {
        "questions": [
            "Best game fanbase",
            "Games with best graphics",
            "Most fun game",
            "Most timeless game",
            "Best game soundtrack",
            "Hardest game",
            "Most overrated game",
            "Most immersive game",
            "Best game to play with friends",
            "Best story/narrative",
            "Worst microtransactions or pay-to-win mechanics",
            "Most satisfying combat/gameplay loop",
            "Best open world to explore",
            "Most disappointing sequel",
            "Best art style",
            "Game that made you the most emotional",
            "Most stressful game experience",
            "Best character customization",
            "Most replayable game of all time"
        ],
        "items": [
            "Minecraft",
            "Mario Bros",
            "Among us",
            "Jackbox",
            "The Legend of Zelda",
            "Fortnite",
            "Dark Souls",
            "Red Dead Redemption",
            "Overwatch",
            "Slapshot",
            "Madden",
            "Snake Game",
            "Solitaire",
            "Candy Crush",
            "Angry Birds",
            "Terraria",
            "Fall Guys",
            "The Witcher",
            "Mario Kart",
            "Smash Bros",
            "League of Legends",
            "Call of Duty",
            "Tetris",
            "Pacman",
            "Minesweeper",
            "Bloons Tower Defense",
            "Grand Theft Auto V",
            "The Last of Us",
            "God of War",
            "Elden Ring",
            "Animal Crossing: New Horizons",
            "Skyrim",
            "Pokemon",
            "Balatro",
            "Pokemon Go",
            "Halo: Combat Evolved",
            "Portal 2",
            "Counter-Strike",
            "Final Fantasy VII",
            "Street Fighter II",
            "Resident Evil 4",
            "Sonic the Hedgehog",
            "Roblox",
            "Valorant",
            "The Sims 4",
            "Stardew Valley",
            "Doom",
            "Cyberpunk 2077",
        ]
    },
    "Sports": {
        "questions": [
            "Most fun sport to play",
            "Most fun sport to watch",
            "Most overrated sport",
            "Most underrated sport",
            "Most badass sport",
            "Most dangerous sport",
            "Sport with most skill required",
            "Most physically demanding sport",
            "Best sport to play at a tailgate",
            "Sport with the most annoying fanbase",
            "Sport that is most boring to watch on TV",
            "Best sport for a first date",
            "Sport with the coolest uniforms",
            "Most expensive sport to play",
            "Sport that requires the most teamwork",
            "Best sport to play in high school",
            "Best sport for staying in shape",
            "Sport with the most iconic stadium atmosphere",
            "Most relaxing sport to play",
            "Sport that relies the most on luck",
            "Best Olympic sport to watch",
            "Sport with the most confusing rules",
            "Most intense individual sport",
            "Sport you’d most want your future kid to play",
        ],
        "items": [
            "Football",
            "Soccer",
            "Baseball",
            "Hockey",
            "Basketball",
            "Cricket",
            "Rock Climbing",
            "Dancing",
            "Softball",
            "Wrestling",
            "Fencing",
            "Jousting",
            "Boxing",
            "Swimming",
            "Martial Arts",
            "Track & Field",
            "Biking",
            "Poker",
            "Curling",
            "Surfing",
            "Skateboarding",
            "Golf",
            "Tennis",
            "Spikeball",
            "Pickleball",
            "Dodgeball",
            "Ping Pong",
            "Badminton",
            "Archery",
            "Volleyball",
            "Snowboarding",
            "Skiing",
            "Bowling",
            "Rugby",
            "Alligator Wrestling",
            "Lacrosse",
            "Crossfit",
            "E-Sports",
            "Poker",
            "Kickball",
            "Ultimate Frisbee",
            "Fishing",
            "Handball",
            "Water Polo",
            "Synchronized Swimming",
            "Sumo Wrestling",
            "Horseback Riding",
            "Gymnastics",
            "Cheerleading",
            "Figure Skating",
            "Motorsports",
            "Cornhole",
            "Billiards",
            "Darts",
            "Rowing",
            "Powerlifting",
            "Squash",
            "High Dive",
            "Quidditch"
        ]
    },
    "States": {
        "questions": [
            "Best state outline shape",
            "Best state flag",
            "State with the worst people",
            "Best overall state",
            "State with best culture",
            "State with most beautiful nature",
            "Best vacation state",
            "Why would anyone want to live there?",
            "State with the most to do",
            "State with the best food",
            "Most underrated state to visit",
            "State with the most confusing accents",
            "Best state to live in if you're a millionaire",
            "Worst state for weather",
            "State you'd move to if you had to leave your current one",
            "State with the coolest name",
            "Most forgettable state",
            "State with the best national parks",
            "Best state for a cross-country road trip stop",
            "State that feels the most like its own country",
            "State with the scariest wildlife",
            "Best state for sports fans",
            "State most likely to survive an apocalypse",
            "State with the friendliest locals",
            "Most overrated vacation state",
            "State with the best history",
            "State you’d never want to drive through",
            "Best state for music lovers",
            "State with the most unique architecture"
        ],
        "items": [
            "Alabama",
            "Alaska",
            "Arizona",
            "Arkansas",
            "California",
            "Colorado",
            "Connecticut",
            "Delaware",
            "Florida",
            "Georgia",
            "Hawaii",
            "Idaho",
            "Illinois",
            "Indiana",
            "Iowa",
            "Kansas",
            "Kentucky",
            "Louisiana",
            "Maine",
            "Maryland",
            "Massachusetts",
            "Michigan",
            "Minnesota",
            "Mississippi",
            "Missouri",
            "Montana",
            "Nebraska",
            "Nevada",
            "New Hampshire",
            "New Jersey",
            "New Mexico",
            "New York",
            "North Carolina",
            "North Dakota",
            "Ohio",
            "Oklahoma",
            "Oregon",
            "Pennsylvania",
            "Rhode Island",
            "South Carolina",
            "South Dakota",
            "Tennessee",
            "Texas",
            "Utah",
            "Vermont",
            "Virginia",
            "Washington",
            "West Virginia",
            "Wisconsin",
            "Wyoming"
        ]
    },
    "Countries": {
        "questions": [
            "Country with the best natural landscapes",
            "Coolest national landmarks",
            "Best vacation country",
            "Country with the best food",
            "Most romantic country",
            "Most adventurous country",
            "Country you LEAST want to visit",
            "Country with the most interesting history",
            "Best country for a solo backpacking trip",
            "Country that feels the most like the future",
            "Country with the friendliest locals",
            "Most underrated country for tourists",
            "Country with the best fashion/style",
            "Country you’d move to if you had to leave your own",
            "Best country for outdoor sports",
            "Country with the most beautiful architecture",
            "Country with the most iconic flag",
            "Country with the most chill/relaxed vibes",
            "Most expensive country to visit",
            "Country where you’d most likely get lost"
        ],
        "items": [
            "India",
            "China",
            "United States",
            "Indonesia",
            "Pakistan",
            "Nigeria",
            "Brazil",
            "Bangladesh",
            "Russia",
            "Mexico",
            "Japan",
            "Ethiopia",
            "Philippines",
            "Egypt",
            "Vietnam",
            "Iran",
            "Turkey",
            "Germany",
            "Thailand",
            "France",
            "United Kingdom",
            "Tanzania",
            "South Africa",
            "Italy",
            "Kenya",
            "Colombia",
            "South Korea",
            "Spain",
            "Canada",
            "Ireland",
            "England",
            "Greenland",
            "Iceland",
            "Ukraine"
        ]
    },
    "Cities": {
        "questions": [
            "City with coolest landmarks",
            "Best vacation city",
            "City with the best food",
            "City with the most to do",
            "Most adventurous city",
            "Most iconic city"
        ],
        "items": [
            "Paris",
            "Bali",
            "New York City",
            "Rome",
            "Tokyo",
            "Rio de Janeiro",
            "Bangkok",
            "Dubai",
            "Cape Town",
            "Mumbai",
            "Los Angeles",
            "Houston",
            "Philadelphia",
            "London",
            "Sydney",
            "Berlin",
            "Mexico City",
            "Las Vegas"
        ]
    },
    "Cuisine Types": {
        "questions": [
            "Best food for a special occasion",
            "Most flavorful cuisine",
            "Easiest type of food to cook",
            "Best overall cuisine",
            "Most likely to make you sick"
        ],
        "items": [
            "Italian",
            "Chinese",
            "Mexican",
            "Indian",
            "American",
            "Mediterranean",
            "French",
            "Thai",
            "Korean",
            "Vietnamese",
            "Greek"
        ]
    },
    "Drinks": {
        "questions": [
            "Most refreshing drinks",
            "Most overrated drinks",
            "Best tasting drinks",
            "Best party drink",
            "Best drink with a meal"
        ],
        "items": [
            "Water",
            "Pepsi",
            "Coke",
            "Sprite",
            "Orange Fanta",
            "Lemonade",
            "Pink Lemonade",
            "Root Beer",
            "Shirley Temple",
            "Wine",
            "Apple Juice",
            "Orange Juice",
            "Smoothies",
            "Milk",
            "Hot Chocolate",
            "Coffee",
            "Tea",
            "Chocolate Milk",
            "Capri Sun",
            "Grape Juice"
        ]
    },
    "Animals": {
        "questions": [
            "Most majestic animals",
            "Cutest animals",
            "Best animals to have as a pet",
            "Animals to NOT let your kids around"
        ],
        "items": [
            "Dog",
            "Cat",
            "Elephant",
            "Giraffe",
            "Otter",
            "Alligator",
            "Goldfish",
            "Puma",
            "Pigeon",
            "Tiger",
            "Lion",
            "Crab",
            "Monkey",
            "Raccoon",
            "Llama",
            "Kangaroo",
            "Koala",
            "Grizzly Bear",
            "Butterfly",
            "Bumblebee",
            "Rabbit",
            "Bald Eagle",
            "Gorilla",
            "Snake",
            "Polar Bear",
            "Dolphin",
            "Toucan",
            "Worm",
            "Hippo",
            "Zebra"
        ]
    },
    "Music Genres": {
        "questions": [
            "Best overall music genre",
            "Most overrate type of music",
            "Most annoying type of music",
            "Genre with best musicians",
            "Genre with best lyrics",
            "Best genre for dancing",
            "Best music for studying",
            "Best music to workout to",
            "Most romantic",
            "Safest genre while on aux"
        ],
        "items": [
            "Country",
            "Rap",
            "Pop",
            "Dance",
            "EDM",
            "Metal",
            "Rock",
            "Classical",
            "Blues",
            "Sad",
            "Alternative",
            "R&B",
            "Reggae",
            "Jazz"
        ]
    },
    "Artists": {
        "questions": [
            "Best overall artist",
            "Best live performances",
            "Most passionate fanbase",
            "Most influential artist",
            "Artist with best album cover art",
            "Artist with best lyrics",
            "Haven't made a single bad song",
            "Most popular/relevant artist",
            "Artist I would drop kick on sight"
        ],
        "items": [
            "Elvis Presley",
            "KISS",
            "Taylor Swift",
            "Kanye West",
            "Red Hot Chile Peppers",
            "Ice Spice",
            "Justin Bieber",
            "Lil Wayne",
            "Queen",
            "The Beatles",
            "Katy Perry",
            "Jackson 5",
            "Michael Jackson",
            "Nirvana",
            "Pink Floyd",
            "Bob Dylan",
            "Prince",
            "Led Zeppelin",
            "Beyoncé",
            "Luke Combs",
            "Ed Sheeran",
            "Frank Sinatra",
            "Jack Johnson",
            "King Harvest",
            "Phil Collins",
            "Avicii",
            "Cat Stevens",
            "Bruce Springsteen",
            "Kenny Chesney",
            "Toby Keith",
            "Pitbull",
            "Bob Marley",
            "Billy Joel",
            "U2",
            "Lil Uzi Vert",
            "Billy Joel",
            "Elton John",
            "The Beach Boys",
            "Guns N’ Roses",
            "Kenny Loggins",
            "DaBaby",
            "Imagine Dragons",
            "The Cranberries",
            "Daft Punk",
            "Bruno Mars",
            "Jake Owen",
            "Morgan Wallen",
            "One Direction",
            "Marvin Gaye",
            "The Police",
            "Maroon 5",
            "Adele",
            "Tate McRae",
            "Black Pink",
            "BTS",
            "Mac Miller",
            "Jim Croce",
            "Soulja Boy",
            "Joji",
            "Train",
            "The Chainsmokers",
            "Journey",
            "Aerosmith",
            "The Jackson 5",
            "Fleetwood Mac",
            "Dua Lipa",
            "Doja Cat"
        ]
    },
    "Snacks": {
        "questions": [
            "Best overall snacks",
            "Best snack for parties",
            "Most overrated snacks",
            "Most underrated snacks",
            "Best snack for on-the-go",
            "Best snack while studying",
            "Best for eating while watching TV",
            "Best snack to eat at a funeral"
        ],
        "items": [
            "Pretzels",
            "Goldfish",
            "Popcorn",
            "Potato Chips",
            "Tortilla Chips",
            "Cheetos",
            "Flamin’ Hot Cheetos",
            "Doritos",
            "Trail Mix",
            "Sunflower Seeds",
            "Cheese Balls",
            "Cheese Puffs",
            "Takis",
            "Triscuits",
            "SunChips",
            "Animal Crackers",
            "Graham Crackers",
            "Teddy Grahams",
            "Rice Krispies",
            "Roasted Nuts",
            "Kettle Corn",
            "Chex Mix",
            "Cheez-Its",
            "Pringles",
            "Oreos"
        ]
    },
    "Board Games": {
        "questions": [
            "Takes the longest to play",
            "Most fun game to play",
            "Hardest game to understand",
            "Best to play in a car",
            "Better with more people",
            "Best game to settle a dispute",
            "All skill no luck required",
            "All luck no skill type game",
            "Most boring board game",
            "Most rage inducing game",
            "Most addicting game"
        ],
        "items": [
            "Risk",
            "Monopoly",
            "Life",
            "Uno",
            "Go Fish",
            "Chess",
            "Checkers",
            "Connect 4",
            "Catan",
            "Settlers",
            "Battleship",
            "Shutes and Ladders",
            "Scrabble",
            "Yahtzee",
            "Jenga",
            "Guess Who?",
            "Sorry!",
            "Trouble",
            "Trivial Pursuit",
            "Clue",
            "Boggle",
            "Candy Land",
            "Pictionary",
            "Telestrations",
            "Twister",
            "Go",
            "Pass the Pigs",
            "Operation"
        ]
    },
    "Types of Pretzels": {
        "questions": [
            "Best type of pretzel",
            "Most slept on pretzel type",
            "Best pretzel shape",
            "Best party pretzels",
            "Best pretzel to use as a weapon",
            "Most awkward pretzel to eat"
        ],
        "items": [
            "Soft Pretzels",
            "Cinnamon Pretzels",
            "Sourdough Hard Pretzels",
            "Pretzel Rods",
            "Pretzel Sticks",
            "Peanut Butter Pretzels",
            "Buffalo Pretzels",
            "Pretzel Nuggets",
            "Chocolate Pretzels",
            "Pretzel Hotdogs",
            "Pretzel Snaps",
            "Pretzel Twists",
            "Honey Mustard Pretzels"
        ]
    },
    "Superheroes": {
        "questions": [
            "Most overrated superhero",
            "Best superhero overall",
            "Most underrated superhero",
            "Superhero with best sidekick",
            "Superhero with coolest powers",
            "Most badass superhero",
            "Superhero with best comics",
            "Superhero with best movies",
            "Superhero with the best enemies",
            "Damn, I Wish I Were Them",
            "Superhero I could beat in a 1v1",
            "Would NOT want to be their enemy"
        ],
        "items": [
            "Batman",
            "Superman",
            "Deadpool",
            "Spiderman",
            "Hulk",
            "Thor",
            "Black Widow",
            "Hawkeye",
            "The Flash",
            "Aquaman",
            "Scooby Doo",
            "Ant-Man",
            "Batwoman",
            "Black Panther",
            "Captain America",
            "Captain Marvel",
            "Ghost Rider",
            "Star Lord",
            "Rocket Raccoon",
            "Groot",
            "Doctor Strange",
            "Iron Man",
            "Wonder Woman",
            "Teenage Mutant Ninja Turtles",
            "Drax",
            "Robin",
            "Green Lantern",
            "Mr. Fantastic",
            "Human Torch",
            "Silver Surfer",
            "Martian Manhunter",
            "Daredevil",
            "Wolverine",
            "Starfire",
            "Shazam"
        ]
    },
    "Cars": {
        "questions": [
            "Coolest car type",
            "Car that has the worst drivers",
            "Funnest car to steal",
            "Car that feels the safest",
            "Best car to drive to the hopsital",
            "Most likely car to be stolen",
            "Best car to drive to prom",
            "Car able to fit the most children in"
        ],
        "items": [
            "Jeep",
            "Prison bus",
            "Lamborghini",
            "Kia Soul",
            "Police car",
            "Toyota",
            "Firetruck",
            "Ambulance",
            "Semi-truck",
            "Honda",
            "Dodge Ram",
            "Ford F150",
            "Minivan",
            "Limo",
            "School bus",
            "Ferrari",
            "Mustang",
            "Camaro",
            "Porsche",
            "Cadillac",
            "Toyota Camry",
            "Subaru WRX",
            "Honda CRV",
            "Honda civic",
            "Jeep truck",
            "Student driver car",
            "Parking authority car",
            "Safari car",
            "Clown car"
        ]
    },
    "Animated Disney Movies": {
        "questions": [
            "Best Disney soundtrack",
            "Disney movie with the best characters",
            "Disney movie with the best art",
            "Funniest Disney movie",
            "Disney movie with the best ending",
            "Most re-watchable Disney movie",
            "Most overrated Disney move",
            "Most iconic Disney movie",
            "Best Disney movie to be in"
        ],
        "items": [
            "Finding Nemo",
            "Pocahontas",
            "Snow White and the Seven Dwarves",
            "UP",
            "Mulan",
            "Frozen",
            "Brave",
            "Encanto",
            "Toy Story",
            "Cars",
            "Tarzan",
            "Jungle Book",
            "Coco",
            "The Lion King",
            "Beauty and the Beast",
            "Aladdin",
            "Cinderella",
            "Zootopia",
            "Moana",
            "The Little Mermaid",
            "Monsters Inc.",
            "101 Dalmatians",
            "Princess and the Frog",
            "Ratatouille",
            "Inside Out",
            "Finding Dory",
            "Bambi",
            "Big Hero 6",
            "Lilo & Stitch",
            "Monsters University",
            "Pinocchio",
            "The Jungle Book"
        ]
    },
    "Gas Stations": {
        "questions": [
            "Gas stations with the best food",
            "Cheapest overall gas stations",
            "Cleanest gas stations",
            "Most convenient locations",
            "Most well known gas stations"
        ],
        "items": [
            "Wawa",
            "Buccees",
            "Sheetz",
            "Rutters",
            "Sunoco",
            "Shell",
            "Exxon",
            "Gulf",
            "Speedway",
            "Hess",
            "Lukoil",
            "Chevron",
            "Sinclair"
        ]
    },
    "Fast Food": {
        "questions": [
            "Best overall fast food",
            "Unhealthiest fast food",
            "Most well known fast food",
            "Fattest people",
            "Food most likely to get a lawsuit",
            "Most overpriced fast food",
            "Fast food with the best fries",
            "Fast food with the best dessert",
            "Slowest fast food service",
            "Nicest employees",
            "Worst employees",
            "Fast food place I would sleep at",
            "Best happy meal toys",
            "Most likely to eat off the floor"
        ],
        "items": [
            "Chick-fil-A",
            "Sonic",
            "Friendly’s",
            "Five Guys",
            "McDonalds",
            "Burger King",
            "Wendys",
            "Jack in the box",
            "In-N-Out",
            "Raising Canes",
            "Sbarro",
            "Chipotle",
            "Panda Express",
            "KFC",
            "Subway",
            "Taco Bell",
            "Del Taco",
            "Dairy Queen",
            "White Castle",
            "Popeyes",
            "Wing Stop",
            "Shake Shack",
            "Bojangles",
            "Jersey Mike’s",
            "Papa John’s",
            "Auntie Anne’s"
        ]
    },
    "Wing Sauces": {
        "questions": [
            "Best wing sauce overall",
            "Spiciest wing sauce",
            "Worst wing sauce",
            "Most likely to make you cry",
            "Best with bleu cheese",
            "Wing sauce that makes you act up"
        ],
        "items": [
            "Buffalo",
            "Garlic Parm",
            "Lemon Pepper",
            "Mild",
            "Medium",
            "BBQ",
            "Honey BBQ",
            "Spicy BBQ",
            "Asian Zing",
            "Caribbean Jerk",
            "Jammin’ Jalapeno",
            "Mango Habanero",
            "Blazin’ Teriyaki",
            "Chipotle",
            "Smoked"
        ]
    },
    "Restaurants": {
        "questions": [
            "Best food overall",
            "Best restaurant for a date",
            "Best restaurant atmosphere",
            "Best restaurant to take the family",
            "Best service overall",
            "Restaurant with worst menu choices"
        ],
        "items": [
            "Olive Garden",
            "Texas Roadhouse",
            "Bonefish Grill",
            "Outback Steakhouse",
            "Waffle House",
            "Cracker Barrel",
            "Cheesecake Factory",
            "Applebee’s",
            "Buffalo Wild Wings",
            "Longhorn Steakhouse",
            "Mission BBQ",
            "Red Robin",
            "Panera Bread",
            "Plaza Azteca",
            "On The Border",
            "P.F. Changs",
            "Max and Ermas",
            "Hells Kitchen",
            "Golden Corral",
            "Hard Rock Cafe",
            "Red Lobster"
        ]
    },
    "Movies": {
        "questions": [
            "Movies with best soundtracks",
            "Best movie overall",
            "Funniest movie",
            "Best for a movie night",
            "Most quotable movie",
            "Best to see in theater",
            "Movies with the best endings",
            "Movie most in need of a spinoff",
            "Movie with the best characters"
        ],
        "items": [
            "Godfather",
            "Alien",
            "Goodfellas",
            "Ferris Bueller’s Day Off",
            "Shawshank Redemption",
            "LOTR",
            "Wolf of Wall Street",
            "Django Unchained",
            "Jump Street",
            "Harry Potter",
            "Star Wars",
            "Star Trek",
            "Stuart Little",
            "Chicken Little",
            "The Lorax",
            "Oppenheimer",
            "Barbie",
            "Back to the Future",
            "Superbad",
            "Fast and Furious",
            "Zoolander",
            "Ghost Busters",
            "Remember the Titans",
            "The Sandlot",
            "Night at the Museum",
            "The Matrix",
            "Avatar",
            "Footloose",
            "Grease",
            "Teen Beach Movie",
            "Bill and Teds Excellent Adventure",
            "Shrek",
            "Dark Knight",
            "2001: A Space Odyssey",
            "Interstellar",
            "Space Jam",
            "Raiders of the Lost Ark",
            "Mary Poppins",
            "Sound of Music",
            "Muppet Movie",
            "Men In Black",
            "Top Gun",
            "Jaws",
            "Blade Runner",
            "Pirates of the Caribbean",
            "Airplane!",
            "Blazing Saddles",
            "High School Musical"
        ]
    },
    "Ice Cream Flavors": {
        "questions": [
            "Best milkshake flavor",
            "Best ice cream flavor overall",
            "Most overrated ice cream flavor",
            "Worst ice cream flavor",
            "Best ice cream flavor for toppings",
            "Best ice cream flavor to bathe in",
            "Ice cream flavor that cheers you up the most"
        ],
        "items": [
            "Vanilla",
            "Chocolate",
            "Strawberry",
            "Mint Chocolate Chip",
            "Butter Pecan",
            "Rocky Road",
            "Pistachio",
            "Cookies and Cream",
            "Sea Salt and Caramel",
            "Coffee",
            "Raspberry",
            "Cherry",
            "Neapolitan",
            "Root Beer Float",
            "Banana Split",
            "Chocolate Chip Cookie Dough",
            "Jimmy Fallon Tonight Dough",
            "Half Baked",
            "M&M",
            "Thin mint"
        ]
    },
    "TV Series": {
        "questions": [
            "Best overall TV series",
            "TV show with best fans",
            "TV series with best plot",
            "Most overrated TV show",
            "Best TV series to binge"
        ],
        "items": [
            "Breaking Bad",
            "Friends",
            "Sherlock",
            "Always Sunny",
            "Better Call Saul",
            "Sopranos",
            "Stranger Things",
            "The Office",
            "Parks and Rec",
            "Suits",
            "Big Bang Theory",
            "Young Sheldon",
            "Game of Thrones",
            "Walking Dead",
            "Yellowstone",
            "Last of Us",
            "Black Mirror",
            "Peaky Blinders",
            "Modern Family",
            "American Horror Story",
            "Seinfeld",
            "The Wire"
        ]
    },
    "Cartoons": {
        "questions": [
            "Best cartoon overall",
            "Cartoon with best quotes",
            "Worst cartoon fanbase",
            "Cartoon with best merchandise",
            "Most in need of a Reboot",
            "Cartoon with best memes",
            "Cartoon with best theme song"
        ],
        "items": [
            "The Simpsons",
            "Rick and Morty",
            "Spongebob",
            "Tom and Jerry",
            "Regular Show",
            "Futurama",
            "Scooby Doo",
            "Danny Phantom",
            "Courage the Cowardly Dog",
            "Teen Titans Go",
            "Amazing World of Gumball",
            "Total Drama Island",
            "BoJack Horseman",
            "The Flintstones",
            "Arthur",
            "Bob's Burgers",
            "Rugrats",
            "Family Guy",
            "American Dad",
            "South Park",
            "Gravity Falls",
            "Looney Tunes",
            "Curious George",
            "Berenstain Bears",
            "Franklin",
            "Peppa Pig",
            "Adventure Time",
            "Fairly Odd Parents",
            "Dora",
            "Phineas and Ferb",
            "Powerpuff Girls"
        ]
    },
    "Types of Crime": {
        "questions": [
            "Funniest types of crimes",
            "Favorite types of crime",
            "Least moral types of crime",
            "Would NOT want to be cellmates with",
            "Worst type of person",
            "Most probable crime you'd commit"
        ],
        "items": [
            "Arson",
            "Assault",
            "Kidnapping",
            "Murder",
            "Jaywalking",
            "Counterfeit",
            "Underage drinking",
            "DUI",
            "Illegal drugs",
            "Incest",
            "Hate Crime",
            "Genocide",
            "Robbery",
            "Embezzling",
            "Money laundering",
            "Breaking and entering",
            "Littering",
            "Vehicular manslaughter",
            "Tropical fish trade",
            "Slavery",
            "Theft/Shoplifting",
            "Being a witch",
            "Public nudity",
            "Throwing alligator into drive-thru window",
            "Cannibalism",
            "Forging a signature",
            "Playing Hhooky from school",
            "Domestic abuse",
            "Licking doorknobs",
            "Mustard gas",
            "Cutting someone’s parachute cord",
            "Attempted murder",
            "Identity theft",
            "Stolen valor",
            "Child abandonment",
            "Leaving a dog in a hot car",
            "Disturbing the peace",
            "Bringing scissors through TSA",
            "Escaping prison",
            "Speeding while driving",
            "Not using a turn signal",
            "Tax evasion",
            "Stalking"
        ]
    },
    "Mythic Creatures" : {
        "questions": [
            "Most terrifying creature",
            "Most majestic creature",
            "Scariest mythic creature",
            "Most iconic mythic creature",
            "Would make the best pet",
            "Easiest to beat in a fight",
            "Creature msot likely to exist"
        ],
        "items": [
            "Dragon",
            "Phoenix",
            "Kraken",
            "Griffin",
            "Unicorn",
            "Troll",
            "Bigfoot",
            "Lochness Monster",
            "Minotaur",
            "Basilisk",
            "Pegasus",
            "Centaur",
            "Mermaid",
            "Cyclops",
            "Giant"
        ]
    },
    "Vacations" : {
        "questions": [
            "Most expensive",
            "Best vacation overall",
            "Most tiring",
            "Most overrated",
            "Best vacation if you're alone",
            "Best for the family",
            "Most to do"
        ],
        "items": [
            "Hawaii",
            "Paris",
            "Climbing Mount Everest",
            "Las Vegas",
            "Europe Backpacking Trip",
            "Disney",
            "Caribbean Cruise",
            "African Safari",
            "Rome",
            "London",
            "New York",
            "Ireland",
            "Surfing",
            "Beach",
            "Snorkling",
            "Kayaking",
            "Camping",
            "The zoo",
            "Seaworld"
        ]
    },
    "Historical Figures" : {
        "questions": [
            "Most influential person",
            "Most badass historical figure",
            "Most charismatic person",
            "Would not want to make them mad",
            "Would make the best friend",
            "Hardest to beat in hand-to-hand",
            "Probably the best chef",
            "Would make the best wingman",
            "Has the most in common with you",
            "Would win in a foot race",
            "Probably the best at basketball",
            "BRING THEM BACK!!"
        ],
        "items": [
            "George Washington",
            "Genghis Khan",
            "Cleopatra",
            "Napoleon Bonaparte",
            "Abraham Lincoln",
            "Alexander the Great",
            "Adolf Hitler",
            "Leonardo da Vinci",
            "Jesus",
            "William Shakespeare",
            "Queen Victoria",
            "Martin Luther King Jr.",
            "John F Kennedy",
            "Benjamin Franklin",
            "Nikola Tesla",
            "Elvis Presley",
            "Marilyn Monroe",
            "Vincent van Gogh",
            "Thomas Jefferson",
            "Karl Marx",
            "Joseph Stalin",
            "Albert Einstein",
            "Robert Oppenheimer",
            "Isaac Newton"
        ]
    },
    "Fictional Worlds" : {
        "questions": [
            "Coolest overall world",
            "Would make the best home",
            "Probably has the nicest weather",
            "Most iconic fictional world",
            "Most dangerous fictional world",
            "Would NOT want to visit"
        ],
        "items": [
            "Middle-Earth",
            "Hogwarts",
            "Westeros",
            "Narnia",
            "The Matrix",
            "The Upside Down dimension",
            "Pandora",
            "Wakanda",
            "Wonderland",
            "Vice City",
            "Animal Crossing island",
            "Wii sports resort",
            "Skyrim",
            "DUNE",
            "Barbie World",
            "The Backrooms"
        ]
    },
    "Videogame Characters" : {
        "questions": [
            "Easiest to beat in a fight",
            "Hardest to beat in a fight",
            "Most attractive game character",
            "Character with the best vibes",
            "Best dressed game character",
            "Would make the best friend",
            "Would be the best wingman",
            "Dumbest videogame character",
            "Most interesting lore",
            "Most annoying character",
            "Most badass game character"
        ],
        "items": [
            "Mario",
            "Luigi",
            "Koopa",
            "Bowser",
            "Minecraft Steve",
            "Freddy",
            "Chica",
            "Bonnie",
            "Foxy",
            "Princess Peach",
            "Red angry bird",
            "Black angry bird",
            "Pikachu",
            "Q*bert",
            "Pacman",
            "Blinky",
            "Yoshi",
            "Kirby",
            "Sonic the Hedgehog",
            "Donkey Kong",
            "Lara Croft",
            "Master Chief",
            "Fortnite default skin",
            "Peely",
            "Om Nom",
            "Creeper",
            "Sans",
            "Zelda",
            "Link",
            "Mii from Wii sports",
            "Liu Kang",
            "Sub-Zero",
            "Krators",
            "Arthur Morgan",
            "Tracer",
            "Widowmaker",
            "Bastion",
            "RL Octane",
            "Tetris Block",
            "Charizard",
            "Crash Bandicoot",
            "GLaDOS"
        ]
    },
    "Colors": {
        "questions": [
            "Most aesthetically pleasing color",
            "Best color for a wedding dress",
            "Color most likely to be seen on a villain",
            "Ugliest color to paint a house",
            "Best color for a sports car",
            "Most relaxing color for a bedroom",
            "Color that tastes the best",
            "Color that looks best on everyone",
            "Most stressful color to look at",
            "Best color for a brand logo",
            "Color that feels the most expensive",
            "Color most likely to be found in a hospital"
        ],
        "items": [
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple",
            "White",
            "Black",
            "Navy Blue",
            "Light Blue",
            "Hot Pink",
            "Beige",
            "Brown",
            "Neon Orange",
            "Gold",
            "Silver",
            "Turquoise",
            "Gray",
            "Olive Green",
            "Maroon",
            "Peach",
            "Teal",
            "Ivory",
            "Cyan",
            "Lime Green"
        ]
    },
    "Jobs": {
        "questions": [
            "Most stressful job",
            "Job that pays the most for the least work",
            "Person you'd want with you on a deserted island",
            "Job most likely to be replaced by robots",
            "Coolest job title to say at a party",
            "Most untrustworthy profession",
            "Hardest job to explain to your parents",
            "Job with the best uniform"
        ],
        "items": [
            "Doctor",
            "Influencer",
            "Construction Worker",
            "Astronaut",
            "Lawyer",
            "Teacher",
            "Software Engineer",
            "Garbage Collector",
            "Pilot",
            "Chef",
            "Professional Athlete",
            "Librarian",
            "Detective",
            "Politician",
            "Firefighter",
            "Artist",
            "Accountant",
            "Barista",
            "CEO"
        ]
    },
    "Superpowers": {
        "questions": [
            "Most useful power for everyday life",
            "Best power for a career in professional sports",
            "The most villainous superpower",
            "Power you would most likely accidentally use to cause a disaster",
            "Most overrated superpower",
            "Best power for a first date",
            "Power that would make you the most money",
            "The loneliest superpower to have",
            "Best power for introverts",
            "The most physically exhausting power to use",
            "Power that would be the hardest to hide from the government",
            "The party trick superpower"
        ],
        "items": [
            "Invisibility",
            "Flight",
            "Teleportation",
            "Mind Reading",
            "Super Strength",
            "Time Travel",
            "Shape-shifting",
            "Telekinesis",
            "Pyrokinesis",
            "Super Speed",
            "Healing Factor",
            "X-Ray Vision",
            "Talking to Animals",
            "Elasticity",
            "Weather Manipulation",
            "Technopathy",
            "Intangibility",
            "Energy Projection",
            "Probability Manipulation",
            "Cloning Yourself",
            "Night Vision",
            "Underwater Breathing",
            "Immortality",
            "Force Fields",
            "Size Alteration"
        ]
    }
};

// get random prompts from personalized prompts array
// get random prompts and questions from themes
function getRandomPrompts(array) {
    var index1 = Math.floor(Math.random() * array.length);
    var index2 = Math.floor(Math.random() * array.length);
    while (index2 === index1) {index2 = Math.floor(Math.random() * array.length);}
    return [array[index1], array[index2]];
}
function getRandomItem(array) {return array[Math.floor(Math.random() * array.length)];}
function getThemeInfo(themes) {
    const themeNames = Object.keys(themes);
    const randomThemeName = getRandomItem(themeNames);
    const randomTheme = themes[randomThemeName];
    const randomQuestions = [];
    const randomAnswers = [];
    randomQuestions.push(getRandomItem(randomTheme.questions));
    let secondPrompt = getRandomItem(randomTheme.questions);
    while (secondPrompt === randomQuestions[0]) {secondPrompt = getRandomItem(randomTheme.questions);}
    randomQuestions.push(secondPrompt);
    while (randomAnswers.length < 7) {
        const randomAnswer = getRandomItem(randomTheme.items);
        if (!randomAnswers.includes(randomAnswer)) {
            randomAnswers.push(randomAnswer);
        }
    }
    return { theme: randomThemeName, questions: randomQuestions, answers: randomAnswers };
}

// START ROUND
function startRound(roomCode) {
    const state = gameStates[roomCode];
    
    state.allLists = {};
    state.guesses = {};

    // pick impostor
    const impostorIndex = Math.floor(Math.random() * state.players.length);
    state.impostor = state.players[impostorIndex].username;
    console.log(`Round ${state.round} Impostor for room ${roomCode}: ${state.impostor}`);

    let prompt = "", fake_prompt = "", possible_answers = [];

    if (state.personalized) {
        // create pool of players, sanitize, and shuffle
        let pool = [...state.players.map(p => p.username), ...state.customNames];
        pool = [...new Set(pool)]; 
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        // slice to max 7
        possible_answers = pool.slice(0, 7);
        
        // get 2 random prompts from pool
        let randomPrompts = getRandomPrompts(personalized_prompts);
        prompt = randomPrompts[0];
        fake_prompt = randomPrompts[1];
    } else {
        let themeInfo = getThemeInfo(themes);
        prompt = themeInfo.questions[0];
        fake_prompt = themeInfo.questions[1];
        possible_answers = themeInfo.answers;
    }

    state.realPrompt = prompt;
    state.fakePrompt = fake_prompt;

    state.promptHistory.push({ round: state.round, real: prompt, fake: fake_prompt });

    state.players.forEach(player => {
        io.to(player.id).emit('newTierlistData', {
            prompt: player.username === state.impostor ? fake_prompt : prompt,
            possibleAnswers: possible_answers,
            round: state.round
        });
    });
}

// SERVER HANDLING
io.on('connection', (socket) => {
    console.log('New client connected: ' + socket.id);

    // CREATE NEW LOBBY
    socket.on('createNewLobby', (data) => {
        gameStates[data.roomCode] = {
            gameInProgress: false,
            players: [], 
            realPrompt: "",
            fakePrompt: "",
            impostor: "",
            allLists: {},
            guesses: {},
            round: 1,
            scores: {},
            personalized: false,
            customNames: [],
            promptHistory: []
        };
        socket.emit('lobbyCreated', { roomCode: data.roomCode, username: data.hostName });
    });

    // PLAYER JOIN LOBBY
    socket.on('join', (data) => {
        const { roomCode, username } = data;
        const state = gameStates[roomCode];

        if (!state) return socket.emit('lobbyDoesntExist');
        if (state.gameInProgress) return socket.emit('lobbyInProgress');
        if (state.players.length >= 7) return socket.emit('lobbyFull');

        // case-insensitive name check
        if (state.players.some(p => p.username.toLowerCase() === username.toLowerCase())) {
            return socket.emit('nameTaken');
        }

        socket.join(roomCode);
        socket.roomCode = roomCode;
        socket.username = username;
        
        // assign pklayers a random color
        const allColors = ['var(--color-r)', 'var(--color-o)', 'var(--color-y)', 'var(--color-g)', 'var(--color-b)', 'var(--color-i)', 'var(--color-v)'];
        const takenColors = state.players.map(p => p.color);
        const availableColors = allColors.filter(c => !takenColors.includes(c));
        const assignedColor = availableColors.length > 0 
            ? availableColors[Math.floor(Math.random() * availableColors.length)] 
            : 'var(--color-r)'; // fallback color (shouldn't happen currently with lobby limit)
        
        state.players.push({ id: socket.id, username: username, color: assignedColor });
        socket.emit('joinedLobby', { roomCode, username: username });

        socket.emit('updateCustomNames', state.customNames);

        // remove custom name if the real player joins
        let normalizedUsername = username.toLowerCase().replace(/\s/g, '');
        let originalLength = state.customNames.length;
        
        state.customNames = state.customNames.filter(customName => 
            customName.toLowerCase().replace(/\s/g, '') !== normalizedUsername
        );
        
        if (state.customNames.length < originalLength) {
            io.to(roomCode).emit('updateCustomNames', state.customNames);
        }

        const playersData = state.players.map(p => ({ username: p.username, color: p.color }));
        io.to(roomCode).emit('updateLobbyPlayers', { players: playersData });
    });

    // EVERYONE IN, CONTINUE
    socket.on('everyoneInGo', (data) => {
        const { roomCode, personal } = data;
        const state = gameStates[roomCode];

        if (!state || state.players.length < 3) {
            socket.emit('notEnoughPlayers');
            return;
        }

        // initialize a brand new game
        state.gameInProgress = true;
        state.round = 1;
        state.scores = {};
        state.players.forEach(p => state.scores[p.username] = 0);
        state.personalized = personal === "true";

        startRound(roomCode);
    });

    // SUBMIT TIERLIST
    socket.on('submitTierListAnswer', (data) => {
        const { roomCode, submittedList } = data;
        const state = gameStates[roomCode];
        
        state.allLists[socket.username] = submittedList;

        if (Object.keys(state.allLists).length === state.players.length) {
            io.to(roomCode).emit('everyoneSubmitted', { 
                submissions: state.allLists, 
                realPrompt: state.realPrompt 
            });
        }
    });

    // USER VOTEING FOR PLAYER
    socket.on('userVotingFor', (data) => {
        const { roomCode, votingFor } = data;
        const state = gameStates[roomCode];
        
        state.guesses[socket.username] = votingFor;

        // when everyone has voted
        if (Object.keys(state.guesses).length === state.players.length) {
            let voteCounts = {};
            
            // count votes
            for (let voter in state.guesses) {
                let votedFor = state.guesses[voter];
                voteCounts[votedFor] = (voteCounts[votedFor] || 0) + 1;
            }

            let maxVotes = 0;
            let votedOut = [];
            for (const player in voteCounts) {
                if (voteCounts[player] > maxVotes) {
                    maxVotes = voteCounts[player];
                    votedOut = [player];
                } else if (voteCounts[player] === maxVotes) {
                    votedOut.push(player);
                }
            }

            let impostorCaptured = (votedOut.length === 1 && votedOut[0] === state.impostor);
            let impostorVotes = voteCounts[state.impostor] || 0;

            let roundScores = {};
            let scoreBreakdowns = {}; // track where points come from
            state.players.forEach(p => {
                roundScores[p.username] = 0;
                scoreBreakdowns[p.username] = [];
            });

            // calculate scores
            state.players.forEach(p => {
                let u = p.username;
                if (u === state.impostor) {
                    if (!impostorCaptured) {
                        roundScores[u] += 100;                              // impostor points: evading capture
                        scoreBreakdowns[u].push("+100 Evaded Capture");
                    }
                    if (impostorVotes === 0) {
                        roundScores[u] += 25;                               // impostor points: flawless evading capture
                        scoreBreakdowns[u].push("+25 Flawless Evasion");
                    }
                } else {
                    if (state.guesses[u] === state.impostor) {
                        roundScores[u] += 50;                               // player points: correctly identifying
                        scoreBreakdowns[u].push("+50 Correct Guess");
                        
                        if (impostorCaptured) {
                            roundScores[u] += 25;                           // player points: group majority
                            scoreBreakdowns[u].push("+25 Majority Bonus");
                        }
                    }
                }
                // add to total
                state.scores[u] += roundScores[u];
            });

            // SEND THE SCORES AND BREAKDOWN TO THE FRONTEND
            io.to(roomCode).emit('votingComplete', { 
                guesses: state.guesses, 
                impostor: state.impostor,
                roundScores: roundScores,
                totalScores: state.scores,
                scoreBreakdowns: scoreBreakdowns, 
                round: state.round,
                fakePrompt: state.fakePrompt
            });
        }
    });

    // NEXT ROUND
    socket.on('nextRound', (data) => {
        const state = gameStates[data.roomCode];
        if (state && state.round < 3) {
            state.round++;
            startRound(data.roomCode);
        }
    });

    // PLAY AGAIN
    socket.on('playAgain', (data) => {
        const roomCode = data.roomCode;
        if (gameStates[roomCode]) {
            gameStates[roomCode].gameInProgress = false;
            gameStates[roomCode].allLists = {};
            gameStates[roomCode].guesses = {};
            io.to(roomCode).emit('resetToLobby');
        }
    });

    // FINISH GAME - show final results screen
    socket.on('finishGame', (data) => {
        const state = gameStates[data.roomCode];
        if (state) {
            io.to(data.roomCode).emit('showFinalResults', {
                totalScores: state.scores,
                promptHistory: state.promptHistory
            });
        }
    });

    // PLAY AGAIN - reset game but keep same lobby for a new full game
    socket.on('playAgainSameLobby', (data) => {
        const state = gameStates[data.roomCode];
        if (state) {
            state.gameInProgress = false; // re-opens lobby for new players
            state.round = 1;
            state.scores = {};
            state.players.forEach(p => state.scores[p.username] = 0);
            state.allLists = {};
            state.guesses = {};
            state.promptHistory = [];
            
            io.to(data.roomCode).emit('backToLobbyWaiting');
        }
    });

    // CUSTOM NAMES FOR PERSONALIZED MODE
    // handle custom names added in the lobby
    socket.on('addCustomName', (data) => {
        const state = gameStates[data.roomCode];
        if (state && data.name.trim() !== '') {
            let cleanName = data.name.trim(); 
            let normalizedNewName = cleanName.toLowerCase().replace(/\s/g, '');

            let isDuplicateCustom = state.customNames.some(existingName => 
                existingName.toLowerCase().replace(/\s/g, '') === normalizedNewName
            );

            let isDuplicatePlayer = state.players.some(p => 
                p.username.toLowerCase().replace(/\s/g, '') === normalizedNewName
            );

            if (!isDuplicateCustom && !isDuplicatePlayer && state.customNames.length < 20) {
                state.customNames.push(cleanName); 
                io.to(data.roomCode).emit('updateCustomNames', state.customNames);
            }
        }
    });
    // handle manual removal of custom names
    socket.on('removeCustomName', (data) => {
        const state = gameStates[data.roomCode];
        if (state && data.name) {
            let originalLength = state.customNames.length;
            
            state.customNames = state.customNames.filter(name => name !== data.name);
            
            if (state.customNames.length < originalLength) {
                io.to(data.roomCode).emit('updateCustomNames', state.customNames);
            }
        }
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        const roomCode = socket.roomCode;
        if (roomCode && gameStates[roomCode]) {
            const state = gameStates[roomCode];
            state.players = state.players.filter(p => p.id !== socket.id);
            if (state.players.length === 0) {
                delete gameStates[roomCode];
            } else {
                const playersData = state.players.map(p => ({ username: p.username, color: p.color }));
                io.to(roomCode).emit('updateLobbyPlayers', { players: playersData });
            }
        }
    });
});