const { EatException } = require('./eat-exception');

class Ingestion 
{
    constructor(meal_type, day_of_diet) 
    {
        this.meal_type = meal_type;
        this.day_of_diet = day_of_diet;
        this.products = [];
    }

    setProduct(product) 
    {
        this.products.push(product);
    }

    getProductInfo(productName) 
    {
        return this.products.find(p => p.name === productName);
    }

    getFromFridge(productName) 
    {
        const product = this.getProductInfo(productName);

        if(product.isJunkFood()) 
            {
            throw new EatException(productName, this.meal_type);
        }
    }
}

module.exports = { Ingestion };