class Access 
{
    #value;

    get mark_LXXXV() 
    {
        if(this.#value === undefined) 
            {
            return undefined;
        }

        if(this.#value === 'null') 
            {
            return null;
        }

        return this.#value;
    }

    set mark_LXXXV(value) 
    {
        this.#value = value;
    }
}

module.exports = Access;