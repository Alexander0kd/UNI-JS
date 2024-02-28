const SpeakHello = {};

SpeakHello.speakWord = "Hello";
    
SpeakHello.speak = function (name) {
  console.log(SpeakHello.speakWord + " " + name);
}