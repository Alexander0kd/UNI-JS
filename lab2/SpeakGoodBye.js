const SpeakGoodBye = (() => {
    const speakWord = "Good Bye";

    function speak(name) {
        console.log(speakWord + " " + name);
    }

    return {
        speak: speak
    }
})();