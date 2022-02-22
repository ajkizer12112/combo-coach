import { useState } from 'react'
import { combos } from '../combinations/fundamentals'
import { genCombo, genUpdatedManeuverTracker, genFollowup } from './helpers/comboSystem'
import { shouldFinishWorkout, shouldHideCombo, shouldPlayRestWarning, shouldPlayRoundChangeWarning, shouldPlayWorkWarning, shouldShowNextCombo } from './helpers/triggers'

import { WORKOUT_STATES, TIME_VALUES, TOGGLEABLE_CLASSES, OPTIONS_FIELD_NAMES } from "../utils/constants"
import sounds from './helpers/sounds'

const { INACTIVE, WORK, COUNTDOWN, REST } = WORKOUT_STATES;
const { WARNING_INTERVAL, ROUND_CHANGE_WARNING } = TIME_VALUES;
const { NONE } = TOGGLEABLE_CLASSES;
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




const useWorkout = () => {
    const [workout, setWorkout] = useState(initialState)

    const comboFns = {
        activateNextCombo: function () {
            const newCombo = genCombo(workout);
            const followup = genFollowup(newCombo)

            const combo = { newCombo, followup }
            const { updatedManeuverTracker, showFollowup, followupClass } = genUpdatedManeuverTracker(combo, workout)

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
            setWorkout({
                ...workout,
                showCombo: false,
                showFollowup: false,
                followupClass: NONE,
                currentTime: workout.currentTime - 1
            })
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
                if (shouldShowNextCombo()) return comboFns.activateNextCombo();
                if (shouldHideCombo()) return comboFns.hideCombo();

                setWorkout({
                    ...workout,
                    currentTime: workout.currentTime - 1
                })
            },
            runZero: function () {
                if (shouldFinishWorkout()) workoutActions.workoutFns.completeWorkout();
                else if (workout.currentPhase === REST) workoutActions.workoutFns.changeRound();
                else if (workout.currentPhase === COUNTDOWN) workoutActions.workoutFns.endCountdown();
                else if (workout.currentPhase === WORK) workoutActions.workoutFns.startRest();
                else return
            },
            runWarningChecks: function () {
                if (shouldPlayWorkWarning()) {
                    sounds.playWarning();
                }

                if (shouldPlayRestWarning()) {
                    sounds.playWarning();
                }

                if (shouldPlayRoundChangeWarning()) {
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
