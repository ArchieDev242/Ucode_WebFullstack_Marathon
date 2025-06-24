let first_name = prompt("What's your first name?").trim();
let last_name = prompt("What's your last name?").trim();

if(!first_name || !last_name || /\d/.test(first_name + last_name)) 
    {
    alert("Wrong input!");
    console.log("Wrong input!");
} else 
{
    first_name = first_name[0].toUpperCase() + first_name.slice(1).toLowerCase();
    last_name = last_name[0].toUpperCase() + last_name.slice(1).toLowerCase();
    
    alert(`Hello, ${first_name} ${last_name}!`);
    console.log(`Hello, ${first_name} ${last_name}!`);
}