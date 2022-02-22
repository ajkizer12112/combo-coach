import bellSound from "../../utils/sounds/boxing-bell.mp3"
import warningSound from '../../utils/sounds/boxing-hit.wav'
import powerupSound from '../../utils/sounds/powerup.mp3'

const bell = new Audio(bellSound);
const warning = new Audio(warningSound);
const powerup = new Audio(powerupSound);

bell.playbackRate = 1.25;
warning.playbackRate = 5;
powerup.playbackRate = 2;
warning.loop = true;

const sounds = {
    playWarning: function (time = 800) {
        warning.play();
        setTimeout(() => warning.loop = false, time)
    },
    playBell: function (rate) {
        bell.playbackRate = rate;
        bell.play();
    },
    playPowerup: function () {
        powerup.play()
    }
}

export default sounds