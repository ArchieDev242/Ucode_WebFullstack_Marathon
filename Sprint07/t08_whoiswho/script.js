let csvData = [];

function uploadFile() 
{
	const input_file = document.getElementById('input_file');
	const file = input_file.files[0];
	const reader = new FileReader();

	reader.onload = function (event) 
    {
		const base64File = event.target.result;

		fetch('/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ file: base64File })
		})
			.then(response => response.json())
			.then(data => {
				csvData = data.data;
				display_table(csvData);
				populate_filter_options(csvData);
				document.getElementById('section_filter').style.display = 'block';
			});
	};

	reader.readAsDataURL(file);
}

function display_table(data) 
{
	const table_csv = document.getElementById('table_csv');
	table_csv.innerHTML = '';

	if(data.length === 0) return;

	const columns = Object.keys(data[0]);

	const row_header = table_csv.insertRow();
	columns.forEach(column => {
		const cell = row_header.insertCell();
		cell.innerHTML = `<b>${column}</b>`;
	});

	data.forEach(row => {
		const element_row = table_csv.insertRow();
		columns.forEach(column => {
			const cell = element_row.insertCell();
			cell.textContent = row[column];
		});
	});
}

function populate_filter_options(data) 
{
	const columns = Object.keys(data[0]);
	const select_column = document.getElementById('select_column');
	select_column.innerHTML = '';

	columns.forEach(column => {
		const option = document.createElement('option');
		option.value = column;
		option.textContent = column;
		select_column.appendChild(option);
	});
}

function apply_filter() 
{
	const column = document.getElementById('select_column').value;
	const value = document.getElementById('input_filter').value;

	fetch(`/filter?column=${column}&value=${value}`)
		.then(response => response.json())
		.then(data => {
			display_table(data.data);
			});
}