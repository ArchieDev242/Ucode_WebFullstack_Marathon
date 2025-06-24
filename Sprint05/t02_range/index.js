exports.checkDivision = function(start = 1, end = 60) 
{
    for(let number = start; number <= end; number++) 
        {
        let message = "The number " + number + " ";

        if(number % 2 === 0) 
            {
            message = message + "is divisible by 2";
        }

        if(number % 3 === 0) 
            {
            if(message !== "The number " + number + " ") 
                {
                message = message + ", ";
            }
            
            message = message + "is divisible by 3";
        }

        if(number % 10 === 0) 
            {
            if(message !== "The number " + number + " ") 
                {
                message = message + ", ";
            }

            message = message + "is divisible by 10";
        }

        if(message === "The number " + number + " ") 
            {
            message = message + "-";
        }

        console.log(message);
    }
};