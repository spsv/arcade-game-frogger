"use strict";
// global variables
//var score=0.0;
var timer;
let initspeed=100;
let limitspeed=100;
var characters=[];
/**
 * @description Enemy class
 * @param {} - x,y,speed
 * @return void
 */

 var Enemy = function(x,y,speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed = speed;
};

/**
 * @description Update() method to give movement to enemies
 * @param {dt} number
 * @return void
 */

 Enemy.prototype.update = function(dt) {
    initspeed = 150;
    limitspeed = 500;
    this.x = this.x + (this.speed*dt);
    if (this.x > 510) {  //canvas.width
        this.x = -150;
        this.speed = initspeed + seedRandom(limitspeed);
    }
};

/**
 * @description Render() method to draw the enemy
 * @param {} - none
 * @return void
 */

 Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description Player class
 * @param {x,y,speed} numbers
 * @return void
 */

 var Player = function (x,y,speed) {
    this.selectSprite();
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.score=0;
};

/**
 * @description SetSprite() method to select the player image
 * @param {} - none
 * @return void
 */

Player.prototype.setSprite = function () {
    
    this.sprite = $('.img-on').attr('src');
};

/**
 * @description SelectSprite() method to capture the clicked image
 * @param {} - none
 * @return void
 */
Player.prototype.selectSprite = function () {
    var boy = $('.char-boy');
    var catGirl = $('.char-cat-girl');
    var hornGirl = $('.char-horn-girl');
    var pinkGirl = $('.char-pink-girl');
    var princessGirl = $('.char-princess-girl');
    characters = [boy, catGirl, hornGirl, pinkGirl, princessGirl];
    boy.addClass("img-on");
    this.setSprite();
    var removeImageClass = function () {
        characters.forEach(character => {
            character.removeClass("img-on");
        });
    }
    var selectPlayer = function (that) {
        $(that).addClass("img-on");
        player.setSprite(); // here, when I put 'player' the program runs ok but when I put 'this', I have the following error : Cannot read property 'setSprite' of undefined
        // I think the error is because "this" changes when I click the image on ClickSelection 
    };
    var clickSelection = function () {
        characters.forEach(character => {
            character.click(function () {
                removeImageClass();
                selectPlayer(this);
            });
        });
    };
    clickSelection();
};

 /**
 * @description Update() method to calculate collisions with enemies and gems. Define limits of the player
 * @param {} - none
 * @return void
 */

Player.prototype.update = function(){

    //check collisions with enemies
    allEnemies.forEach(enemy => {
        if (this.x >= enemy.x && this.x < enemy.x + 50 && this.y >= enemy.y  && this.y < enemy.y + 66) {
            alert('Game Over. Your score was: '+Math.round(this.score));
            clearInterval(timer);
            this.x=200;
            this.y=350;
            $('.minutes').html("00");
            $('.seconds').html('00');
            this.score=0;
            $('.score').html(Math.round(this.score));
            startTime();
        }
    });
    //check collision with gems
    allGems.forEach(gems => {
        if (this.x >= gems.x  && this.x < gems.x + 150 && this.y >= gems.y && this.y < gems.y + 100) {
            this.score=this.score+0.1;
            $('.score').html(Math.round(this.score));
            

        }
    });
};

/**
 * @description render() method to draw the player
 * @param {} - none
 * @return void
 */

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * @description handelInput() method to manage the keys
 * @param {} - allowedKeys
 * @return void
 */

Player.prototype.handleInput = function(allowedKeys){
    const dv=30;
    switch(allowedKeys){
        case 'right':
            this.x = this.x + this.speed + dv;
            if (this.x > 400) {
                this.x = 400;
            }
            break;
        case 'left':
            this.x = this.x - this.speed - dv;
            if (this.x < 0) {
                this.x = 0;
            }
            break;
        case 'up':
            this.y = this.y - this.speed - dv;
            if (this.y < 0) { //win
                this.score++;
                this.x = 200;
                this.y = 350;
                $('.score').html(Math.round(this.score));
            }
            break;
        case 'down':
            this.y = this.y + this.speed + dv;
            if (this.y > 380) {
                this.y = 380;
            }
            break;
        }
};

/**
 * @description Gems class
 * @param {x y speed} numbers 
 * @return void
 */

var Gems = function(x,y,speed){
    var gemBlue = 'images/gem-blue.png';
    var gemGreen = 'images/gem-green.png';
    var gemOrange = 'images/gem-orange.png';
    var gemsColors = [gemBlue, gemGreen, gemOrange];

    this.sprite = gemsColors[Math.floor(Math.random()*3)];
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/**
 * @description update() method to give speed to the gems
 * @param {dt} number
 * @return void
 */

Gems.prototype.update = function(dt){
    initspeed = 50;
    limitspeed = 200;
    this.x = this.x + (this.speed * dt);
    if (this.x > 510) {  //canvas.width
        this.x = -150;
        this.speed = initspeed + seedRandom(limitspeed);
    }
};

/**
 * @description render() method to draw the gems
 * @param {} - none
 * @return void
 */

Gems.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
startTime();
var player = new Player(200,350,0);
var allEnemies = [];
var allGems=[];
var gems = new Gems();
var enemyPosY = [50, 150, 225].forEach(posY => {
    initspeed = 250;
    limitspeed = 400;
    let enemy = new Enemy(0, posY, initspeed + seedRandom(limitspeed));
    return allEnemies.push(enemy);
});
var gemPosY = [70, 140, 220].forEach(posY => {
    initspeed = 50;
    limitspeed = 200;
    let gems = new Gems(0, posY, initspeed + seedRandom(limitspeed));
    return allGems.push(gems);
});

/**
 * @description listens for key presses and sends keys
 * @param {} - none
 * @return void
 */

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/**
 * @description generate a random speed
 * @param {seed} number
 * @return void
 */

function seedRandom(seed){
  return Math.floor(Math.random()*seed);
};

/**
 * @description initiate the timer
 * @param {} - none
 * @return void
 */

function startTime() {
var sec = 0;
function time(val) { return val > 9 ? val : "0" + val; }
    timer = setInterval(function () {
    $(".seconds").html(time(++sec % 60));
    $(".minutes").html(time(parseInt(sec / 60, 10)));
    }, 1000);
}

