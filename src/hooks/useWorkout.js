import React, { useState, useEffect, useContext } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'
import powerupSound from '../utils/sounds/powerup.mp3'
import { combos } from '../combinations/fundamentals'
import { AccountContext } from '../context/AccountContext'



const workoutStates = {
    INACTIVE: "INACTIVE",
    WORK: "WORK",
    REST: "REST",
    COUNTDOWN: "COUNTDOWN"
}

const { INACTIVE, WORK, COUNTDOWN, REST } = workoutStates;

const comboIndex = Math.floor(Math.random() * combos[0].combos.length)

const initialState = {
    currentRound: 1,
    totalRounds: 2,
    roundTime: 180,
    currentTime: 180,
    roundWarningInterval: 10,
    restTime: 60,
    countDown: 5,
    roundChangeWarning: 10,
    rate: 3,
    followupChance: 70,
    comboStartTime: null,
    timerActive: false,
    isComplete: false,
    inProgress: false,
    showCombo: false,
    showFollowup: false,
    punches: [],
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
        "Duck": 0
    },

    currentPhase: INACTIVE,
    comboClass: "fade-in",
    followupClass: ""
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
                if (workout.currentTime % workout.rate === 0 && workout.currentTime !== workout.roundTime && workout.currentTime !== 0 && workout.currentPhase === "WORK") {
                    return workoutActions.workoutFns.activateNextCombo();
                }

                if (!workout.comboStartTime || workout.comboStartTime - workout.currentTime >= workout.rate - 2) {
                    return workoutActions.workoutFns.hideCombo();
                }

                setWorkout({
                    ...workout, currentTime: workout.currentTime - 1
                })
            },
            runZero: function () {
                if (workout.currentRound >= workout.totalRounds) workoutActions.workoutFns.completeWorkout();
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
                console.log(workout.maneuverTracker)
                setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
            },
            stopWorkout: function () {
                setWorkout({ ...workout, currentTime: workout.roundTime, currentRound: 1, currentPhase: INACTIVE, inProgress: false })
            },
            resetOptions: function () {
                setWorkout(initialState)
            },
            changeOptions: function (optionName, value) {
                if (optionName === "combos") {
                    setWorkout({ ...workout, [optionName]: value, combo: value.combos[0] })
                } else if (optionName === "roundTime") {
                    setWorkout({ ...workout, [optionName]: value, currentTime: value, timerActive: false, inProgress: false })
                } else {
                    setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
                }
            },
            genCombo: function () {
                const index = Math.floor(Math.random() * workout.combos.combos.length)
                return workout.combos.combos[index]
            },
            activateNextCombo: function () {
                const newCombo = workoutActions.workoutFns.genCombo();
                const roll = Math.ceil(Math.random() * 100);
                const followup = newCombo.followups[Math.floor(Math.random() * newCombo.followups.length)]
                const showFollowup = roll <= workout.followupChance

                let followupClass = ""

                let newValue = workout.maneuverTracker;

                newCombo.sequence.forEach(item => {
                    newValue[item] = newValue[item] + 1
                })

                if (showFollowup) {
                    followupClass = "activated"
                    followup.forEach(item => {
                        newValue[item] = newValue[item] + 1;
                    })
                    setTimeout(() => workoutActions.sounds.playPowerup(), 500)
                }

                let newState = { ...workout, currentTime: workout.currentTime - 1, maneuverTracker: newValue, followupClass: followupClass, showFollowup: showFollowup, followup: followup, combo: newCombo, showCombo: true, comboStartTime: workout.currentTime - 1 };


                return setWorkout(newState)
            },
            hideCombo: function () {
                setWorkout({ ...workout, showCombo: false, showFollowup: false, followupClass: "", currentTime: workout.currentTime - 1 })
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
