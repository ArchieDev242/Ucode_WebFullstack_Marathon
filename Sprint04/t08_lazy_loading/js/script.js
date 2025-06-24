const images = document.querySelectorAll(".image_container img");
const load_counter = document.getElementById("load_counter");

let images_loaded = 0;
const images_total = 20;

function counter_update() 
{
    load_counter.textContent = `Loaded: ${images_loaded}/${images_total}`;
    if(images_loaded === images_total) 
    {
        load_counter.classList.add("done");
        setTimeout(() => {
            load_counter.style.display = "none";
        }, 3000);
    }
}

function is_visible(img) 
{
    const rect = img.getBoundingClientRect();
    const window_Height = (window.innerHeight || document.documentElement.clientHeight);

    return (
        rect.top <= window_Height &&
        rect.bottom >= 0
    );
}

function image_load(img) 
{
    const src_real = img.getAttribute("data_src");
    
    if(src_real && img.src !== src_real && !img.dataset.loaded) 
    {
        img.src = "assets/images/loader.gif";

        const image_temp = new Image();

        image_temp.src = src_real;
        image_temp.onload = () => {
            img.src = image_temp.src;
            images_loaded++;
            img.dataset.loaded = "true";
            counter_update();
        };

        image_temp.onerror = () => {
            console.log(`Failed to load ${src_real}`);
        };
    }
}

function images_check() 
{
    images.forEach(img => {
        if(is_visible(img)) 
        {
            image_load(img);
        }
    });
}

window.addEventListener("scroll", images_check);
window.addEventListener("load", images_check);

counter_update();