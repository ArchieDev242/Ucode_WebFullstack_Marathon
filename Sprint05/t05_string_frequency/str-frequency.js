class StrFrequency 
{
  constructor(str) 
  {
      this.str = str;
  }

  letter_frequencies() 
  {
      let frequencies = {};
      let upper_str = this.str.toUpperCase();

      for(let i = 0; i < upper_str.length; i++) 
        {
          let char = upper_str[i];

          if(char >= 'A' && char <= 'Z') 
            {
              if(frequencies[char]) 
                {
                  frequencies[char] = frequencies[char] + 1;
              } else 
              {
                  frequencies[char] = 1;
              }
          }
      }

      return frequencies;
  }

  word_frequencies() 
  {
      let frequencies = {};

      if(this.str.trim() === '') 
        {
          frequencies[''] = 1;
          return frequencies;
      }

      let words = this.str.split(' ');

      for(let i = 0; i < words.length; i++) 
        {
          let word = '';
          for(let j = 0; j < words[i].length; j++) 
            {
              let char = words[i][j].toUpperCase();

              if(char >= 'A' && char <= 'Z') 
                {
                  word = word + char;
              }
          }

          if(word !== '') 
            {
              if(frequencies[word]) 
                {
                  frequencies[word] = frequencies[word] + 1;
              } else 
              {
                  frequencies[word] = 1;
              }
          }
      }

      return frequencies;
  }

  reverse_string() 
  {
      let reversed = '';

      for(let i = this.str.length - 1; i >= 0; i--) 
        {
          reversed = reversed + this.str[i];
      }

      return reversed;
  }
}

module.exports = StrFrequency;