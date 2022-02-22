import { useState } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'
import powerupSound from '../utils/sounds/powerup.mp3'
import { combos } from '../combinations/fundamentals'

import { WORKOUT_STATES, TIME_VALUES, TOGGLEABLE_CLASSES, OPTIONS_FIELD_NAMES } from "../utils/constants"

const { INACTIVE, WORK, COUNTDOWN, REST } = WORKOUT_STATES;
const { WARNING_INTERVAL, ROUND_CHANGE_WARNING } = TIME_VALUES;
const { NONE, ACTIVATED } = TOGGLEABLE_CLASSES;
const { ROUND_TIME, COMBOS } = OPTIONS_FIELD_NAMES;


const comboIndex = Math.floor(Math.random() * combos[0].combos.length)

const initialState = {
    currentRound: 1,
    totalRounds: 2,
    roundTime: 180,
    currentTime: 180,
    restTime: 60,
    countDown: 5,
    roundChangeWarning: 10,
    rate: 8,
    followupChance: 30,
    comboStartTime: null,
    timerActive: false,
    isComplete: false,
    inProgress: false,
    showCombo: false,
    showFollowup: false,
    combo: combos[0].combos[comboIndex],
    followup: combos[0].combos[comboIndex].followups[0],
    combos: combos[0],
    maneuverTracker: {
        "1": 0,
        "1b": 0,
        "2": 0,
        "2b": 0,
        "3": 0,
        "3b": 0,
        "4": 0,
        "4b": 0,
        "5": 0,
        "5b": 0,
        "6": 0,
        "6b": 0,
        "Pull": 0,
        "Slip": 0,
        "Roll": 0,
        "Duck": 0,
    },
    currentPhase: INACTIVE,
    followupClass: NONE
}

const bell = new Audio(bellSound);
const warning = new Audio(warningSound);
const powerup = new Audio(powerupSound);

bell.playbackRate = 1.25;
warning.playbackRate = 5;
powerup.playbackRate = 2;
warning.loop = true;


const genRandomNumber = (val) => {
    return Math.random() * val
}

