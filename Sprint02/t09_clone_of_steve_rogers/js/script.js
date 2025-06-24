function copyObj(obj) 
{
    const copy = {};

    for(const key in obj) 
        {
        if(obj.hasOwnProperty(key)) 
            {
            copy[key] = obj[key];
        }
    }
    
    return copy;
}