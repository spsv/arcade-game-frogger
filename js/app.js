
// global variables
var score=0.0;
var timer;
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
    const initspeed = 150;
    const limitspeed = 500;
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
    this.setSprite();
    this.x = x;
    this.y = y;
    this.speed = speed;
};

/**
 * @description SetSprite() method to select the player image
 * @param {} - none
 * @return void
 */

Player.prototype.setSprite = function () {
    
    var boy = $('#char-boy');
    var catGirl = $('#char-cat-girl');
    var hornGirl = $('#char-horn-girl');
    var pinkGirl = $('#char-pink-girl');
    var princessGirl = $('#char-princess-girl');
    var characters = [boy, catGirl, hornGirl, pinkGirl, princessGirl];
    boy.addClass("img-on");
    this.sprite = $('.img-on').attr('src');
    var removeImageClass = function () {
        characters.forEach(character => {
            character.removeClass("img-on");
    });  
    }
    var selectPlayer = function (that) {
        $(that).addClass("img-on");
        player.setImage();
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
 * @description SetImage() method to define the source attribute of player image
 * @param {} - none
 * @return void
 */

Player.prototype.setImage = function () {
    this.sprite = $('.img-on').attr('src');
};

 /**
 * @description Update() method to calculate collisions with enemies and gems. Define limits of the player
 * @param {} - none
 * @return void
 */

Player.prototype.update = function(){

    //check collisions with enemies
    allEnemies.forEach(enemy => {
        if (this.x >= enemy.x && this.x < enemy.x + 50 && this.y >= enemy.y && this.y < enemy.y + 50) {
            alert('Game Over. Your score was: '+Math.round(score));
            clearInterval(timer);
            player.x=200;
            player.y=350;
            $('.minutes').html("00");
            $('.seconds').html('00');
            score=0;
            $('#score').html(Math.round(score));
            startTime();
        }
    });
    //check collision with gems
    allGems.forEach(gems => {
        if (this.x >= gems.x+1  && this.x < gems.x + 50 && this.y >= gems.y && this.y < gems.y + 50) {
            score=score+0.1;
            $('#score').html(Math.round(score));
            

        }
    });
    //win
    if (this.y < 0) {
        score++;
        this.x = 200;
        this.y = 350;
        $('#score').html(Math.round(score));
    }
    //check limits
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }
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
            break;
        case 'left':
            this.x = this.x - this.speed - dv;
            break;
        case 'up':
            this.y = this.y - this.speed - dv;
            break;
        case 'down':
            this.y = this.y + this.speed + dv;
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
    const initspeed = 50;
    const limitspeed = 200;
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
    const initspeed = 250;
    const limitspeed = 400;
    let enemy = new Enemy(0, posY, initspeed + seedRandom(limitspeed));
    return allEnemies.push(enemy);
});
var gemPosY = [70, 140, 230].forEach(posY => {
    const initspeed = 50;
    const limitspeed = 200;
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

