function HouseBuilder(addr, desc, owner, sz, rooms) 
{
    this.address = addr;
    this.description = desc;
    this.owner = owner;
    this.size = sz;
    this.roomCount = rooms;
    this.date = new Date();
    this._building_speed = 0.5;
}

HouseBuilder.prototype.getDaysToBuild = function() 
{
    return Math.ceil(this.size / this._building_speed);
};

HouseBuilder.prototype.toString = function() 
{
    return `House at ${this.address} built on ${this.date.toDateString()}`;
};