class Node 
{
    constructor(stuff) 
    {
        this.stuff = stuff;
        this.nextOne = null;
    }
}

class LinkedList 
{
    constructor() 
    {
        this.first = null;
    }
    
    add(thing) 
    {
        let newGuy = new Node(thing);

        if(!this.first) 
            {
            this.first = newGuy;
        } else 
        {
            let now = this.first;

            while(now.nextOne) 
                {
                now = now.nextOne;
            }

            now.nextOne = newGuy;
        }
    }
    
    remove(thing) 
    {
        if(!this.first) 
            {
            return false;
        }

        if(this.first.stuff == thing) 
            {
            this.first = this.first.nextOne;
            return true;
        }

        let now = this.first;

        while(now.nextOne) 
            {
            if(now.nextOne.stuff == thing) 
                {
                now.nextOne = now.nextOne.nextOne;
                return true;
            }

            now = now.nextOne;
        }

        return false;
    }
    
    contains(thing) 
    {
        let now = this.first;

        while(now) 
            {
            if(now.stuff == thing) 
                {
                return true;
            }

            now = now.nextOne;
        }

        return false;
    }
    
    [Symbol.iterator]() 
    {
        let now = this.first;

        return {
            next() 
            {
                if(!now) 
                    {
                    return { done: true };
                }

                let thing = now.stuff;
                now = now.nextOne;
                return { value: thing, done: false };
            }
        };
    }
    
    clear() 
    {
        this.first = null;
    }
    
    count() 
    {
        let num = 0;
        let now = this.first;

        while(now) 
            {
            num = num + 1;
            now = now.nextOne;
        }

        return num;
    }
    
    log() 
    {
        let text = "";
        let now = this.first;

        while(now) 
            {
            text = text + now.stuff;

            if(now.nextOne) 
                {
                text = text + ",";
            }

            now = now.nextOne;
        }

        console.log(text);
    }
}

function createLinkedList(myArray) 
{
    let newList = new LinkedList();

    for(let i = 0; i < myArray.length; i++) 
        {
        newList.add(myArray[i]);
    }

    return newList;
}