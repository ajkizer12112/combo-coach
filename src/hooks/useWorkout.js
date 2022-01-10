import React, { useState, useEffect } from 'react'
import bellSound from "../utils/sounds/boxing-bell.mp3"
import warningSound from '../utils/sounds/boxing-hit.wav'
const useWorkout = () => {
    const workoutStates = {
        INACTIVE: "INACTIVE",
        WORK: "WORK",
        REST: "REST",
        COUNTDOWN: "COUNTDOWN"
    }

    const { INACTIVE, WORK, COUNTDOWN, REST } = workoutStates;

    const [workout, setWorkout] = useState({
        currentPhase: INACTIVE,
        currentRound: 1,
        totalRounds: 3,
        roundTime: 180,
        currentTime: 180,
        roundWarningInterval: 5,
        restTime: 60,
        countDown: 10,
        roundChangeWarning: 10,
        timerActive: false,
        isComplete: false,
        inProgress: false,
    })

    const bell = new Audio(bellSound);
    const warning = new Audio(warningSound);

    bell.playbackRate = 1.25;
    warning.playbackRate = 5;
    warning.loop = true;


    const playBell = (rate) => {
        bell.playbackRate = rate;
        bell.play();
    }


    useEffect(() => {
        setWorkout({ ...workout, currentTime: workout.roundTime })
    }, [workout.roundTime])

    const workoutActions = {
        startWorkout: function () {
            setWorkout({ ...workout, currentPhase: COUNTDOWN, currentRound: 1, currentTime: workout.countDown, isComplete: false, inProgress: true, timerActive: true, });
        },
        playWarning: function () {
            warning.play();
            console.log("hello")
            setTimeout(() => warning.loop = false, 800)
        },
        decrementTimer: function () {
            setWorkout({ ...workout, currentTime: workout.currentTime - 1 })
        },
        endCountdown: function () {
            playBell(1.25)
            setWorkout({ ...workout, currentTime: workout.roundTime, currentPhase: WORK })
        },
        runZero: function () {
            if (workout.currentRound >= workout.totalRounds) {
                this.completeWorkout();
            }
            else if (workout.currentPhase === "REST") this.changeRound();
            else if (workout.currentPhase === "COUNTDOWN") this.endCountdown();
            else if (workout.currentPhase === "WORK") this.startRest();
        },
        startRest: function () {
            playBell(0.9);
            setWorkout({ ...workout, currentTime: workout.restTime, currentPhase: REST })
        },
        changeRound: function () {
            console.log("fire")
            playBell(1.25);
            setWorkout({ ...workout, currentPhase: WORK, currentTime: workout.roundTime, currentRound: workout.currentRound + 1 })
        },
        completeWorkout: function () {
            playBell(0.9);
            setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
        },
        resetWorkout: function () {
            setWorkout({ ...workout, inProgress: false, currentTime: workout.roundTime, currentRound: 1, currentPhase: INACTIVE })
        },
        changeOptions: function (optionName, value) {
            setWorkout({ ...workout, [optionName]: value, timerActive: false, inProgress: false })
        },
        pauseTimer: function () {
            setWorkout({ ...workout, timerActive: false })
        },
        startTimer: function () {
            setWorkout({ ...workout, timerActive: true })
        },
    }

    return { workout, workoutActions }
}

export default useWorkout
