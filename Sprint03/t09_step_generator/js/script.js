function* numberAdder() 
{
    let lastNum = 1;
    
    while(true) 
        {
        let input = prompt("Previous result: " + lastNum + ". Enter a new number:");
        let newNum = Number(input);
        
        if(isNaN(newNum)) 
            {
            console.error("Invalid number!");
        } else 
        {
            lastNum = lastNum + newNum;

            if(lastNum > 10000) 
                {
                lastNum = 1;
            }

            yield lastNum;
        }
    }
}

let myGen = numberAdder();

function keepGoing() 
{
    myGen.next();
    setTimeout(keepGoing, 100);
}

keepGoing();