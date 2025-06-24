const houseMixin = 
{
    wordReplace(oldWord, newWord) 
    {
        this.description = this.description.split(oldWord).join(newWord);
    },
    
    wordInsertAfter(word, newWord) 
    {
        let pieces = this.description.split(word);
        this.description = pieces.join(word + " " + newWord);
    },
    
    wordDelete(word) 
    {
        this.description = this.description.split(word).join("");
    },
    
    wordEncrypt() 
    {
        let encrypted = "";

        for (let i = 0; i < this.description.length; i++) 
            {
            let char = this.description[i];

            if(char >= "a" && char <= "z") 
                {
                let newChar = String.fromCharCode((char.charCodeAt(0) - 97 + 13) % 26 + 97);
                encrypted += newChar;
            } else if(char >= "A" && char <= "Z") 
                {
                let newChar = String.fromCharCode((char.charCodeAt(0) - 65 + 13) % 26 + 65);
                encrypted += newChar;
            } else 
            {
                encrypted += char;
            }
        }

        this.description = encrypted;
    },
    
    wordDecrypt() 
    {
        let decrypted = "";

        for (let i = 0; i < this.description.length; i++) 
            {
            let char = this.description[i];
            if(char >= "a" && char <= "z") 
                {
                let newChar = String.fromCharCode((char.charCodeAt(0) - 97 - 13 + 26) % 26 + 97);
                decrypted += newChar;
            } else if(char >= "A" && char <= "Z") 
                {
                let newChar = String.fromCharCode((char.charCodeAt(0) - 65 - 13 + 26) % 26 + 65);
                decrypted += newChar;
            } else 
            {
                decrypted += char;
            }
        }

        this.description = decrypted;
    }
};