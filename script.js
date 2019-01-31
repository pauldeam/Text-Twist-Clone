 var arrayOfWords = [];
 var correctGuesses = [];
 var threeLetters = [];
 var fourLetters = [];
 var fiveLetters = [];
 var sixLetters = [];
//  var sevenLetters = [];

 var genericGetRequest = function(URL, callback) {
     var xhr = new XMLHttpRequest();
     xhr.onload = function() {
         if (this.status == 200) {
             callback(JSON.parse(this.response));
         }
     };
     xhr.open("GET", URL);
     xhr.send();
 };

 var showLetters = function(responseObj) {
     //if(arrayOfWords.length < 1 || arrayOfWords == undefined){
         let letters = responseObj.letters;
         let words = responseObj.words;
         console.log(letters, words);
         document.querySelector('.letters').innerHTML = letters;
         document.querySelector('.words').innerHTML = words;
    
         arrayOfWords = document.querySelector('.words').innerHTML.split(','); //create an array of words from string of words seperated by commas
         var arrayLength = arrayOfWords.length; //number of words
         document.getElementById("demo").innerHTML = arrayLength;
     
        //document.getElementById(".words").style.visibility = "hidden"; 
        
     
     
     
     

     for (var i = 0; i < arrayLength; i++) { //loop through array of words
         if (arrayOfWords[i].length == 3) {
             threeLetters.push(arrayOfWords[i]);
         }
         else if (arrayOfWords[i].length == 4) {
             fourLetters.push(arrayOfWords[i]);
         }
         else if (arrayOfWords[i].length == 5) {
             fiveLetters.push(arrayOfWords[i]);
         }
         else if (arrayOfWords[i].length == 6) {
             sixLetters.push(arrayOfWords[i]);
         }
        //  else if (arrayOfWords[i].length == 7) {
        //      sevenLetters.push(arrayOfWords[i]);
        //  }
     } //end for loop

     document.getElementById("three").innerHTML = threeLetters.length;
     document.getElementById("four").innerHTML = fourLetters.length;
     document.getElementById("five").innerHTML = fiveLetters.length;
     document.getElementById("six").innerHTML = sixLetters.length;
    //  document.getElementById("seven").innerHTML = sevenLetters.length;
 };

 function submitGuess() {
     var guess = document.getElementById('guess').value;
     guess = guess.toUpperCase();

     arrayOfWords = document.querySelector('.words').innerHTML.split(',');

     //find if a guess is in the array of words
     if (arrayOfWords.indexOf(guess) > -1 && correctGuesses.indexOf(guess) == -1) {
         correctGuesses.push(guess);

         if (guess.length == 3) {
             threeLetters.pop(guess);
         }
         else if (guess.length == 4) {
             fourLetters.pop(guess);
         }
         else if (guess.length == 5) {
             fiveLetters.pop(guess);
         }
         else if (guess.length == 6) {
             sixLetters.pop(guess);
         }
        //  else if (guess.length == 7) {
        //      sevenLetters.pop(guess);
        //  }

         document.getElementById("three").innerHTML = threeLetters.length;
         document.getElementById("four").innerHTML = fourLetters.length;
         document.getElementById("five").innerHTML = fiveLetters.length;
         document.getElementById("six").innerHTML = sixLetters.length;
        //  document.getElementById("seven").innerHTML = sevenLetters.length;

         document.getElementById("correct").innerHTML = correctGuesses;
     }
     else {
         document.getElementById("incorrect").innerHTML = guess;
     }

     document.getElementById('guess').value = null; //deletes text after clicking submit button

 }

 //this function runs when "New Game" button is pressed
 document.getElementById("getLetters").addEventListener('click', function() {
     genericGetRequest("https://project-1-text-twist-clone-paul225.c9users.io/index.php", showLetters);
     correctGuesses = [];
     threeLetters = [];
     fourLetters = [];
     fiveLetters = [];
     sixLetters = [];
    //  sevenLetters = [];
     document.getElementById('guess').value = null;
     document.getElementById("correct").innerHTML = null;
     document.getElementById("incorrect").innerHTML = null;
 });
 