function sortEvenOdd(arr) 
{
    arr.sort((a, b) => {

        const a_sort_even = a % 2 === 0;
        const b__sort_even = b % 2 === 0;
        
        if(a_sort_even && !b__sort_even) return -1;
        if(!a_sort_even && b__sort_even) return 1;
        
        return a - b;
    });
}