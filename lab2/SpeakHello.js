const SpeakHello = (() => {
    const speakWord = "Hello";

    function speak(name) { 
        console.log(speakWord + " " + name);
    }

    return {
        speak: speak
    }
})();