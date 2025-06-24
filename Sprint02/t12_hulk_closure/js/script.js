function concat(string1, string2) 
{
    if(typeof string2 !== 'undefined') 
        {
        return string1 + ' ' + string2;
    } else 
    {
        let count = 0;

        const inner_func = function() 
        {
            const string2 = prompt('Enter second string:');
            count++;
            inner_func.count = count;
            return string1 + ' ' + string2;
        };

        inner_func.count = 0;
        return inner_func;
    }
}