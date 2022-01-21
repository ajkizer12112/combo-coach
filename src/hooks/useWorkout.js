import React, { useState, useEffect } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'
import powerupSound from '../utils/sounds/powerup.mp3'
import { combos } from '../combinations/fundamentals'



const workoutStates = {
    INACTIVE: "INACTIVE",
    WORK: "WORK",
    REST: "REST",
    COUNTDOWN: "COUNTDOWN"
}

const { INACTIVE, WORK, COUNTDOWN, REST } = workoutStates;

const comboIndex = Math.floor(Math.random() * combos[0].combos.length)

const initialState = {
    currentPhase: INACTIVE,
    currentRound: 1,
    totalRounds: 3,
    roundTime: 180,
    currentTime: 180,
    roundWarningInterval: 10,
    restTime: 60,
    countDown: 2,
    roundChangeWarning: 10,
    timerActive: false,
    isComplete: false,
    inProgress: false,
    combo: combos[0].combos[comboIndex],
    combos: combos[0],
    showCombo: true,
    comboStartTime: null,
    comboClass: "fade-in"
}

const useWorkout = () => {
    const [workout, setWorkout] = useState(initialState)

    const bell = new Audio(bellSound);
    const warning = new Audio(warningSound);
    const powerup = new Audio(powerupSound);

    bell.playbackRate = 1.25;
    warning.playbackRate = 5;
    powerup.playbackRate = 2;
    warning.loop = true;

    const workoutActions = {
        timer: {
            convertToTime: function (time) {
                const minutes = Math.floor(time / 60)
                let seconds = time - minutes * 60
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
                if (workout.currentTime % 6 === 0 && workout.currentTime !== 0 && workout.currentTime !== workout.roundTime && workout.currentPhase === "WORK") {
                    const { newCombo } = workoutActions.workoutFns.genCombo();
                    return setWorkout({ ...workout, currentTime: workout.currentTime - 1, comboClass: "fade-in", combo: newCombo, showCombo: true, comboStartTime: workout.currentTime - 1 })
                }

                if (workout.comboStartTime - workout.currentTime >= 2) {
                    return setWorkout({ ...workout, comboClass: "fade-out", currentTime: workout.currentTime - 1 })
                }

                if (!workout.comboStartTime || workout.comboStartTime - workout.currentTime >= 3) {
                    return setWorkout({ ...workout, showCombo: false, currentTime: workout.currentTime - 1 })
                }

                setWorkout({
                    ...workout, currentTime: workout.currentTime - 1
                })
            },
            runZero: function () {
                if (workout.currentRound >= workout.totalRounds) {
                    workoutActions.workoutFns.completeWorkout();
                }
                else if (workout.currentPhase === "REST") workoutActions.workoutFns.changeRound();
                else if (workout.currentPhase === "COUNTDOWN") workoutActions.workoutFns.endCountdown();
                else if (workout.currentPhase === "WORK") workoutActions.workoutFns.startRest();
            },
            runWarningChecks: function () {
                if (workout.currentTime % 60 === 0 && workout.currentPhase === "WORK") {
                    if (workout.currentTime !== workout.roundTime) {
                        workoutActions.sounds.playWarning();
                    }
                }
                if (workout.currentPhase === "REST") {
                    if (workout.currentTime % 60 === 0 && workout.currentTime !== workout.restTime) {
                        workoutActions.sounds.playWarning();
                    }
                }

                if (workout.currentPhase !== "COUNTDOWN" && workout.currentPhase !== "INACTIVE") {
                    if (workout.currentTime === 10) {
                        workoutActions.sounds.playWarning(1200);
                    }
                }
            },
        },
        workoutFns: {
            startWorkout: function () {
                setWorkout({ ...workout, currentPhase: COUNTDOWN, currentRound: 1, currentTime: workout.countDown, isComplete: false, inProgress: true, timerActive: true, });
            },
            endCountdown: function () {
                workoutActions.sounds.playBell(1.25)
                setWorkout({ ...workout, currentTime: workout.roundTime, currentPhase: WORK })
            },
            startRest: function () {
                workoutActions.sounds.playBell(0.9);
                setWorkout({ ...workout, currentTime: workout.restTime, currentPhase: REST })
            },
            changeRound: function () {
                workoutActions.sounds.playBell(1.25);
                setWorkout({ ...workout, currentPhase: WORK, currentTime: workout.roundTime, currentRound: workout.currentRound + 1 })
            },
            completeWorkout: function () {
                workoutActions.sounds.playBell(0.9);
                setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
            },
            triggerFollowup: function () {
                setWorkout({ ...workout, followup: false })
            },
            stopWorkout: function () {
                setWorkout({ ...workout, currentTime: workout.roundTime, currentRound: 1, currentPhase: INACTIVE, inProgress: false })
            },
            resetOptions: function () {
                setWorkout(initialState)
            },
            changeOptions: function (optionName, value) {
                if (optionName === "combos") {
                    return setWorkout({ ...workout, [optionName]: value, combo: value.combos[0] })
                }
                setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
            },
            genCombo: function () {
                let newCombo;
                const index = Math.floor(Math.random() * workout.combos.combos.length)
                newCombo = workout.combos.combos[index]
                return { newCombo }
            }
        },
        sounds: {
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
        },
    }


    return { workout, workoutActions }
}

export default useWorkout
