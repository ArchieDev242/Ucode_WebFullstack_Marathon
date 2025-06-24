(function() 
{
    let is_valid;
    let user_num;
    
    do 
    {
        user_num = Number(prompt("Enter a number from 1 to 10"));
        is_valid = !isNaN(user_num) && user_num >= 1 && user_num <= 10;
    } while(!is_valid);

    switch(true) 
    {
        case user_num === 1: alert("Back to square 1"); break;
        case user_num === 2: alert("Goody 2-shoes"); break;
        case user_num === 3 || user_num === 6: alert("Two's company, three's a crowd"); break;
        case user_num === 4 || user_num === 9: alert("Counting sheep"); break;
        case user_num === 5: alert("Take five"); break;
        case user_num === 7: alert("Seventh heaven"); break;
        case user_num === 8: alert("Behind the eight-ball"); break;
        case user_num === 10: alert("Cheaper by the dozen"); break;
    }
})();