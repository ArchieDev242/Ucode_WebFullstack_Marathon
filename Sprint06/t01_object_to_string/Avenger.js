class Avenger 
{
    constructor({ name, alias, gender, age, powers }) 
    {
        const avenger_func = function Avenger() 
        {
            return `${alias.toUpperCase()}\n${powers.join('\n')}`;
        };

        Object.defineProperties(avenger_func, {

            name: { value: name, enumerable: false },
            alias: { value: alias, enumerable: false },
            gender: { value: gender, enumerable: false },
            age: { value: age, enumerable: false },
            powers: { value: powers, enumerable: false },
            toString: { 

                value: function() 
                {
                    return `name: ${name}\ngender: ${gender}\nage: ${age}`;
                },
                
                enumerable: true
            }
        });

        return avenger_func;
    }
}

module.exports = { Avenger };