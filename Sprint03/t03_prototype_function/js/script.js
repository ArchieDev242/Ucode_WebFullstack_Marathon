String.prototype.removeDuplicates = function() 
{
    const words = this.trim().split(/\s+/);
    const seen = {};
    const unique = [];

    for(const word of words) 
        {
        if(!(word in seen)) 
            {
            seen[word] = true;
            unique.push(word);
        }
    }
    
    return unique.join(' ');
};