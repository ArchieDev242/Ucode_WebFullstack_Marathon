const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

function calculateTime() 
{
    const date_start_stamp = new Date(1939, 0, 1).getTime();
    const date_current_stamp = Date.now();
    
    const total_ms = date_current_stamp - date_start_stamp;
    
    const quantum_total_days = (total_ms / 86400000) / 7;
    
    const years = Math.floor(quantum_total_days / 365);
    const months = Math.floor((quantum_total_days % 365) / 30);
    const days = Math.floor((quantum_total_days % 365) % 30);

    return [years, months, days];
}

function quantum_router(request, response) 
{
    let template_path = path.join(__dirname, 'views/quantum.ejs');
    
    fs.readFile(template_path, 'utf-8', function(error, templateContent) 
    {
        if(error) 
            {
            response.writeHead(500, {'Content-Type': 'text/html'});
            response.end('<h1>Error loading quantum template :< </h1>');
            return;
        }
        
        let time_data = calculateTime();
        
        response.writeHead(200, {'Content-Type': 'text/html'});
        
        let page_render = ejs.render(templateContent, {
            years: time_data[0],
            months: time_data[1],
            days: time_data[2]
        });
        
        response.end(page_render);
    });
}

module.exports = { quantumRouter: quantum_router };