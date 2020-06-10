var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];

var userClickedPattern;

var started=true;

var level=0;

function nextSequence()
{
  level++;
  $("h1").text("level "+level);
  userClickedPattern=[];
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkPattern(userClickedPattern.length-1);
});
$(document).keypress(function(event){
  if(started)
  {
    nextSequence();
    started=false;
  }
});
function checkPattern(patternValue)
{
  if(gamePattern[patternValue]===userClickedPattern[patternValue])
  {
    if(gamePattern.length===userClickedPattern.length)
    {
        setTimeout(function(){
          nextSequence();
        }, 500);
    }
  }
  else{
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key To Continue");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);
    startOver();
  }
}
function playSound(fileName)
{
  var audio=new Audio("sounds/" + fileName + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver()
{
started=true;
gamePattern=[];
level=0;
}
