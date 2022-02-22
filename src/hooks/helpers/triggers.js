import { WORKOUT_STATES, TIME_VALUES } from '../../utils/constants'

const { WORK, INACTIVE, COUNTDOWN, REST } = WORKOUT_STATES
const { WARNING_INTERVAL, ROUND_CHANGE_WARNING } = TIME_VALUES

export const shouldShowNextCombo = (workout) => {
    return workout.currentTime % workout.rate === 0 && workout.currentTime !== workout.roundTime && workout.currentTime !== 0 && workout.currentPhase === WORK
};
export const shouldHideCombo = (workout) => {
    return !workout.comboStartTime || workout.comboStartTime - workout.currentTime >= workout.rate - 2
};
export const shouldFinishWorkout = (workout) => {
    return workout.currentRound >= workout.totalRounds && workout.currentPhase !== COUNTDOWN
};
export const shouldPlayWorkWarning = (workout) => {
    return workout.currentTime % WARNING_INTERVAL === 0 && workout.currentPhase === WORK && workout.currentTime !== workout.roundTime
};
export const shouldPlayRestWarning = (workout) => {
    return workout.currentPhase === REST && workout.currentTime % WARNING_INTERVAL === 0 && workout.currentTime !== workout.restTime
};
export const shouldPlayRoundChangeWarning = (workout) => {
    return workout.currentPhase !== COUNTDOWN && workout.currentPhase !== INACTIVE && workout.currentTime === ROUND_CHANGE_WARNING
};
