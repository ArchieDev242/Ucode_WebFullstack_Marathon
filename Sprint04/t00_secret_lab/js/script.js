var is_bruce = true;

function transformation() 
{
    var hero = document.getElementById('hero');
    var body = document.body;
    
    if(is_bruce) 
        {
        hero.textContent = "Hulk";
        hero.style.fontSize = "130px";
        hero.style.letterSpacing = "6px";
        body.style.backgroundColor = "#70964b";
    } else 
    {
        hero.textContent = "Bruce Banner";
        hero.style.fontSize = "60px";
        hero.style.letterSpacing = "2px";
        body.style.backgroundColor = "#ffb300";
    }
    
    is_bruce = !is_bruce;
}