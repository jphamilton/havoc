export class Camera  {
    
    // camera position (center of viewport)
    x: number;
    y: number;

    private cameraWidth: number;
    private cameraHeight: number;
    private worldWidth: number;
    private worldHeight: number;
    
    // x - offsetX, y - offsetY = top left corner camera
    // used to calculate clipped regions
    private offsetX: number;
    private offsetY: number;
  

    following: Object2D;

    private counter = 0;

    constructor(x: number, y: number, cameraWidth: number, cameraHeight: number, worldWidth: number, worldHeight: number) {
        
        this.cameraWidth = cameraWidth;
        this.cameraHeight = cameraHeight;
        this.worldWidth = worldWidth;    
        this.worldHeight = worldHeight;    

        this.offsetX = this.cameraWidth / 2;
        this.offsetY = this.cameraHeight / 2;
        
        this.x = x;
        this.y = y;

    }

    // left, top, right, bottom - 
    // Assumes that whatever the camera is tracking will wrap
    // the world when it goes out of bounds.
    get left() {
        let result = this.x - this.offsetX;
        if (result < 0) {
            result += this.worldWidth;
        }
        return result;
    }

    get top() {
        let result = this.y - this.offsetY;
        if (result < 0) {
            result += this.worldHeight;
        }
        return result;
    }

    get right() {
        return this.left + this.cameraWidth;
    }

    get bottom() {
        return this.top + this.cameraHeight;
    }


    private calcClipRegions() {
        const regions: Rect[] = []; 
        
        if (this.right > this.worldWidth) {
            
            // base - not wrapped
            regions.push({
                top: this.top,
                left: this.left,
                right: this.worldWidth,
                bottom: Math.min(this.bottom, this.worldHeight)
            });

            // 1
            regions.push({
                top: this.top,
                left: 0,
                right: this.right - this.worldWidth,
                bottom: Math.min(this.bottom, this.worldHeight)
            });

            if (this.bottom > this.worldHeight) {

                // 4
                regions.push({
                    top: 0,
                    left: 0,
                    right: this.right - this.worldWidth, 
                    bottom: this.bottom - this.worldHeight
                });

                // 3
                regions.push({
                    top: 0,
                    left: this.left,
                    right: this.worldWidth,
                    bottom: this.bottom - this.worldHeight
                });
            }

            
        } else if (this.bottom > this.worldHeight) {

                // base
                regions.push({
                    left: this.left,
                    right: this.right,
                    top: this.top,
                    bottom: this.worldHeight
                });

                regions.push({
                    left: this.left,
                    right: this.right,
                    top: 0,
                    bottom: this.bottom - this.worldHeight
                });

        } else {

            regions.push({
                left: this.left,
                right: this.right,
                top: this.top,
                bottom: this.bottom
            });

        }    

        return regions;
    }

    translateToScreen(objects: Object2D[]): Object2D[] {
        
        const regions = this.calcClipRegions();
        const results: Object2D[] = [];
        
        regions.forEach(region => {

            objects.forEach(obj => {

                // check if object exists in a region
                if (obj.world.x >= region.left && obj.world.x <= region.right && obj.world.y >= region.top && obj.world.y <= region.bottom) {
                    
                    // translate object to screen coordinates using camera top, left
                    obj.x = obj.world.x - this.left;
                    obj.y = obj.world.y - this.top;

                    
                    // if object is "offscreen" then wrap it
                    if (obj.x < 0) {
                        obj.x += this.worldWidth;
                    }

                    if (obj.y < 0) {
                       obj.y += this.worldHeight;
                    }
                    
                    results.push(obj);
                }

            });

        });

        return results;
    }
    
    follow(x: number, y: number, lerp: Function) {
        const dx = lerp(this.x, x, .1);
        const dy = lerp(this.y, y, .1);

        this.x += dx;
        this.y += dy;

        return {
            x: dx,
            y: dy
        }
    }
}