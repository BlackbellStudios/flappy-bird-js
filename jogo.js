console.log("AllanDav1d - Portifolio www.allandavid.com.br");

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const background = {
    srcX: 390,
    srcY: 0,
    largura:275,
    altura:204,
    x:0,
    y:canvas.height - 204,

    draw(){
        ctx.fillStyle = '#70C5CE';
        ctx.fillRect(0,0, canvas.width, canvas.height);

        ctx.drawImage(
            sprites, 
            background.srcX, background.srcY, background.largura, background.altura,
            background.x, background.y, background.largura,background.altura
        );

        ctx.drawImage(
            sprites, 
            background.srcX, background.srcY, background.largura, background.altura,
            (background.x + background.largura), background.y, background.largura,background.altura
        );
    }
}

const floor = {
    srcX: 0,
    srcY: 610,
    largura:224,
    altura:112,
    x:0,
    y:canvas.height - 112,

    draw(){
        ctx.drawImage(
            sprites, 
            floor.srcX, floor.srcY, floor.largura, floor.altura,
            floor.x, floor.y, floor.largura,floor.altura
        );

        ctx.drawImage(
            sprites, 
            floor.srcX, floor.srcY, floor.largura, floor.altura,
            (floor.x + floor.largura), floor.y, floor.largura,floor.altura
        );
    }
}

const flappyBird = {
    srcX: 0,
    srcY: 0,
    largura:33,
    altura:24,
    x:10,
    y:60,
    velocidade:0,
    gravidade:0.25,

    instantiate(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;

        flappyBird.draw();
    },

    draw(){
        ctx.drawImage(
            sprites, 
            flappyBird.srcX, flappyBird.srcY, //Sprite X, SpriteY
            flappyBird.largura, flappyBird.altura, //Tamanho do recorte
            flappyBird.x, flappyBird.y, //Posição no canvas
            flappyBird.largura,flappyBird.altura //Tamanho da imagem dentro do canvas
        );
    }
}


function Loop(){
    background.draw();
    floor.draw();

    flappyBird.instantiate();



    requestAnimationFrame(Loop);
}


Loop();