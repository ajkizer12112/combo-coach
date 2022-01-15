import React, { useState, useEffect } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'
import { fundamentals } from '../combinations/fundamentals'



const workoutStates = {
    INACTIVE: "INACTIVE",
    WORK: "WORK",
    REST: "REST",
    COUNTDOWN: "COUNTDOWN"
}

const { INACTIVE, WORK, COUNTDOWN, REST } = workoutStates;

const initialState = {
    currentPhase: INACTIVE,
    currentRound: 1,
    totalRounds: 3,
    roundTime: 180,
    currentTime: 180,
    roundWarningInterval: 10,
    restTime: 60,
    countDown: 10,
    roundChangeWarning: 10,
    timerActive: false,
    isComplete: false,
    inProgress: false,
    combo: [],
    combos: fundamentals
}



const useWorkout = () => {
    const [workout, setWorkout] = useState(initialState)

    const bell = new Audio(bellSound);
    const warning = new Audio(warningSound);

    bell.playbackRate = 1.25;
    warning.playbackRate = 5;
    warning.loop = true;




    useEffect(() => {

        setWorkout({ ...workout, currentTime: workout.roundTime })
    }, [workout.roundTime])

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
                if (workout.currentTime % 30 === 0 && workout.currentTime !== workout.roundTime && workout.currentPhase === "WORK") {
                    const combo = workoutActions.workoutFns.genCombo();

                    return setWorkout({ ...workout, currentTime: workout.currentTime - 1, combo: combo.combo })
                }
                setWorkout({ ...workout, currentTime: workout.currentTime - 1 })
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
            stopWorkout: function () {
                setWorkout({ ...workout, currentTime: workout.roundTime, currentRound: 1, currentPhase: INACTIVE, inProgress: false })
            },
            resetOptions: function () {
                setWorkout(initialState)
            },
            changeOptions: function (optionName, value) {
                setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
            },
            genCombo: function () {
                let followup = false;
                const index = Math.floor(Math.random() * workout.combos.length)
                const combo = workout.combos[index]
                const roll = Math.ceil(Math.random() * 10);
                if (roll === 10) {
                    followup = true
                }
                return ({ combo, followup })
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
        },
    }

    return { workout, workoutActions }
}

export default useWorkout
