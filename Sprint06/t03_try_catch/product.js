class Product 
{
    constructor(name, kcal) 
    {
        this.name = name;
        this.kcal = kcal;
    }

    isJunkFood() 
    {
        return this.kcal > 200;
    }
}

module.exports = { Product };