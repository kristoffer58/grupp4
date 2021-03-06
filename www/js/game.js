let hitSound = new Audio('/sounds/hit.wav');
let liveLost = new Audio('/sounds/liveLost.wav');
let bgsound = new Audio('/sounds/bg_music.mp3');

function showGame() {
  $('.game').hide();
}

function loadGame() {
  showGame();
  // Main variables
  let lives;
  let score;
  let paused;
  const bricks = [];
  const keysPressed = {};
  const initialPaddleSpeed = 500;
  const initialBallSpeed = 300;
  const paddle = {};
  const ball = {};
  let gameBorders = loadGameBorders();
  $('.game .brick').remove();
  $("#newHigscoreForm").remove();
  let speedLevel = 300;

  // Setup key listeners before starting the first game
  setupKeyListeners();
  $('.startGame, .play').click(startNewGame);
  // Reset starting variables etc
  function startNewGame() {
    $('.startsida, .highscore, .gameOver').hide();
    $('.game').show();
    lives = 3;
    score = 0;

    bgsound.loop = true;
    bgsound.play();
    //paused = false;

    resetPaddle();
    resetBall();
    spawnBricks();

    updateInterface();
    paused = true;  // the game starts when ENTER is pressed
    startInterval();

  }

  function updateGame(deltaTime) {
    if (paused) { 
      // movePaddle(deltaTime);    // able to move paddle in paused mode.
      return;
    }
    bgsound.play();

    movePaddle(deltaTime);
    moveBall(deltaTime);

    ball.speed = speedLevel;
    paddle.speed = speedLevel * 2 - 50;
  }

   /*function updateGame(deltaTime) {
    if (paused) { movePaddle(deltaTime); return; }  // able to move the paddle when paused
    moveBall(deltaTime);
  }
*/

  function movePaddle(deltaTime) {
    const direction = calculatePaddleDirection();
    const velocity = direction * paddle.speed * deltaTime;
    paddle.left += velocity;
    if (paddle.left < gameBorders.left) { paddle.left = 0; }
    if (paddle.left + paddle.width > gameBorders.width) { paddle.left = gameBorders.width - paddle.width; }
    paddle.$.css('left', paddle.left);
  }

  function moveBall(deltaTime) {
    // console.log(ball.direction.x,"ball.direction.x")
    ball.left += ball.direction.x * ball.speed * deltaTime;
    ball.top += ball.direction.y * ball.speed * deltaTime;
    
    if (!collisionDetectBallAndGame()) { return; }
    collisionDetectBallAndBricks();
    collisionDetectBallAndPaddle();

    ball.$.css('left', ball.left);
    ball.$.css('top', ball.top);
  }

  function calculatePaddleDirection() {
    let movementVelocity = 0;
    if (keysPressed.left) { --movementVelocity; }
    else if (keysPressed.right) { ++movementVelocity; }
    return movementVelocity;
  }

  function loseLife() {
    --lives;
    paused = true;
    updateInterface();
    resetBall();
    resetPaddle();
    liveLost.play();
    
  }

  function collisionDetectBallAndGame() {
    if (ball.left < gameBorders.left) {
      ball.left = 0;
      ball.direction.x *= -1;
    } else if (ball.left + ball.width > gameBorders.width) {
      ball.left = gameBorders.width - ball.width;
      ball.direction.x *= -1;
    }

    if (ball.top < gameBorders.top +30) {
      ball.top = 30;
      ball.direction.y *= -1;
    } else if (ball.top + ball.height > gameBorders.height) {
      loseLife();
      return false;
    }
    return true;
  }

  function collisionDetectBallAndPaddle() {
    if (!isRectAOutsideRectB(ball, paddle)) {

      let paddleLeftCorner=paddle.left; //  -> []
      let paddleCenter=paddleLeftCorner+(paddle.width/2);//  [ >< ]
      let ballCenter=ball.left+(ball.width/2) ;//  (><)
      let ratioA=1.; // 1.2 THIS CAN BE CHANGED FOR SPEED AND ANGLE  
      let ratioB=3;   // 3 THIS TO.
      //bounce angle
      let dXAngle=Math.abs(paddleCenter-ballCenter)*ratioA/(paddle.width/ratioB); 
      // console.log(ballCenter);
      // console.log(paddleCenter);
      // console.log(dXAngle);

      if (ballCenter < paddleCenter){
       ball.direction.x=(dXAngle*(-1));
        
      }
      if (ballCenter > paddleCenter){
         ball.direction.x=dXAngle;
        
      }

      // if halfXSpeed is set then "reset" to normal
      // if(ball.direction.halfXSpeed){
      //   ball.direction.x *= 2;
      //   ball.direction.halfXSpeed = false;
      // }
 
      ball.direction.y *= -1;
      ball.top = paddle.top - ball.height;
      score += 5;
      updateInterface();
      hitSound.play();
    }
  }

  function collisionDetectBallAndBricks() {
    for (let i = bricks.length - 1; i >= 0; --i) {
      const brick = bricks[i];
      if (!isRectAOutsideRectB(ball, brick)) {
        if (getHorizontalOrVerticalDirection(brick, ball) == 'horizontal') {
          // If it bounced on the side of the brick
          ball.direction.x *= -1;
        } else {
          // If it bounced above/below a brick
          ball.direction.y *= -1;
        }
        brick.$.remove();
        bricks.splice(i, 1);
        score += 20;
        updateInterface();
        hitSound.play();
      }
    }
    if (bricks.length == 0) { // insert spawn bricks and increase ball speed-function here. Ends at lives >1.
      paused = true;
      updateInterface();
    }
  }

  // Assumes the properties: left, top, width, height
  function isRectAOutsideRectB(a, b) {
    if (a.left > b.left + b.width) return true; // to the right
    if (a.left + a.width < b.left) return true; // to the left
    if (a.top > b.top + b.height) return true; // below
    if (a.top + a.height < b.top) return true; // above
    return false;
  }

  // Does not work for rectangles, only squares
  // Changes the ball's direction after collision with bricks
  function getHorizontalOrVerticalDirection(objA, objB) {
    
    return 'vertical'; // Always return 'vertical' for non-square bricks
    // Todo: fix code for rectangle bricks
    const aY = objA.top + objA.height / 2;
    const aX = objA.left + objA.width / 2;
    const bY = objB.top + objB.height / 2;
    const bX = objB.left + objB.width / 2;
    const direction = Math.abs(Math.atan2(aY - bY, aX - bX));
    return (Math.abs(direction) < Math.PI / 4 || Math.abs(direction) > Math.PI / 4 * 3) ? 'horizontal' : 'vertical';
  }

  function updateInterface() {
    
    $('.score span, .scoreGameOver span, .newHighscoreInput span').text((score + '').padStart(4, '0'));
    $('.lives span').text(lives);
    $('.main-text').hide();
    if (lives < 1) {    
      sendNewHigscoreToServer(score) // this one is in newHighscore.js
      bgsound.pause();
      bgsound.currentTime = 0;
      speedLevel = 300;
      $(".ball").css("background", "radial-gradient(circle at 10px 10px, #ffffff, #353535)");

     } else if (paused) {
      
    } else {
      $('.main-text').text('');
    }

    // when all bricks are knocked down and
    if (bricks.length<1 ) {

      function startInterval() {
        const updateSpeed = 10; // lower = faster
        clearInterval(window.gameInterval);
        // Wait a short delay before starting to let the player prepare
        setTimeout(() => {
          let previousTime = performance.now() - updateSpeed;
          window.gameInterval = setInterval(() => {
            const now = performance.now();
            updateGame((now - previousTime) / 1000);
            previousTime = now;
          }, updateSpeed);
        }, 1000);
      }
      speedLevel = speedLevel + 50;
      startInterval();
      resetPaddle();
      resetBall();
      spawnBricks();
      ball.speed = speedLevel;

      function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      
      
      $(".ball").css("background", "radial-gradient(circle at 10px 10px, #ffffff," + getRandomColor());

      // must define that you are on stage <= 2 and set new initialBallSpeed to maintain ball.speed even after losing a life.
      console.log(speedLevel);
      // updateInterface();

      //   $('.main-text').text('CONGRATULATIONS - YOU WON'); 
       
    $('.main-text').fadeIn(500);
    }
  }

  function onEnterPress() {
    if (keysPressed.enter) { return; }
    keysPressed.enter = true;

    if (lives > 0) {
      bgsound.pause();
      paused = !paused;
    } else {
      startNewGame();
      $('.game').show();
      $('.newHighscoreInput').hide();
      $("#newHigscoreForm").remove();
    }

    updateInterface();
  }

  function setupKeyListeners() {
    $(window).keydown(function (e) {
      if (e.which === 37) { keysPressed.left = true; }
      if (e.which === 39) { keysPressed.right = true; }
      if (e.which === 13) { onEnterPress(); }
    });

    $(window).keyup(function (e) {
      if (e.which === 37) { keysPressed.left = false; }
      if (e.which === 39) { keysPressed.right = false; }
      if (e.which === 13) { keysPressed.enter = false; }
    });
  }

  function loadGameBorders(){
    return {
      left: 0,
      top: 0,
      width: $('.game').width(),
      height: $('.game').height()
    };
  }

  function resetPaddle() {
    paddle.$ = $('.paddle');
    paddle.speed = initialPaddleSpeed;

    paddle.top = paddle.$.position().top;
    paddle.left = paddle.$.position().left;
    paddle.width = paddle.$.width();
    paddle.height = paddle.$.height();

    paddle.$.css('left', (paddle.left = gameBorders.width / 2 - paddle.width / 2));
  }

  //ball position 
  function resetBall() {
    ball.$ = $('.ball');
    ball.speed = initialBallSpeed;
    ball.$.css('left', (ball.left = gameBorders.width / 2 - ball.width));
    ball.$.css('top', (ball.top = paddle.top - paddle.height));
    ball.direction = { x: 1, y: 1 };

    ball.width = ball.$.width();
    ball.height = ball.$.height();

    ball.$.css('left', (ball.left = gameBorders.width / 2 - ball.width /2));
    ball.$.css('top', (ball.top = paddle.top - ball.height));
    ball.direction = { x: 1, y: -1 };
  }

  function spawnBricks() {
    const brickCSS = getBrickCSS('left', 'top', 'width', 'height');

    const colors = [
      'rgb(0, 0, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 255)',
      'rgb(255, 255, 255)',
      'rgb(0, 0, 255)',
    ];

    let prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft, brickCSS.top, brickCSS.width, brickCSS.height, color);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 1; //distance in bricks between bricks: 1 = 0 distance, 2 = 1 brick's distance
    }
   
    prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft, brickCSS.top + brickCSS.height, brickCSS.width, brickCSS.height, color);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 1;
    }
    prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft,  brickCSS.top + brickCSS.height + brickCSS.height, brickCSS.width, brickCSS.height, color);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 1;
    }
  }

  function createBrick(left, top, width, height, backgroundColor) {
    const brick = $('<div class="brick">').css({ backgroundColor, left, top });
    return {
      $: brick,
      left,
      top,
      width,
      height,
      backgroundColor
    };
  }

  function getBrickCSS(...properties) {
    const tempBrick = $('<div class="brick">').appendTo('.game');
    const css = {}
    for (let prop of properties) {
      css[prop] = parseInt(tempBrick.css(prop));
    }
    tempBrick.remove();
    return css;
  }

  function startInterval() {
    const updateSpeed = 10; // lower = faster
    clearInterval(window.gameInterval);
    // Wait a short delay before starting to let the player prepare
    setTimeout(() => {
      let previousTime = performance.now() - updateSpeed;
      window.gameInterval = setInterval(() => {
        const now = performance.now();
        updateGame((now - previousTime) / 1000);
        previousTime = now;
      }, updateSpeed);
    }, 1000);
  }
}

$('.play-game').click(function() {

  $('.startsida').show();
  $('.game').hide();
  $('.highscore').hide();
  $('.newHighscoreInput').hide();
  $('.gameOver').hide();
  resetHighscoreList();
});

$('.highScoreButton').click(function(){
  $('.startsida').hide();
  $('.highscore').show();
  $('.backGameOver').hide();
  $('.back').show();
  
});

$('.highScoreButtonOver').click(function(){
  $('.gameOver').hide();
  $('.highscore').show();
  $('.backGameOver').show();
  $('.back').hide();
});

$('.back').click(function(){
  $('.startsida').show();
  $('.highscore, .gameOver').hide();
  resetHighscoreList();
});

$('.backGameOver').click(function(){
  $('.gameOver').show();
  $('.highscore').hide();
  $('.backGameOver').hide();
  $('.back').show();
  resetHighscoreList();
});

$('#highscoreSubmit').click(function(){
  $('.startsida').show();
  $('.highscore').hide();
  $('.backGameOver').hide();
  $('.back').show();
});