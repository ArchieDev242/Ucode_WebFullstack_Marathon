class HardWorker 
{
    constructor() 
    {
      this.actualName = '';
      this.realAge = null;
      this.currentSalary = null;
    }
  
    set name(newName) 
    {
      this.actualName = newName;
    }
  
    get name() 
    {
      return this.actualName;
    }
  
    set age(ageValue) 
    {
      if(Number.isInteger(ageValue)) 
        {
        if(ageValue >= 1 && ageValue <= 99) 
            {
          this.realAge = ageValue;
        }
      }
    }
  
    get age() 
    {
      return this.realAge;
    }
  
    set salary(money) 
    {
      if(money >= 100) 
        {
        if(money < 10000) 
            {
          this.currentSalary = money;
        }
      }
    }
  
    get salary() 
    {
      return this.currentSalary;
    }
  
    toObject() 
    {
      let resultObj = {};
      resultObj['name'] = this.actualName;
      resultObj['age'] = this.realAge;
      resultObj['salary'] = this.currentSalary;
      return resultObj;
    }
}