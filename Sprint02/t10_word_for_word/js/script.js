function addWords(obj, wrds) 
{
    let old_words = obj.words.split(' ');
    let clean_old = [];

    for(let i = 0; i < old_words.length; i++) 
        {
        if(oldWords[i] !== '' && !clean_old.includes(old_words[i])) 
            {
                clean_old.push(old_words[i]);
        }
    }
    
    let new_words = wrds.split(' ');

    for(let i = 0; i < new_words.length; i++) 
        {
        if(new_words[i] !== '' && !clean_old.includes(new_words[i])) 
            {
            clean_old.push(new_words[i]);
        }
    }
    
    obj.words = clean_old.join(' ');
}

function removeWords(obj, wrds) 
{
    let current = obj.words.split(' ');
    let to_remove = wrds.split(' ');
    let result = [];
    
    for(let i = 0; i < current.length; i++) 
        {
        if(current[i] === '') continue;
        let keep = true;
        for(let j = 0; j < to_remove.length; j++) 
            {
            if(current[i] === to_remove[j]) 
                {
                keep = false;
                break;
            }
        }

        if(keep && !result.includes(current[i])) 
            {
            result.push(current[i]);
        }
    }
    
    obj.words = result.join(' ');
}

function changeWords(obj, oldWrds, newWrds) 
{
    removeWords(obj, oldWrds);
    addWords(obj, newWrds);
}