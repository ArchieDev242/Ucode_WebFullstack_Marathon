const myValidator = {
    get: function(obj, prop) 
    {
        console.log("Looking at '" + prop + "'...");

        if(obj[prop] === undefined) 
            {
            return false;
        } else 
        {
            return obj[prop];
        }
    },
    
    set: function(obj, prop, newValue) 
    {
        if(prop == "age") 
            {
            let ageNum = Number(newValue);

            if(isNaN(ageNum) || ageNum % 1 != 0) 
                {
                throw new Error("Age must be a real number!");
            }

            if(ageNum < 0 || ageNum > 200) 
                {
                throw new Error("Age is weird!");
            }
        }

        console.log("Putting '" + newValue + "' into '" + prop + "'");
        obj[prop] = newValue;
        return true;
    }
};