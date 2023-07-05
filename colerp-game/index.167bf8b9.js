class Game {
    constructor(difficulty, boxContainer, sliders, sliderMode = "rgb"){
        this.score = 0;
        this.boxContainer = boxContainer;
        this.sliders = sliders;
        this.sliderMode = sliderMode;
        if (difficulty == "easy") this.hardMode = false;
        else this.hardMode = true;
        // Remove all color boxes
        while(this.boxContainer.firstChild)this.boxContainer.removeChild(this.boxContainer.firstChild);
        // Add new color boxes
        for(let i = 0; i < this.getNumberOfBoxes(); i++){
            let box = document.createElement("div");
            box.classList.add("color-box");
            if (i == this.getMiddleBoxNumber()) box.setAttribute("id", "result-box");
            this.boxContainer.appendChild(box);
        }
        this.newRound();
    }
    newRound() {
        let color1 = this.randomColor();
        let color2 = this.randomColor();
        for(let i = 0; i < this.getNumberOfBoxes(); i++){
            let box = this.boxContainer.children[i];
            box.style.backgroundColor = this.lerpColor(color1, color2, i / (this.getNumberOfBoxes() - 1));
            if (i == this.getMiddleBoxNumber()) {
                box.style.backgroundColor = "transparent";
                this.targetColor = this.lerpColor(color1, color2, 0.5);
            }
        }
    }
    computeResultColor() {
        if (this.sliderMode == "rgb") {
            let r = parseInt(this.sliders.red.value);
            let g = parseInt(this.sliders.green.value);
            let b = parseInt(this.sliders.blue.value);
            return this.rgbToHex(r, g, b);
        }
    }
    getTargetColor() {
        return this.targetColor;
    }
    computeScore() {
        let resultColor = this.hexToRgb(this.computeResultColor());
        let targetColor = this.hexToRgb(this.targetColor);
        let dr = resultColor.r - targetColor.r;
        let dg = resultColor.g - targetColor.g;
        let db = resultColor.b - targetColor.b;
        let distance = Math.sqrt(dr * dr + dg * dg + db * db);
        let score = 100 - Math.floor(distance);
        if (score < 0) score = 0;
        return score;
    }
    getNumberOfBoxes() {
        if (this.hardMode) return 3;
        else return 5;
    }
    getMiddleBoxNumber() {
        if (this.hardMode) return 1;
        else return 2;
    }
    rgbToHex(r, g, b) {
        r = r.toString(16);
        r = r.length == 1 ? "0" + r : r;
        g = g.toString(16);
        g = g.length == 1 ? "0" + g : g;
        b = b.toString(16);
        b = b.length == 1 ? "0" + b : b;
        return "#" + r + g + b;
    }
    hexToRgb(hex) {
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);
        return {
            r: r,
            g: g,
            b: b
        };
    }
    randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        let hex = this.rgbToHex(r, g, b);
        return hex;
    }
    lerpColor(color1, color2, amount) {
        let c1 = this.hexToRgb(color1);
        let c2 = this.hexToRgb(color2);
        let r = Math.floor(c1.r + (c2.r - c1.r) * amount);
        let g = Math.floor(c1.g + (c2.g - c1.g) * amount);
        let b = Math.floor(c1.b + (c2.b - c1.b) * amount);
        let hex = this.rgbToHex(r, g, b);
        return hex;
    }
}

//# sourceMappingURL=index.167bf8b9.js.map
