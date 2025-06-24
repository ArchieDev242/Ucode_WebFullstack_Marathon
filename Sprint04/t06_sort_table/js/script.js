document.addEventListener('DOMContentLoaded', () => {
    const heroes = [
        { name: 'Black Panther', strength: 66, age: 53 },
        { name: 'Captain America', strength: 79, age: 137 },
        { name: 'Captain Marvel', strength: 97, age: 26 },
        { name: 'Hulk', strength: 80, age: 49 },
        { name: 'Iron Man', strength: 88, age: 48 },
        { name: 'Spider-Man', strength: 78, age: 16 },
        { name: 'Thanos', strength: 99, age: 1000 },
        { name: 'Thor', strength: 95, age: 1000 },
        { name: 'Yon-Rogg', strength: 73, age: 52 }
    ];

    const placeholder = document.getElementById('placeholder');
    const main = document.querySelector('main');
    let sort_direction = {};

    const header_row = document.createElement('div');
    header_row.className = 'header_row';

    const h1 = document.querySelector('h1');
    const message_sort = document.createElement('div');
    message_sort.id = 'sorting_message';
    message_sort.textContent = 'Sorting by Name, order: ASC';

    header_row.appendChild(h1);
    header_row.appendChild(message_sort);
    main.insertBefore(header_row, placeholder);

    const table = document.createElement('table');
    table.id = 'heroTable';
    table.innerHTML = `
        <thead>
            <tr>
                <th data-column="name">Name</th>
                <th data-column="strength">Strength</th>
                <th data-column="age">Age</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    placeholder.parentNode.replaceChild(table, placeholder);

    const table_body = table.querySelector('tbody');
    const headers = table.querySelectorAll('th');

    function capitalize(str) 
    {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function split_name(name) 
    {
        const words = name.split(' ');
        
        if(words.length >= 2) 
            {
            return `${words[0]}<br>${words[1]}`;
        }

        return name;
    }

    function table_populate(data) 
    {
        table_body.innerHTML = '';

        data.forEach(hero => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${split_name(hero.name)}</td>
                <td>${hero.strength}</td>
                <td>${hero.age}</td>
            `;
            table_body.appendChild(row);
        });
    }

    function table_sort(column, order) 
    {
        const heroes_sort = [...heroes].sort((a, b) => {

            let valueA = a[column];
            let valueB = b[column];

            if(column === 'name') 
                {
                return order === 'ASC'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            } else 
            {
                return order === 'ASC'
                    ? valueA - valueB
                    : valueB - valueA;
            }
        });

        table_populate(heroes_sort);
        message_sort.textContent = `Sorting by ${capitalize(column)}, order: ${order}`;
    }

    headers.forEach(header => {
        const column = header.getAttribute('data-column');
        sort_direction[column] = 'ASC';

        header.addEventListener('click', () => {
            sort_direction[column] = sort_direction[column] === 'ASC' ? 'DESC' : 'ASC';
            table_sort(column, sort_direction[column]);
        });
    });

    table_populate(heroes);
});
