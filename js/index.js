/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas');
const resize = () => {
    canvas.width = window.innerWidth * devicePixelRatio; //确保高清
    canvas.height = window.innerHeight * devicePixelRatio;
};
resize();
window.addEventListener(
    'resize',
    () => {
        resize();
    },
    false
);
const particles = [];
const COLORS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423']; //彩色池子
const ctx = canvas.getContext('2d');

const getRandom = (min, max) => {
    return ~~(Math.random() * (max - min + 1) + min);
};

const getRandomColor = () => {
    return COLORS[getRandom(0, COLORS.length - 1)];
};

const getRandomR = () => {
    return getRandom(8, 40);
};

const updateParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((i) => {
        i.update();
    });
    requestAnimationFrame(updateParticles);
};

class Particle {
    constructor({ x = 0, y = 0, r = 0, color = '#ffffff' } = {}) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        //设置移动方向
        this.th = getRandom(0, Math.PI * 2);
        this.vx = Math.sin(this.th) * 8;
        this.vy = Math.cos(this.th) * 8;
    }
    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalCompositeOperation = 'lighter';
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        //每次相对x0 顺着th方向移动 0.1距离
        this.vx += Math.cos(this.th) * 0.1;
        this.vy += Math.sin(this.th) * 0.1;
        //增加摩擦系数 增量衰减
        this.vx *= 0.9;
        this.vy *= 0.9;
        //半径衰减
        this.r *= 0.96;
        this.draw();
    }
}

canvas.addEventListener(
    'mousemove',
    (e) => {
        for (let i = 0; i < 4; i++) {
            particles.push(new Particle({ x: e.clientX, y: e.clientY, r: getRandomR(), color: getRandomColor() }));
            if (particles.length > 300) {
                particles.shift();
            }
        }
    },
    false
);
updateParticles();
