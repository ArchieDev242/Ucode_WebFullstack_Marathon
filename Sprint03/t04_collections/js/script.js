var GuestManager = function() 
{
    this.guestReferences = new WeakSet();
    
    this.addGuest = function(person) 
    {
        if(person && typeof person === 'object' && !Array.isArray(person)) 
            {
            this.guestReferences.add(person);
        } else 
        {
            throw new Error("Invalid guest object");
        }
    };
    
    this.checkGuest = function(person) 
    {
        return this.guestReferences.has(person);
    };
    
    this.removeGuest = function(person) 
    {
        this.guestReferences.delete(person);
    };
};

var dishPriceArray = [
    ['🍣 Sushi Platter', 15.99],
    ['🌮 Taco Fiesta', 6.99],
    ['🍜 Ramen Special', 11.50],
    ['🍛 Chicken Curry', 10.25],
    ['🍰 Cheesecake Deluxe', 7.99]
];

var FoodMenu = new Map();
for(var i = 0; i < dishPriceArray.length; i++) 
    {
    FoodMenu.set(dishPriceArray[i][0], dishPriceArray[i][1]);
}

var vaultSecretStore = new WeakMap();
var boxCredentials = [];

for(var j = 1; j <= 5; j++) 
    {
    var box = { id: 'BOX-' + j, code: Math.random().toString(36).substr(2, 8) };
    boxCredentials.push(box);
    vaultSecretStore.set(box, `SECRET-${j * 1000}`);
}

var CoinHolder = function() 
{
    this.coins = new Set();
    this.addCoin = function(coin) 
    {
        this.coins.add(coin);
    };

    this.showAll = function() 
    {
        return Array.from(this.coins);
    };
};

FoodMenu.forEach((price, dish) => {
    console.log(`Нова страва: ${dish} - Ціна: $${price.toFixed(2)}`);
});