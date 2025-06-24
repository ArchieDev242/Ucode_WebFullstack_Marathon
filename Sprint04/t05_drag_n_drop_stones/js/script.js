class Stone 
{
    constructor(id, x, y) 
    {
        this.element = Object.assign(document.createElement('div'), {
            className: 'stone draggable',
            id: `${id}_stone`
        });
        
        this.position = { x, y };
        this.is_draggable = true;
        this.offset = { x: 0, y: 0 };
        this.is_dragging = false;
        this.drag_occurred = false;
        
        this.drag_handler = this.drag.bind(this);
        this.drag_handler_stop = this.stop_drag.bind(this);
        
        this.apply_styles();
        this.setup_events();
    }

    apply_styles() 
    {
        Object.assign(this.element.style, {
            left: `${this.position.x}px`,
            top: `${this.position.y}px`
        });
    }

    setup_events() 
    {
        this.element.addEventListener('click', e => this.toggle_drag(e));
        this.element.addEventListener('mousedown', e => this.start_drag(e));
    }

    toggle_drag(e) 
    {
        if(this.drag_occurred) 
            {
            this.drag_occurred = false;
            return;
        }
        
        e.stopPropagation();
        this.is_draggable = !this.is_draggable;
        this.element.classList.toggle('draggable');
    }

    start_drag(e) 
    {
        if(!this.is_draggable) return;
        
        e.stopPropagation();
        this.is_dragging = true;
        this.drag_occurred = false;

        this.offset = {
            x: e.clientX - this.position.x,
            y: e.clientY - this.position.y
        };
        
        document.addEventListener('mousemove', this.drag_handler);
        document.addEventListener('mouseup', this.drag_handler_stop);
    }

    drag(e) 
    {
        this.drag_occurred = true;

        this.position = {
            x: e.clientX - this.offset.x,
            y: e.clientY - this.offset.y
        };

        this.apply_styles();
    }

    stop_drag() 
    {
        this.is_dragging = false;
        document.removeEventListener('mousemove', this.drag_handler);
        document.removeEventListener('mouseup', this.drag_handler_stop);
    }
}

class Stone_Manager 
{
    constructor() 
    {
        this.container = document.querySelector('.container');

        this.positions = [
            {id: 'reality', x: 120, y: 120},
            {id: 'space', x: 240, y: 120},
            {id: 'power', x: 360, y: 120},
            {id: 'time', x: 120, y: 240},
            {id: 'mind', x: 240, y: 240},
            {id: 'soul', x: 360, y: 240}
        ];
        
        this.init();
    }

    init() 
    {
        this.positions.forEach(pos => {
            const stone = new Stone(pos.id, pos.x, pos.y);
            this.container.appendChild(stone.element);
        });
    }
}

new Stone_Manager();