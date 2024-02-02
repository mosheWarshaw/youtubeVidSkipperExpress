import {Skipper} from "./skipper.mjs";
import {getPairsToSkip} from "./getPairsToSkip.mjs";

let player;
const skipper = new Skipper();

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", async function(event){
    const videoId = event.target.id;
    player.cueVideoById(videoId, 0);
    const title = event.target.textContent;
    const arr = await getPairsToSkip(title);
    skipper.setArr(arr);
});

function onYouTubeIframeAPIReady() {
    player = new YT.Player("iframeDiv", {
        height: "200",
        width: "300",
        videoId: "",
        events: {
            "onStateChange": skipper.onStateChange.bind(skipper)
        }
    });
    skipper.setPlayer(player);
}

/*The browser will call your onYouTubeIframeAPIReady
if it is in the global scope, but because main.js is a
module you have to add it to the window object for
it to be in the global scope.*/
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;