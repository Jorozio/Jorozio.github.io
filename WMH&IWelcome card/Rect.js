// document.body.style.cursor = 'none';

class Rectangle {
    constructor(x, y, w, h, gap, textImgBounds,maxStrokeWidth) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gap = gap; // Gap size between rectangles
        this.angle = 0; // Initial angle

        this.color = 0; 
        this.strokeColour = 0;
        this.textImgBounds = textImgBounds;
        this.maxStrokeWidth = maxStrokeWidth; // Maximum stroke width
    }

    checkMouseIntersection(mouseX, mouseY) {
        const detectionRadius = 24; // Example radius, adjust as needed
        // Check if the mouse is intersecting the rectangle
        if (dist(mouseX, mouseY, this.x + this.w / 2, this.y + this.h / 2) < detectionRadius) {
            // Change the rectangle's color to white if it's intersected by the mouse
            this.color = '#ff378c'; // Set color to white
            this.angle = TWO_PI;
        } else {
            // Otherwise, reset the color to black (or whatever your default color is)
            this.color = 0;
        }
    }


    drawRect() {
        push(); // Save the current state
        translate(this.x + this.w / 2, this.y + this.h / 2); // Move to the center of the rectangle
        rotate(this.angle); // Rotate around the center

            // Calculate the distance from the mouse to the rectangle's center
    let distToCenter = dist(mouseX, mouseY, this.x + this.w / 2, this.y + this.h / 2);

    // Normalize the distance to a value between 0 and 1
    let normalizedDist = map(distToCenter, 0, sqrt(width*width + height*height), 0, 1);

    // Map the normalized distance to a stroke width between min and max
    let strokeWidth = map(normalizedDist, 0, 1, 0, this.maxStrokeWidth);
    strokeWeight(strokeWidth);
        fill(this.color);
        stroke(this.strokeColour)
        rect(-this.w / 2, -this.h / 2, this.w, this.h); // Draw the rectangle centered at the origin
        pop(); // Restore the previous state
    }

    getAngleTowards(mouseX, mouseY) {
        let dx = mouseX - this.x;
        let dy = mouseY - this.y;
        return atan2(dy, dx); // Returns the angle in radians
    }

    rotateTowards(targetX, targetY) {
        let targetAngle = this.getAngleTowards(targetX, targetY);
        let angleDifference = targetAngle - this.angle;

        // Check if the angle difference crosses 180 degrees
        if (abs(angleDifference) > PI) {
            if (angleDifference > 0) {
                this.angle -= TWO_PI;
            } else {
                this.angle += TWO_PI;
            }
        }

        // Now, smoothly interpolate the angle towards the target angle
        this.angle += (targetAngle - this.angle) * 0.5;

    }
    checkOverlapWithTextImg() {
        // Check if the rectangle overlaps with textImg's bounding box
        return!(this.x + this.w < this.textImgBounds.x ||
                 this.x > this.textImgBounds.x + this.textImgBounds.w ||
                 this.y + this.h < this.textImgBounds.y ||
                 this.y > this.textImgBounds.y + this.textImgBounds.h);
    }

    updateColorIfOverlapping() {
        if (this.checkOverlapWithTextImg()) {
     
            this.color = '#d7ff38';
            this.strokeColour = '#d7ff38';
            
        
        }
    }

}
