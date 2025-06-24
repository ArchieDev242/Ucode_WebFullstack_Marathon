exports.getAnonymous = function(name, alias, affiliation) 
{
    let private_name = name;
    let private_alias = alias;
    let private_affiliation = affiliation;

    return {
        get name() 
        {
            return private_name;
        },

        get alias() 
        {
            return private_alias;
        },

        get affiliation() 
        {
            return private_affiliation;
        }
    };
};