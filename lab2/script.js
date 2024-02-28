(() => {
    const names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];
    
    for (const name of names) {
        if (name.charAt(0).toLowerCase() === 'j') {
            SpeakHello.speak(name);
        } else {
            SpeakGoodBye.speak(name);
        }
    }
    
    console.log("Say Hello to people whose last character in their name has an ASCII code < 100. Else, say goodbye:");
    
    for (const name of names) {
        if (name.charCodeAt(name.length - 1) < 100) {
            SpeakHello.speak(name);
        } else {
            SpeakGoodBye.speak(name);
        }
    }
})();