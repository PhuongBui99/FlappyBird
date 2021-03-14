const cvs = document.getElementById("flappy");
const ctx = cvs.getContext("2d");

const ground = new Image();
ground.src = "images/bg.png";



const fg = new Image();
fg.src = "images/fg.png";
/*
const fground = {
    
    x : 0,
    y : cvs.height - 118,
    w : 306,
    h : 118,
    dx : 2,
    draw: function(){
        ctx.drawImage(fg,this.x, this.y, this.w,this.h);
        
    },

    update: function(){
             this.x = (this.x - this.dx) % (this.w/2);
    }
}
*/
const fground = {
    
    x : 0,
    y : cvs.height - 118,
    w : 306,
    h : 118,
    dx : 2,
    draw: function(){
        ctx.drawImage(fg,this.x, this.y, this.w,this.h);
        ctx.drawImage(fg,this.x+this.w, this.y, this.w,this.h);
    },

    update: function(){
             this.x = (this.x - this.dx) % (this.w/2);
    }
}



const bird = new Image();
bird.src = "images/bird.png";

const pipeNorth = new Image();
pipeNorth.src = "images/pipeNorth.png";
const pipeSouth = new Image();
pipeSouth.src = "images/pipeSouth.png";

const fly = new Audio();
fly.src = "sounds/fly.mp3";
const scoresound = new Audio();
scoresound.src = "sounds/score.mp3";
const diesound = new Audio();
diesound.src = "sounds/sfx_die.wav";

const sprite = new Image();
sprite.src = "images/sprite.png";

const score = {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0
}

const startBtn = {
    x : 104.5,
    y : 326,
    w : 83,
    h : 29
}

const tap = {
    x : cvs.width - cvs.width/2,
    y : cvs.height/2,
    w : 176,
    h : 83,
}


const endgame = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : cvs.height/2- 202/2,
    draw: function () {
       
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h,
                this.x, this.y, this.w, this.h);
         
           
           
    }
}

const dong = {
    sX : 359,
    sY: 156,
    w : 45,
    h : 45,
    x : cvs.width/2 - 90,
    y :  cvs.height/2 - 15,
    draw: function(){
             ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, 
                this.x, this.y, this.w, this.h)
    }
}

const bac = {
    sX : 359,
    sY: 111,
    w : 45,
    h : 45,
    x : cvs.width/2 - 90,
    y :  cvs.height/2 - 15,
    draw: function(){
             ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, 
                this.x, this.y, this.w, this.h)
    }
}

const vang = {
    sX : 311,
    sY: 158,
    w : 45,
    h : 45,
    x : cvs.width/2 - 90,
    y :  cvs.height/2 - 15,
    draw: function(){
             ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, 
                this.x, this.y, this.w, this.h)
    }
}

const kimcuong = {
    sX : 311,
    sY: 112,
    w : 45,
    h : 45,
    x : cvs.width/2 - 90,
    y :  cvs.height/2 - 15,
    draw: function(){
             ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, 
                this.x, this.y, this.w, this.h)
    }
}



var gap = 80;
var constant = 242 + gap;

var bX = 10;
var bY = 150;
var gravity = 1;

//on key down

/*
document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -=25;
    fly.play();
}
*/
let d;
document.addEventListener("keydown", direction);
function direction(event){
    if(event.keyCode == 38){
        bY -=25;//up
        fly.play();
    }else if(event.keyCode == 40){
        bY +=25;//down
        fly.play();
    }
   
    
}

//pipe coordinate
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}




function draw() {
    
    //draw ground
    ctx.drawImage(ground, 0, 0);

    //draw pipe

    for ( var i =0 ; i< pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        pipe[i].x--;
        
        if(pipe[i].x == cvs.width - 188){
           pipe.push({
            x : cvs.width,
            y : Math.floor(Math.random()*pipeNorth.height) - pipeNorth.height
           });
           
        }
        
       

        if(pipe[i].x == 5){
            scoresound.play();
            score.value++;
        }
        
         //game over
         if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height-fg.height){
                
                bY = cvs.height-fg.height-bird.height;
                diesound.play();
                endgame.draw();
                ctx.fillText(score.value, cvs.width/2 + 65, cvs.height/2 - 5);
                if(score.value > 5){
                    dong.draw();
                }else if(score.value > 50){
                    bac.draw();
                }else if(score.value > 75){
                    vang.draw();
                }else if(score.value > 100){
                    kimcuong.draw();
                }
               
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best",score.best);
                ctx.fillText(score.best, cvs.width/2 + 65, cvs.height/2 + 35);
                clearInterval(game);
                
            }

            
    
    
    }

    cvs.addEventListener("click", function(evt){
        let rect = cvs.getBoundingClientRect();
        let clickX = evt.clientX - rect.left;
        let clickY = evt.clientY - rect.top;
        if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y &&
            clickY <= startBtn.y + startBtn.h){
            location.reload();
        }
    });
   
   
    //draw foreground
   // ctx.drawImage(fg, 0, cvs.height - fg.height);
    fground.draw();
    fground.update();
    
        //draw bird
        ctx.drawImage(bird,bX,bY);
        bY += gravity;
    
        ctx.fillStyle = "black";
        ctx.font = " 25px fantasy";
        ctx.fillText("Score: "+score.value, 10,cvs.height-20);
    
    
   

     //requestAnimationFrame(draw);

}


let game = setInterval(draw, 1000/60);

