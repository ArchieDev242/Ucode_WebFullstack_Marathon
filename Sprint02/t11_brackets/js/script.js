function checkBrackets(str) 
{
    if(typeof str !== 'string' || !/[()]/.test(str)) return -1;

    let [openStack, missing] = [0, 0];
    
    for(let char of str) 
        {
        if(char === '(') openStack++;
        else if(char === ')') openStack > 0 ? openStack-- : missing++;
    }
    
    return missing + openStack;
}