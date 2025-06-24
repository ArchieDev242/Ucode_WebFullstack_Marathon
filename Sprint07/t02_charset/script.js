const input_string = document.getElementById('input_string');
const select_charset = document.getElementById('select_charset');
const div_output = document.getElementById('div_output');

const hexToString = (hex) => {
    try 
    {
        const bytes = new Uint8Array(hex.length / 2);
        for(let i = 0; i < hex.length; i += 2) 
            {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return new TextDecoder('utf-8').decode(bytes);

    } catch(error) 
    {
        return 'Error displaying converted string';
    }
};

const changeCharset = () => {
    const str_value = input_string.value.trim();
    const selected_options = Array.from(select_charset.selectedOptions);
    const selected_charsets = selected_options.map(option => option.value);

    if(!str_value) 
        {
        alert('Please enter an input string!');
        return;
    }

    if(selected_charsets.length === 0) 
        {
        alert('Please select at least one charset!');
        return;
    }

    const data_to_send = {
        inputString: str_value,
        charsets: selected_charsets
    };

    fetch('/convert', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data_to_send)
    })
    .then(response => {
        if(!response.ok) 
            {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        return response.json();
    })
    .then(data => {
        div_output.innerHTML = '<h2>Converted Strings:</h2>';
        div_output.style.display = 'block';

        const createResultRow = (label, value) => {
            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.alignItems = 'center';
            row.style.marginBottom = '10px';

            const label_elem = document.createElement('p');
            label_elem.innerText = label;
            label_elem.style.marginRight = '10px';
            label_elem.style.minWidth = '100px';
            label_elem.style.margin = '0';

            const textbox = document.createElement('textarea');
            textbox.className = 'textarea_output';
            textbox.value = value;
            textbox.readOnly = true;
            textbox.rows = 2;
            textbox.cols = 30;
            textbox.style.height = '30px';
            textbox.style.border = '1px solid #ccc';
            textbox.style.padding = '5px';

            row.appendChild(label_elem);
            row.appendChild(textbox);
            return row;
        };

        div_output.appendChild(createResultRow('Input string:', str_value));

        selected_charsets.forEach(charset => {
            let display_value;
            
            if(charset === 'Windows-1251' && data[charset]) 
                {
                display_value = str_value;
            } else 
            {
                display_value = data[charset] || 'No conversion available';
            }
            
            div_output.appendChild(createResultRow(charset + ':', display_value));
        });
    })
    .catch(error => {
        alert('An error occurred while converting the string.');
    });
};

const clearFields = () => {
    input_string.value = '';
    div_output.innerHTML = '<h2>Converted Strings:</h2>';
    div_output.style.display = 'none';
};