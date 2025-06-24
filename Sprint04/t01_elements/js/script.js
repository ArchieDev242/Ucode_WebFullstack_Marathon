document.addEventListener('DOMContentLoaded', function() 
{
    const list = document.getElementById('characters');
    list.style.display = 'grid';
    list.style.gridTemplateColumns = 'repeat(3, 1fr)';
    list.style.gap = '10px';
    list.style.maxWidth = '400px';
    list.style.margin = '20px auto';
    list.style.padding = '0';

    const items = document.querySelectorAll('#characters li');

    items.forEach(item => {
        item.style.display = 'flex';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.style.width = 'auto';
        item.style.minHeight = '100px';
        item.style.margin = '0';

        const valid_classes = ['good', 'evil', 'unknown'];

        if(!valid_classes.includes(item.className)) 
            {
            item.className = 'unknown';
        }

        let elements = item.getAttribute('data-element');

        if(!elements) 
            {
            elements = 'none';
            item.setAttribute('data-element', elements);
        }

        const circles_container = document.createElement('div');
        circles_container.style.display = 'flex';
        circles_container.style.gap = '5px';
        circles_container.style.marginTop = '10px';

        elements.split(' ').forEach(elem => {
            const circle = document.createElement('div');
            circle.className = `elem ${elem}`;

            if(elem === 'none') 
                {
                const line = document.createElement('div');
                line.className = 'line';
                circle.appendChild(line);
            }

            circles_container.appendChild(circle);
        });

        const name = document.createElement('div');
        name.textContent = item.textContent;
        item.innerHTML = '';
        item.appendChild(name);
        item.appendChild(circles_container);
    });
});