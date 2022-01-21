if (sessionStorage.getItem("page") === "refreshed") {
    play_game();
}

document.getElementById("play").addEventListener("click", () => {
    play_game();
});

function play_game() {
    document.getElementById("play").classList.add("hide");
    document.getElementById("restart").classList.remove("hide");
    game();
}

function game() {
    const score = document.getElementById("score"); 
    let crt_points = 0;
    const items = ["mole1", "mole2", "mole3", "mole4", "mole5"];
    let aux = "mole-1";
    let timer = 20;
    const countdown = document.getElementById("timer");
    const interval = setInterval(updateCountdown, 1000); 
    function updateCountdown () {
        if (timer > 0) {
            mole_appears();
        }
        countdown.innerHTML = timer;
        --timer;
        if (timer < 0) {
            document.getElementById("total-score").classList.remove("visible");
            document.getElementById("total-score").innerText += (" " + crt_points);
            clearInterval(interval);
            
        }
    }

    function mole_appears() {        
        let crt_mole = items[Math.floor(Math.random()*items.length)];
        while (crt_mole === aux) {
            crt_mole = items[Math.floor(Math.random()*items.length)];
        }
        aux = crt_mole;
        document.getElementById(crt_mole).classList.remove("hide");
        document.getElementById(crt_mole).addEventListener("click", add_points, {once:true});
        function add_points() {
            crt_points += 10;
            score.innerHTML = crt_points;
        };
        setTimeout( () => {
            document.getElementById(crt_mole).classList.add("hide");
            document.getElementById(crt_mole).removeEventListener("click", add_points);
        },1000);
    }
    document.getElementById("restart").addEventListener("click", function() {
        sessionStorage.setItem("page","refreshed");
        const page = sessionStorage.getItem("page");
        location.reload();
    });
}