const useWorkout = () => {
    const [workout, setWorkout] = useState(initialState)

    const comboFns = {
        genCombo: function () {
            const index = Math.floor(Math.random() * workout.combos.combos.length)
            return workout.combos.combos[index]
        },
        rollForNextCombo: function () {
            return Math.ceil(genRandomNumber(100));
        },
        genFollowup: function (combo) {
            return combo.followups[Math.floor(genRandomNumber(combo.followups.length))]
        },
        updateWithFollowup: function (updatedManeuverTracker, followup) {
            followup.forEach(item => {
                updatedManeuverTracker[item] = updatedManeuverTracker[item] + 1;
            })
            return updatedManeuverTracker
        },
        genUpdatedManeuverTracker: function (combo, followup) {
            let updatedManeuverTracker = workout.maneuverTracker;

            combo.sequence.forEach(item => {
                if (item === "Pivot") return
                updatedManeuverTracker[item] = updatedManeuverTracker[item] + 1
            })

            const roll = comboFns.rollForNextCombo()

            let followupClass = NONE
            const showFollowup = roll <= workout.followupChance

            if (showFollowup) {
                followupClass = ACTIVATED
                updatedManeuverTracker = comboFns.updateWithFollowup(updatedManeuverTracker, followup)
                setTimeout(() => sounds.playPowerup(), 500)
            }
            return { updatedManeuverTracker, showFollowup, followupClass }
        },

        activateNextCombo: function () {
            const newCombo = comboFns.genCombo();
            const followup = comboFns.genFollowup(newCombo)
            const { updatedManeuverTracker, showFollowup, followupClass } = comboFns.genUpdatedManeuverTracker(newCombo, followup)

            setWorkout({
                ...workout,
                currentTime: workout.currentTime - 1,
                maneuverTracker: updatedManeuverTracker,
                followupClass: followupClass,
                showFollowup: showFollowup,
                followup: followup,
                combo: newCombo,
                showCombo: true,
                comboStartTime: workout.currentTime - 1
            });
        },
        hideCombo: function () {
            setWorkout({ ...workout, showCombo: false, showFollowup: false, followupClass: NONE, currentTime: workout.currentTime - 1 })
        }
    }

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

    const triggers = {
        shouldShowNextCombo: function () {
            return workout.currentTime % workout.rate === 0 && workout.currentTime !== workout.roundTime && workout.currentTime !== 0 && workout.currentPhase === WORK
        },
        shouldHideCombo: function () {
            return !workout.comboStartTime || workout.comboStartTime - workout.currentTime >= workout.rate - 2
        },
        shouldFinishWorkout: function () {
            return workout.currentRound >= workout.totalRounds && workout.currentPhase !== COUNTDOWN
        },
        shouldPlayWorkWarning: function () {
            return workout.currentTime % WARNING_INTERVAL === 0 && workout.currentPhase === WORK && workout.currentTime !== workout.roundTime
        },
        shouldPlayRestWarning: function () {
            return workout.currentPhase === REST && workout.currentTime % WARNING_INTERVAL === 0 && workout.currentTime !== workout.restTime
        },
        shouldPlayRoundChangeWarning: function () {
            return workout.currentPhase !== COUNTDOWN && workout.currentPhase !== INACTIVE && workout.currentTime === ROUND_CHANGE_WARNING
        }
    }

    const workoutActions = {
        timer: {
            convertToTime: function (time) {
                const minutes = Math.floor(time / WARNING_INTERVAL)
                let seconds = time - minutes * WARNING_INTERVAL
                if (seconds < 10) seconds = `0${seconds}`
                return `${minutes}:${seconds}`
            },
            pauseTimer: function () {
                setWorkout({ ...workout, timerActive: false })
            },
            startTimer: function () {
                setWorkout({ ...workout, timerActive: true })
            },
            decrementTimer: function () {
                if (triggers.shouldShowNextCombo()) return comboFns.activateNextCombo();
                if (triggers.shouldHideCombo()) return comboFns.hideCombo();

                setWorkout({
                    ...workout,
                    currentTime: workout.currentTime - 1
                })
            },
            runZero: function () {
                if (triggers.shouldFinishWorkout()) workoutActions.workoutFns.completeWorkout();
                else if (workout.currentPhase === REST) workoutActions.workoutFns.changeRound();
                else if (workout.currentPhase === COUNTDOWN) workoutActions.workoutFns.endCountdown();
                else if (workout.currentPhase === WORK) workoutActions.workoutFns.startRest();
                else return
            },
            runWarningChecks: function () {
                if (triggers.shouldPlayWorkWarning()) {
                    sounds.playWarning();
                }

                if (triggers.shouldPlayRestWarning()) {
                    sounds.playWarning();
                }

                if (triggers.shouldPlayRoundChangeWarning()) {
                    sounds.playWarning(1200);
                }
            },
        },

        workoutFns: {
            startWorkout: function () {
                setWorkout({ ...workout, currentPhase: COUNTDOWN, currentRound: 1, currentTime: workout.countDown, isComplete: false, inProgress: true, timerActive: true, });
            },
            endCountdown: function () {
                sounds.playBell(1.25)
                setWorkout({ ...workout, currentTime: workout.roundTime, currentPhase: WORK })
            },
            startRest: function () {
                sounds.playBell(0.9);
                setWorkout({ ...workout, currentTime: workout.restTime, currentPhase: REST })
            },
            changeRound: function () {
                sounds.playBell(1.25);
                setWorkout({ ...workout, currentPhase: WORK, currentTime: workout.roundTime, currentRound: workout.currentRound + 1 })
            },
            completeWorkout: function () {
                sounds.playBell(0.9);
                setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
            },
            stopWorkout: function () {
                setWorkout({ ...workout, currentTime: workout.roundTime, currentRound: 1, currentPhase: INACTIVE, inProgress: false })
            },
            resetOptions: function () {
                setWorkout(initialState)
            },
            changeOptions: function (optionName, value) {
                if (optionName === COMBOS) {
                    setWorkout({ ...workout, [optionName]: value, combo: value.combos[0] })
                } else if (optionName === ROUND_TIME) {
                    setWorkout({ ...workout, [optionName]: value, currentTime: value, timerActive: false, inProgress: false })
                } else {
                    setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
                }
            },
        },

    }

    return { workout, workoutActions }
}

export default useWorkout
