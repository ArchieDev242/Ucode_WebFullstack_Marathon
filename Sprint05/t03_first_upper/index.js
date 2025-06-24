exports.firstUpper = function(str) 
{
    if(typeof str !== 'string') 
        {
        return '';
    }
    const trimmed = str.trim();

    if(trimmed === '') 
        {
        return '';
    }
    
    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
};