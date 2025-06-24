class Tower extends Building 
{
    constructor(f, m, a) 
    {
      super(f, m, a);
      this.elev = false;
      this.arc = 0;
      this.h = 0;
    }
  
    get hasElevator() 
    {
      return this.elev;
    }
  
    set hasElevator(yesno) 
    {
      this.elev = !!yesno;
    }
  
    get arcCapacity() 
    {
      return this.arc;
    }
  
    set arcCapacity(num) 
    {
      if(typeof num === 'number') this.arc = num;
    }
  
    get height() 
    {
      return this.h;
    }
  
    set height(val) 
    {
      if(val > 0) this.h = val;
    }
  
    getFloorHeight() 
    {
      if(!this.h || !this.floors) return 0;
      return this.h / this.floors;
    }
  
    toString() 
    {
      let base = super.toString();
      base += `\nElevator: ${this.elev ? '+' : '-'}`;
      base += `\nArc reactor capacity: ${this.arc}`;
      base += `\nHeight: ${this.h}`;
      base += `\nFloor height: ${this.getFloorHeight()}`;
      return base;
    }
}