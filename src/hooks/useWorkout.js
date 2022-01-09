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
        currentRound: 1,
        totalRounds: 12,
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
            setWorkout({ ...workout, currentPhase: COUNTDOWN, currentRound: 1, currentTime: workout.restTime, isComplete: false, inProgress: true, timerActive: true, });
        },
        decrementTimer: function () {
            setWorkout({ ...workout, currentTime: workout.currentTime - 1 })
        },
        startRest: function () {
            setWorkout({ ...workout, currentTime: workout.restTime })
        },
        changeRound: function () {
            setWorkout({ ...workout, currentPhase: WORK, currentRound: workout.currentRound + 1 })
        },
        completeWorkout: function () {
            setWorkout({ ...workout, inProgress: false, isComplete: true })
        },
        resetWorkout: function () {
            setWorkout({ ...workout, inProgress: false })
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
