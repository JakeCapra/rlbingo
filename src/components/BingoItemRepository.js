const sharedItems = ["Score a Hat Trick","Opponent has Anime PP","Someone Missed an Open Net","Toxicity in Chat", 
    "Pre-flip Goal","Low Five","Someone own Goals","Opponent Using Weird Car", "3 Minute Overtime","Score a 0 Second Goal",
    "Opponent rage quit (ff)", "Get into Rule #1","Make an Epic Save", "Get a Lag Indicator","Someone whiffs","Bump/Demo Goal", 
    "You Miss Boost", "Map is Salty Shores (day or night)", "Team Double Commits", "Opponents Double Commits", 
    "Someone's using Poof Goal Explosion", "Have the Best Ping in Lobby", "Score 2 Goals in the first Minute", "Whiff a Flick",
    "Someone's using an Esport Decal", "Score an Air Dribble", "Champions Field Announcer says 'What a Save'", "Get demoed",
    "Hit the crossbar", "Someone gets a ghost hit", "Get MVP", "Score a flick goal", "Someone copmplains about a teammate",
    "Someone steals a goal", "Opponent has LFT in their name", "Someone's using a topper", "Map is Neo Tokyo", "Map is Wasteland",
    "Map is Farmstead", "Someone has a GC title"];

const bronzeItems = [];

const silverItems = ["Passing Play Goal", "Fake an Opponent", "Get 3 Assists", "Get 3 Saves"];

const goldItems = [""];

const platinumItems = ["Turtle Goal", "Someone says they should be ranked higher"];

const diamondItems = ["Ceiling Shot", "Musty Flick Goal"];

const champItems = ["Demo Both Opponents (In succession)", "Team Pinch Goal", "Flip-Reset Goal", "Double Tap Goal"];

const grandChampItems = ["High Five!","Flip-Reset Goal", "Double Tap Goal"];

const celebrityItems = ["Get Asked to Sign Profile"];

const proItems = [];

const itemsCollection = [
    sharedItems,
    bronzeItems,
    silverItems,
    goldItems,
    platinumItems,
    diamondItems,
    champItems,
    grandChampItems,
    celebrityItems,
    proItems
]

export function GetBingoTileItems(maxLevel) {
    var items = [];
    for(var i = 0; i <= maxLevel; i++) {
        items = items.concat(itemsCollection[i]);
    }
    return items;
}