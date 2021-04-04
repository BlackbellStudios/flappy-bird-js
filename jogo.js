console.log("AllanDav1d - Portifolio www.allandavid.com.br");

let frame = 0;
const sound_HIT = new Audio();
sound_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const background = {
    srcX: 390,
    srcY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,

    draw() {
        ctx.fillStyle = '#70C5CE';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            sprites,
            background.srcX, background.srcY, background.largura, background.altura,
            background.x, background.y, background.largura, background.altura
        );

        ctx.drawImage(
            sprites,
            background.srcX, background.srcY, background.largura, background.altura,
            (background.x + background.largura), background.y, background.largura, background.altura
        );
    }
}



function isCollider(flappyBird, floor){
const flappyBirdY = flappyBird.y + flappyBird.altura;
const floorY = floor.y;

if(flappyBirdY >= floorY){
    return true;
}
    return false;
}

function instantiateFloor(){
    const floor = {
        srcX: 0,
        srcY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
    update(){
        const movementFloor = 1;
        const repetY = floor.largura / 2;
        const move = floor.x - movementFloor;

        floor.x = move % repetY;
    },
        draw() {
            ctx.drawImage(
                sprites,
                floor.srcX, floor.srcY, floor.largura, floor.altura,
                floor.x, floor.y, floor.largura, floor.altura
            );
    
            ctx.drawImage(
                sprites,
                floor.srcX, floor.srcY, floor.largura, floor.altura,
                (floor.x + floor.largura), floor.y, floor.largura, floor.altura
            );
        }
    }
    return floor;
}

function instantiateFlappyBird(){
    const flappyBird = {
        srcX: 0,
        srcY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 60,
        pulo:4.6,
        velocidade: 0,
        gravidade: 0.25,
    
        update() {
            if(isCollider(flappyBird, globais.floor)){
                flappyBird.draw();
                sound_HIT.play();

                setTimeout(() => {
                    changeScreen(Screens.INICIO);
                }, 500);
                
                return;
            }
    
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.y = flappyBird.y + flappyBird.velocidade;
    
            flappyBird.draw();
        },
        jump(){
            flappyBird.velocidade = - flappyBird.pulo;
        },
        frames:[
            {srcX: 0, srcY: 0, },
            {srcX: 0, srcY: 26,},
            {srcX: 0, srcY: 52,},
            {srcX: 0, srcY: 26,},
        ],
        currentFrame: 0,
        updateCurrentFrame(){
            const frameInterval = 10;
            const frameIntervalPass = frame % frameInterval === 0;

            if(frameIntervalPass){
                const baseIncrement = 1;
                const increment = baseIncrement + flappyBird.currentFrame;
                const baseRepet = flappyBird.frames.length;
                flappyBird.currentFrame = increment % baseRepet;
            }
            
        },
        draw() {
            flappyBird.updateCurrentFrame();
            const { srcX, srcY } = flappyBird.frames[flappyBird.currentFrame];
            ctx.drawImage(
                sprites,
                srcX, srcY, //Sprite X, SpriteY
                flappyBird.largura, flappyBird.altura, //Tamanho do recorte
                flappyBird.x, flappyBird.y, //Posição no canvas
                flappyBird.largura, flappyBird.altura //Tamanho da imagem dentro do canvas
            );
        }
    }
    return flappyBird;
}

const mensagemGetReady = {
    srcX: 134,
    srcY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,

    draw() {
        ctx.drawImage(
            sprites,
            mensagemGetReady.srcX, mensagemGetReady.srcY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        );
    }
}

let currentScreen = {};
const globais = {};
function changeScreen(newScreen){
    currentScreen = newScreen;

    if(currentScreen.start){
        currentScreen.start();
    }
}

const Screens = {
    JOGO: {
        draw() {
            background.draw();
            globais.floor.draw();

            globais.flappyBird.update();
        },
        click(){
            globais.flappyBird.jump();
        },
        update() {
            globais.floor.update();
        }
    },
    GAMEOVER: {
        draw() {

        },
        update() {

        }
    },
    INICIO: {
        start(){
            globais.flappyBird = instantiateFlappyBird();
            globais.floor = instantiateFloor();
        },
        draw() {
            background.draw();
            globais.floor.draw();

            globais.flappyBird.draw();

            mensagemGetReady.draw();
        },
        update() {
            globais.floor.update();
        },
        click(){
            changeScreen(Screens.JOGO);
        }
    }
}

function Loop() {
    currentScreen.draw();
    currentScreen.update();

    frame = frame + 1;
    requestAnimationFrame(Loop);
}

window.addEventListener('click', function(){
    if(currentScreen.click){
        currentScreen.click();
    }
});

changeScreen(Screens.INICIO);
Loop();