var timer, start, factor;
var holders = document.querySelectorAll('.holder');
var holdersCount = holders.length;

var d = document.documentElement;
var domHight = d.scrollHeight;

var holderHeight = domHight / holdersCount;

var arrowUp = document.getElementById('arrow-up');
var arrowDown = document.getElementById('arrow-down');
var switchGrid = document.getElementById('switch_grid');

arrowUp.addEventListener('click', function(){ scrollScreen('up'); });
arrowDown.addEventListener('click', function(){ scrollScreen('down'); } );
switchGrid.addEventListener('click', function(){
  var main = document.getElementsByTagName('main')[0];
  if( main.classList.contains('grid') ){
    main.classList.remove('grid');
  }else{
    main.classList.add('grid');
  }
 });

function scrollScreen(where){
  var currTop = d.scrollTop,
      i = 0,
      divTop = 0,
      holder_slide = null,
      xLoc = 0,
      yLoc = 0;
  for (i = 0; i < holdersCount; i++) {
    divTop = holderHeight * i + holderHeight ;
    if( divTop > currTop ){
      holder_slide = i;
      break;
    }
  }

  if (where == "up") {
    yLoc = holderHeight*(i-1);
  } else if (where == "down") {
    yLoc = holderHeight*(i+1);
  }
  smoothScrollTo(yLoc, 700)
}

function smoothScrollTo(target, duration) {
  var offset = window.pageYOffset,
      delta  = target - window.pageYOffset; // Y-offset difference
  duration = duration || 1000;              // default 1 sec animation
  start = Date.now();                       // get start time
  factor = 0;

  if(timer)
    clearInterval(timer); // stop any running animations

  function step() {
    var y;
    factor = (Date.now() - start) / duration; // get interpolation factor
    if( factor >= 1 ) {
      clearInterval(timer); // stop animation
      factor = 1;           // clip to max 1.0
    }
    y = factor * delta + offset;
    window.scrollBy(0, y - window.pageYOffset);
  }

  timer = setInterval(step, 10);
  return timer;
};

function print_arrow_key(keyCodeNumber) {
    var LEFT = 37,
        UP = 38,
        RIGHT = 39,
        DOWN = 40;

    switch (keyCodeNumber) {
      case UP: scrollScreen('up'); break;
      case DOWN: scrollScreen('down'); break;
      default: break;
    }
}

function checkKeycode(event) {
    // handling Internet Explorer stupidity with window.event
    // @see http://stackoverflow.com/a/3985882/517705
    var keyDownEvent = event || window.event,
        keycode = (keyDownEvent.which) ? keyDownEvent.which : keyDownEvent.keyCode;
    print_arrow_key(keycode);
    return false;
}

document.onkeyup = checkKeycode;
