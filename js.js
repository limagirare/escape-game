
        let timerInterval;

        function startTimer(duration, display) {
            let timer = duration, minutes, seconds;
            timerInterval = setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = 0;
                    clearInterval(timerInterval); // Arrêter le timer quand le temps est écoulé
                }
            }, 1000);
        }

        window.onload = function () {
            let fiftyMinutes = 50 * 60,
                display = document.querySelector('#timer');
            startTimer(fiftyMinutes, display);

            let codes = [
                { question: "alimentation", answer: "AY7BX9" },
                { question: "biodiversite", answer: "1314" },
                { question: "consommation", answer: "96587" },
                { question: "rechauffement climatique", answer: "951" },
                { question: "transports", answer: "transport" },


            ];

            let step = 0; 
            let inputField = document.getElementById('input');
            let questionText = document.getElementById('question');
            let result = document.getElementById('result');
            let animationContainer = document.getElementById('animation-container');

            document.getElementById('validateButton').addEventListener('click', function() {
                let userInput = inputField.value.trim();

                if (userInput === codes[step].answer) {
                    step++;

                    if (step < codes.length) {
                        questionText.textContent = codes[step].question;
                        inputField.value = ""; 
                    } else {
                        result.textContent = "Tous les codes sont corrects, une dernière épreuve vius attend !";
                        result.style.color = "green";

                        // Arrêter le timer une fois les codes validés
                        clearInterval(timerInterval);

                        document.getElementById('code-container').style.display = "none";
                        document.getElementById('validateButton').style.display = "none";
                        animationContainer.style.display = "block";
                    }
                } else {
                    result.textContent = "Mauvais code, essayez encore.";
                    result.style.color = "red";
                }
            });

            document.getElementById('openSiteButton').addEventListener('click', function() {
                window.open("https://www.oce.global/animations/CarbonFootprint-final/footprint.html", "_blank");
            });

            document.getElementById('submitCarbon').addEventListener('click', function() {
                let carbonValue = parseFloat(document.getElementById('carbonInput').value);

                if (!isNaN(carbonValue)) {
                    if (carbonValue < 3000) {
                        document.getElementById('finalResult').textContent = "🎉 Félicitations ! Votre empreinte est inférieure à 3000, vous avez gagné !";
                        document.getElementById('finalResult').style.color = "green";
                    } else {
                        document.getElementById('finalResult').textContent = "❌ Votre empreinte est trop élevée. Réduisez-la pour gagner !";
                        document.getElementById('finalResult').style.color = "red";
                    }
                } else {
                    document.getElementById('finalResult').textContent = "Veuillez entrer un nombre valide.";
                    document.getElementById('finalResult').style.color = "red";
                }
            });
        };
