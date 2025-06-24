class ImageProcessor 
{
    constructor() 
    {
        this.input_url = document.getElementById('input_url');
        this.btn_load = document.getElementById('btn_load');
        this.canvas_original = document.getElementById('canvas_original');
        this.canvas_red = document.getElementById('canvas_red');
        this.canvas_green = document.getElementById('canvas_green');
        this.canvas_blue = document.getElementById('canvas_blue');
        
        this.btn_load.addEventListener('click', () => this.process_image());
    }
    
    process_image() 
    {
        const url = this.input_url.value.trim();
    
        if(!url) return;
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = `/image-proxy?url=${encodeURIComponent(url)}`;
        
        img.onload = () => this.handle_image_load(img);
        img.onerror = () => this.handle_image_error();
    }
    
    handle_image_load(img) 
    {
        const size = Math.min(img.width, img.height);
        const sx = Math.floor((img.width - size) / 2);
        const sy = Math.floor((img.height - size) / 2);
        
        const canvases = [this.canvas_original, this.canvas_red, this.canvas_green, this.canvas_blue];
    
        canvases.forEach(canvas => {
            canvas.width = size;
            canvas.height = size;
        });
        
        const ctx_original = this.canvas_original.getContext('2d');
        ctx_original.drawImage(img, sx, sy, size, size, 0, 0, size, size);
        
        const image_data = ctx_original.getImageData(0, 0, size, size);
        
        this.process_color_channels(image_data, size);
    }
    
    process_color_channels(image_data, size) 
    {
        const ctx_red = this.canvas_red.getContext('2d');
        const ctx_green = this.canvas_green.getContext('2d');
        const ctx_blue = this.canvas_blue.getContext('2d');
        
        const data_red = ctx_red.createImageData(size, size);
        const data_green = ctx_green.createImageData(size, size);
        const data_blue = ctx_blue.createImageData(size, size);
        
        const pixels = image_data.data;
        const red_pixels = data_red.data;
        const green_pixels = data_green.data;
        const blue_pixels = data_blue.data;
        
        this.extract_channels(pixels, red_pixels, green_pixels, blue_pixels);
        
        ctx_red.putImageData(data_red, 0, 0);
        ctx_green.putImageData(data_green, 0, 0);
        ctx_blue.putImageData(data_blue, 0, 0);
    }
    
    extract_channels(src_pixels, red_array, green_array, blue_array) 
    {
        const length = src_pixels.length;
        
        for(let i = 0; i < length; i += 4) 
            {
            const alpha = src_pixels[i + 3];
            
            this.set_rgba(red_array, i, src_pixels[i], 0, 0, alpha);
            this.set_rgba(green_array, i, 0, src_pixels[i + 1], 0, alpha);
            this.set_rgba(blue_array, i, 0, 0, src_pixels[i + 2], alpha);
        }
    }
    
    set_rgba(pixel_array, offset, r, g, b, a) {
        pixel_array[offset] = r;
        pixel_array[offset + 1] = g;
        pixel_array[offset + 2] = b;
        pixel_array[offset + 3] = a;
    }
    
    handle_image_error() 
    {
        alert('Failed to load image. Please check the URL and try again.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageProcessor();
});