class Column {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y * 0.9;
        this.width = width;
        this.height = height * 0.5;
        this.queue = [];
        this.color = { r: 1, g: 195, b: 190 };  // Default color
    }

    moveTo(loc, frameCount) {
        this.queue = []; 

        for (let i = 0; i <= frameCount; i++) {
            const t = i / frameCount;
            const d = Math.sin(t * Math.PI);
            this.queue.push({
                x: lerp(this.x, loc.x, t),
                y: lerp(this.y, loc.y, t) + d * this.width * 1.3,
                r: lerp(1, 205, d),
                g: lerp(195, 0, d),
                b: lerp(190, 0, d),
            });
        }
    }

    jump(frameCount) {
        this.queue = [];
        for (let i = 0; i <= frameCount; i++) {
            const t = i / frameCount;
            const j = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - j * this.width * 1.2,
                r: lerp(1, 89, j),
                g: lerp(190, 185, j),
                b: lerp(170, 6, j),
            });
        }
    }

    draw(ctx) {
        let changed = false;

        if (this.queue.length > 0) {
            const { x, y, r, g, b } = this.queue.shift();
            this.x = x;
            this.y = y;
            this.color = { r, g, b };
            changed = true;
        }

        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;

        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, Math.PI, Math.PI * 2, true);
        ctx.lineTo(right, top);
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.stroke();

        return changed;
    }
}
