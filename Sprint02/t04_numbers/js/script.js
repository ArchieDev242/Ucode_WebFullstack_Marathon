function checkDivision(beginRange = 1, endRange = 100) 
{
    let [start, end] = [beginRange, endRange].map(Number);
    
    if(isNaN(start)) start = 1;
    if(isNaN(end)) end = 100;
    if(start > end) [start, end] = [end, start];

    for(let i = start; i <= end; i++) 
        {
        const descriptions = [];
        
        if(i % 2 === 0) descriptions.push("even");
        if(i % 3 === 0) descriptions.push("a multiple of 3");
        if(i % 10 === 0) descriptions.push("a multiple of 10");
        
        const result = descriptions.length 
            ? `${i} is ${descriptions.join(', ')}` 
            : `${i} -`;
        console.log(result);
    }
}

const getInput = (msg) => {
    const input = prompt(msg);
    return input !== null ? Number(input) : NaN;
};

checkDivision(
    getInput("Enter start number:"),
    getInput("Enter end number:")
);