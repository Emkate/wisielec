$(function(){

    var hangmanDiv = $("#hangmanDiv");
    var alphabetDiv = $("#alphabetDiv");

    alphabetDiv.hide();

    var theWord = "";
    var numberOfLives = 0;
    var numberOfLettersInWord = 0;
    var clickedLetters = [];

    hangmanDiv.append("<button id='startGame' class='text-center btn btn-primary'>START</button>");

    var startGameButton = $("#startGame");
    startGameButton.hide().fadeIn(1000);

    startGameButton.click(function(){
        startGameButton.fadeOut(1000);

        $("#hangmanDrawing").remove();

        $("#youLose").fadeOut(1000).remove();

        var wordArray = ["ALFABET", "ARKTYKA", "ARSENAŁ", "BRODACZ", "CHAŁWA", "DROMADER", "DOMOWNIK", "DOMOFON", "EUCHARYSTIA", "ELEGANT", "FRANCZYZA", "GÓRA", "GROM", "GRAWEROWANY", "HARCERZ", "HUTA", "ROZEZNANY", "PRACA", "KOMBATANT", "ŻOŁNIERZ", "ŻANDARM", "KLAWISZ", "KLAWIATURA", "MYSZ", "CHŁOPIEC", "BIWAK", "RACICE", "SKAFANDER", "SOS", "FLĄDRA", "ŚLEDŹ", "PARDWA", "PRAWDA", "KOSMOS", "ASTRONAUTA", "MUCHA", "KRĘPY", "ZŁOM", "RUBIN"];
        numberOfLives = 5;
        clickedLetters = [];

        setTimeout(function() {
                var random = Math.floor((Math.random()*100+1)%wordArray.length);

                theWord = wordArray[random];
                numberOfLettersInWord = theWord.length;

                var iterator = 0;
                $("#lettersDiv").fadeOut(1000).remove();
                hangmanDiv.append("<div id='lettersDiv' class='text-center col-sm-24 col-centered'></div>");

                var lettersDiv = $("#lettersDiv");

                while(iterator<theWord.length){
                    lettersDiv.append("<div id='letter" + iterator + "'class='well well-sm col-xs-1' style='width=30px;'>*</div>");
                    iterator++;
                }
                lettersDiv.hide();
                lettersDiv.fadeIn(1000);

                hangmanDiv.append("<canvas id='hangmanDrawing' width='1200' height='900'></canvas>");

                alphabetDiv.fadeIn(1000);
        }, 1100);
    });

    function checkForCharacter(theLetter){


        if(jQuery.inArray(theLetter, clickedLetters)===-1){
            clickedLetters.push(theLetter);

            var indexes = [];
            for(var i=0; i<theWord.length;i++) {
                if (theWord[i] === theLetter) indexes.push(i);
            }
            if(indexes.length === 0){
                numberOfLives--;

                var c = document.getElementById("hangmanDrawing");
                var ctx = c.getContext("2d");

                if(numberOfLives===4){
                    ctx.lineWidth = 12;
                    ctx.moveTo(210,900);
                    ctx.lineTo(210,120);
                    ctx.lineTo(600,120);
                    ctx.stroke();
                }
                if(numberOfLives===3){
                    ctx.moveTo(600,120);
                    ctx.lineTo(600,180);
                    ctx.moveTo(690,270);
                    ctx.arc(600,270,90,0,2*Math.PI);
                    ctx.stroke();
                }
                if(numberOfLives===2){
                    ctx.moveTo(600,360);
                    ctx.lineTo(600,600);
                    ctx.stroke();
                }
                if(numberOfLives===1){
                    ctx.moveTo(600,360);
                    ctx.lineTo(540,570);
                    ctx.moveTo(600,360);
                    ctx.lineTo(660,570);
                    ctx.stroke();
                }
                if(numberOfLives===0){
                    ctx.moveTo(600,600);
                    ctx.lineTo(570,840);
                    ctx.moveTo(600,600);
                    ctx.lineTo(630,840);
                    ctx.stroke();

                    setTimeout(function(){
                        alphabetDiv.fadeOut(1000);
                        $("#lettersDiv").fadeOut(1000);
                        $("#hangmanDrawing").fadeOut(1000);


                        setTimeout(function(){
                            hangmanDiv.append("<h2 id='youLose'>Niestety, nie udało Ci się wygrać :(<br>Spróbuj jeszcze raz klikając start</h2>");
                            $("#youLose").hide().fadeIn(1000);
                            startGameButton.fadeIn(1000);

                            $("[id*='Letter']").each(function(){
                                $(this).css({ "background-color": "white" })
                            });

                        }, 1100);
                    }, 1000);
                }
            }
            else if(indexes.length !== 0) {
                console.log(indexes);

                numberOfLettersInWord = numberOfLettersInWord - indexes.length;

                if(numberOfLettersInWord===0){
                    setTimeout(function(){
                        alphabetDiv.fadeOut(1000);
                        $("#lettersDiv").fadeOut(1000);
                        $("#hangmanDrawing").fadeOut(1000);


                        setTimeout(function(){
                            hangmanDiv.append("<h2 id='youLose'>Wygrana, brawo!<br>Możesz zagrać jeszcze raz klikając start</h2>");
                            $("#youLose").hide().fadeIn(1000);
                            startGameButton.fadeIn(1000);

                            $("[id*='Letter']").each(function(){
                                $(this).css({ "background-color": "white" })
                            });
                        }, 1100);
                    }, 1000);
                }

                for(var j=0; j<indexes.length;j++) {
                    $("#letter"+indexes[j]).empty().append(theLetter);
                }
            }
        }
    }


    $("[id*='Letter']").click(function(){
        checkForCharacter($(this).text());
        $(this).css({ "background-color": "black" });
    });







});