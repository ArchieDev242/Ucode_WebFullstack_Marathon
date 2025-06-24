const application = async () => {
	document.getElementById('container_content').innerHTML = '<div class="status_loading">Loading Marvel API data...</div>';
	
	try 
    {
		const response = await fetch('/api');
		const data = await response.json();
		
		if(data.error) 
            {
			throw new Error(data.message || 'Unknown error occurred');
		}

		const renderData = (data) => {
			let result = '';

			for(let key in data) 
                {
				if(typeof data[key] === 'object') 
                    {
					result += `
						<div class="box_item parent">
							<p class="text_name parent_color">${key}:</p>
							${renderData(data[key])}
						</div>
					`;
				} else 
                {
					result += `
						<div class="box_item child">
							<p class="text_name">${key}: <span class="text_value">${data[key]}</span></p>
						</div>
					`;
				}
			}
			return result;
		};

		document.getElementById('container_content').innerHTML = renderData(data);
	} catch(error) 
    {
		console.error('Error:', error);
		document.getElementById('container_content').innerHTML = `
			<div class="message_error">
				<h3>Error connecting to Marvel API</h3>
				<p>${error.message}</p>
				<button id="btn_retry" onclick="application()">Try Again</button>
			</div>
		`;
	}
};

document.addEventListener('DOMContentLoaded', application);