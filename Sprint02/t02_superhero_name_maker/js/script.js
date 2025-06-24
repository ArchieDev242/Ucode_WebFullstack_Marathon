var animal = prompt("What animal is the superhero most similar to?");

var animal_check = /^[A-Za-z]{1,20}$/;

if(!animal_check.test(animal)) 
    {
    alert("Wrong animal!");
    throw "Stop! Error animal";
}

var gender = prompt("Is the superhero male or female? Leave blank if unknown or other");
gender = gender.trim().toLowerCase();

var gender_check = /^(male|female|)$/;

if(!gender_check.test(gender)) 
    {
    alert("Wrong gender!");
    throw "Stop! Error gender";
}

var age = prompt("How old is the superhero?");

var age_check = /^[1-9]\d{0,4}$/;

if(!age_check.test(age)) 
    {
    alert("Wrong age!");
    throw "Stop! Error age";
}

var age_num = Number(age);

var description = "";


if(gender === "male") 
    {
    if(age_num < 18) 
        {
        description = "boy";
    } else 
    {
        description = "man";
    }
} else if(gender === "female") 
    {
    if(age_num < 18) {
        description = "girl";
    } else 
    {
        description = "woman";
    }
} else 
{
    if(age_num < 18) 
        {
        description = "kid";
    } else 
    {
        description = "hero";
    }
}

alert("The superhero name is: " + animal + "-" + description + "!");