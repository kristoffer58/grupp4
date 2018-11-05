$('.startGame, .play').click(function loadGame() {

  $('.startsida, .highscore').hide();
  $('.game').show();

  // Main variables
  let lives;
  let score;
  let paused;
  const bricks = [];
  const keysPressed = {};
  const initialPaddleSpeed = 300;
  const initialBallSpeed = 200;
  const paddle = {};
  const ball = {};
  let gameBorders = loadGameBorders();
  let hitSound = new Audio('/sounds/hit.wav')
  let liveLost = new Audio('/sounds/liveLost.wav')

  // Setup key listeners before starting the first game
  setupKeyListeners();
  startNewGame();

  // Reset starting variables etc
  function startNewGame() {
    lives = 3;
    score = 0;
    paused = false;

    resetPaddle();
    resetBall();
    spawnBricks();

    updateInterface();
    startInterval();
  }

  function updateGame(deltaTime) {
    if (paused) { return; }

    movePaddle(deltaTime);
    moveBall(deltaTime);
  }

  function movePaddle(deltaTime) {
    const direction = calculatePaddleDirection();
    const velocity = direction * paddle.speed * deltaTime;
    paddle.left += velocity;
    if (paddle.left < gameBorders.left) { paddle.left = 0; }
    if (paddle.left + paddle.width > gameBorders.width) { paddle.left = gameBorders.width - paddle.width; }
    paddle.$.css('left', paddle.left);
  }

  function moveBall(deltaTime) {
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
      // if the ball touches first 50 pixels of the paddle and the ball approaches from left to right side - go back left
      if (ball.left <= paddle.left + 50){
        if(ball.direction.x >= 0) {
          ball.direction.x *= -1;  
        }
        else {
          ball.direction.x *= +1;
        }
      }
      // if the ball touches last 50 pixels of the paddle and the ball approaches from right to right side - go back right
      else if (ball.left >= paddle.left + 250){
        if (ball.direction.x <=0) {
          ball.direction.x *= -1;
        }
        else {
          ball.direction.x *= +1;  
        }
        
      }

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
    if (bricks.length == 0) {
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
    
    $('.score span').text((score + '').padStart(5, '0'));
    $('.lives span').text(lives);
    $('.main-text').hide();
    if (lives < 1) {
      $('.main-text').text('GAME OVER - PRESS ENTER TO PLAY AGAIN');
      sendNewHigscoreToServer(score) // this one is in newHighscore.js 
     } else if (paused) {
      
      
    } else {
      $('.main-text').text('');
    }
    if (!bricks.length) {
      //   $('.main-text').text('CONGRATULATIONS - YOU WON');
         sendNewHigscoreToServer(score) // this one is in newHighscore.js 
       
    $('.main-text').fadeIn(500);
    }
  }

  function onEnterPress() {
    if (keysPressed.enter) { return; }
    keysPressed.enter = true;

    if (lives > 0) {
      paused = !paused;
    } else {
      startNewGame();
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
    ball.$.css('left', (ball.left = gameBorders.width / 2 - 15));
    ball.$.css('top', (ball.top = paddle.top - paddle.height));
    ball.direction = { x: 1, y: 1 };

    ball.width = ball.$.width();
    ball.height = ball.$.height();
  }

  function spawnBricks() {
    const brickCSS = getBrickCSS('left', 'top', 'width', 'height');

    const colors = [
      'rgb(255, 0, 0)',
      'rgb(0, 255, 0)',
      'rgb(0, 0, 255)',
      'rgb(255, 255, 0)',
      'rgb(255, 0, 255)',
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
      const brick = createBrick(prevLeft + 35, brickCSS.top + 25, brickCSS.width, brickCSS.height, color);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 2;
    }
    prevLeft = brickCSS.left;

    for (let color of colors) {
      const brick = createBrick(prevLeft - 20,  brickCSS.top + 60, brickCSS.width, brickCSS.height, color);

      bricks.push(brick);
      $('.game').append(brick.$);

      prevLeft += brickCSS.width * 2;
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
});

$('.play-game').click(function() {

  $('.startsida').show();
  $('.game').hide();
  $('.highscore').hide();
  resetHighscoreList();
});

$('.highScoreButton').click(function(){
  $('.startsida').hide();
  $('.highscore').show();
  resetHighscoreList();
  
});

$('.back').click(function(){
  $('.startsida').show();
  $('.highscore').hide();
  resetHighscoreList();
});
