const Printable = 
{
    print() 
    {
      this.weapons.forEach(weapon => console.log(weapon));
    }
  };
  
module.exports = Printable;