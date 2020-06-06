const sharedItems = ["Score a Hat Trick","Opponent has Anime PP","Someone Missed an Open Net","Toxicity in Chat", 
    "Pre-flip Goal","Low Five","Someone own Goals","Opponent Using Weird Car", "3 Minute Overtime","Score a 0 Second Goal",
    "Opponent rage quit (ff)", "Get into Rule #1","Make an Epic Save", "Get a Lag Indicator","Someone whiffs","Bump/Demo Goal", 
    "You Miss Boost", "Map is Salty Shores (day or night)", "Team Double Commits", "Opponents Double Commits", 
    "Someone's using Poof Goal Explosion", "Have the Best Ping in Lobby", "Score 2 Goals in the first Minute", "Whiff a Flick"];

const bronzeItems = [];

const silverItems = ["Passing Play Goal", "Fake an Opponent", "Get 3 Assists", "Get 3 Saves"];

const goldItems = ["Flip-Reset Goal", "Double Tap Goal"];

const platinumItems = ["Turtle Goal"];

const diamondItems = ["Ceiling Shot", "Musty Flick Goal"];

const champItems = ["Demo Both Opponents (In succession)", "Team Pinch Goal"];

const grandChampItems = ["High Five!"];

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