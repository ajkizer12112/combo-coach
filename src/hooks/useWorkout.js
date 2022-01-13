import React, { useState, useEffect } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'



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
                const timePassed = workout.roundTime - workout.currentTime
                if (workout.currentPhase === "WORK" && timePassed % workout.roundWarningInterval === 0 && timePassed !== 0) {
                    workoutActions.sounds.playWarning();
                }

                if (workout.currentPhase === "REST" && workout.currentTime === 10) {
                    workoutActions.sounds.playWarning();
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
                console.log("fire")
                workoutActions.sounds.playBell(1.25);
                setWorkout({ ...workout, currentPhase: WORK, currentTime: workout.roundTime, currentRound: workout.currentRound + 1 })
            },
            completeWorkout: function () {
                workoutActions.sounds.playBell(0.9);
                setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
            },
            resetWorkout: function () {
                setWorkout(initialState)
            },
            changeOptions: function (optionName, value) {
                setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
            },
        },
        sounds: {
            playWarning: function () {
                warning.play();
                setTimeout(() => warning.loop = false, 800)
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
