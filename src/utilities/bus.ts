class EventBus {

    private messages = {
        Resize: 'WINDOW_RESIZE',    
        ShipBulletExpired: 'SHIP_BULLET_EXPIRED',
        ShipBulletFired: 'SHIP_FIRED',
    };

    protected handlers: { [event: string]: ((...args: any[])=> void)[]} = {};

    subscribe(event: string, handler: (...args: any[]) => void) {
        if (!this.handlers[event]) {
            this.handlers[event] = [];
        }
        this.handlers[event].push(handler); 
    }

    unsubscribe(event: string, handler: (...args: any[]) => void) {
        this.handlers[event] = this.handlers[event].filter(x => x !== handler); 
    }

    send(event: string, ...args: any[] ) {
        const handlers = this.handlers[event] || [];
        handlers.forEach(x => x(...args));
    }
    
    get Messages() {
        return this.messages;    
    }
}

export const Bus = new EventBus();