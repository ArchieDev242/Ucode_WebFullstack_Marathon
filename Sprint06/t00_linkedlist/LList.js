const LLData = require('./LLData');

const LList = class {
    constructor() 
    {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    
    getFirst() 
    {
        return this.head ? this.head.data : null;
    }

    getLast() 
    {
        return this.tail ? this.tail.data : null;
    }

    add(value) 
    {
        const node = new LLData(value);

        if(!this.head) 
            {
            this.head = node;
            this.tail = node;
        }else 
        {
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }

    addFromArray(arrayOfData) 
    {
        for(const value of arrayOfData) 
            {
            this.add(value);
        }
    }

    remove(value) 
    {
        if(!this.head) return false;

        let removed = false;

        while(this.head !== null && this.head.data === value) 
            {
            this.head = this.head.next;
            this.size--;
            removed = true;
        }

        let current = this.head;
        let prev = null;

        while(current !== null) 
            {
            if(current.data === value) 
                {
                if(prev !== null) 
                    {
                    prev.next = current.next;
                }

                if(current === this.tail) 
                    {
                    this.tail = prev;
                }

                this.size--;
                removed = true;
            }else 
            {
                prev = current;
            }

            current = current.next;
        }

        return removed;
    }

    removeAll(value) 
    {
        let removed = false;

        while(this.remove(value)) 
            {
            removed = true;
        }

        return removed;
    }

    contains(value) 
    {
                let current = this.head;

        while(current !== null) 
            {
            if(current.data === value) 
                {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    clear() 
    {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    count() 
    {
        return this.size;
    }

    toString() 
    {
        return [...this].join(', ');
    }

    *getIterator() 
    {
        let current = this.head;

        while(current !== null) 
            {
            yield current.data;
            current = current.next;
        }
    }

    [Symbol.iterator]() 
    {
        return this.getIterator();
    }

    filter(callback) 
    {
        const filteredList = new LList();

        for(const data of this) 
            {
            if(callback(data)) 
                {
                filteredList.add(data);
            }
        }
        
        return filteredList;
    }
};

module.exports = { LList };