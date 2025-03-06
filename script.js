let input = document.getElementById("input");

let sortType = document.getElementById("sortType");

const ctx = myCanvas.getContext('2d');

let n = Number(input.value);

let arr = [];

let col = [];

let moves = [];
let frameCount = 20; // Default speed
let speed=document.getElementById("speedIn");
document.getElementById("speed").addEventListener("input", (e) => {
    frameCount =110-Number(e.target.value);
    speed.innerText=110-frameCount;
});

let size=document.getElementById("size");
myCanvas.height=window.innerHeight*0.7;
myCanvas.width=window.innerWidth*0.9;
input.addEventListener("input", function () {
    n = Number(input.value);
    size.innerText=input.value;
    initializeArray();
});


function initializeArray() {
    arr = [];
    col = [];
    for (let i = 0; i < n; i++) {
        arr[i] = Math.random();
    }

    const spacing = myCanvas.width / n;
    for (let i = 0; i < n; i++) {
        const x = i * spacing + spacing / 2;
        const y = myCanvas.height - i * 1.8;
        const width = spacing - 4;
        const height = myCanvas.height * arr[i];
        col[i] = new Column(x, y, width, height);
        col[i].draw(ctx);
    }

    moves = [];
}

function startSorting() {
    switch (sortType.value) {
        case "bubble":
            moves = bubbleSort([...arr]);
            break;
        case "selection":
            moves = selectionSort([...arr]);
            break;
        case "insertion":
            moves = insertionSort([...arr]);
            break;
        case "quick":
            moves = quickSort([...arr]);
            break;
        case "merge":
            moves = mergeSort([...arr]);
            break;
    }
}


const animate = () => {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let changed = false;
    for (let i = 0; i < col.length; i++) {
        changed = col[i].draw(ctx) || changed;
    }
    if (!changed && moves.length > 0) {
        const move = moves.shift();
        const [i, j] = move.indices;
        
        if (move.swap) {
            col[i].moveTo({ x: col[j].x, y: col[j].y }, frameCount);
            col[j].moveTo({ x: col[i].x, y: col[i].y }, frameCount);
            [col[i], col[j]] = [col[j], col[i]];
        }
        else{
            col[i].jump(frameCount)
            col[j].jump(frameCount)
        }
    }
    
    requestAnimationFrame(animate);
};

initializeArray();
animate();
