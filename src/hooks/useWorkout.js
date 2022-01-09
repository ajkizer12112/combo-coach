import React, { useState, useEffect } from 'react'

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
        currentRound: 0,
        totalRounds: 3,
        roundTime: 180,
        currentTime: 180,
        roundWarningInterval: 60,
        restTime: 60,
        countDown: 10,
        roundChangeWarning: 10,
        timerActive: false,
        isComplete: false,
        inProgress: false,
    })

    const workoutActions = {

        startWorkout: function () {
            setWorkout({ ...workout, currentPhase: COUNTDOWN, currentRound: 1, currentTime: workout.countDown, isComplete: false, inProgress: true, timerActive: true, });
        },
        decrementTimer: function () {
            setWorkout({ ...workout, currentTime: workout.currentTime - 1 })
        },
        endCountdown: function () {
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
            console.log("fire rest")
            setWorkout({ ...workout, currentTime: workout.restTime, currentPhase: REST })
        },
        changeRound: function () {
            console.log("fire")
            setWorkout({ ...workout, currentPhase: WORK, currentTime: workout.roundTime, currentRound: workout.currentRound + 1 })
        },
        completeWorkout: function () {
            setWorkout({ ...workout, inProgress: false, timerActive: false, isComplete: true })
        },
        resetWorkout: function () {
            setWorkout({ ...workout, inProgress: false, currentPhase: INACTIVE })
        },
        changeOptions: function (optionName, value) {
            setWorkout({ ...workout, [optionName]: value })
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
