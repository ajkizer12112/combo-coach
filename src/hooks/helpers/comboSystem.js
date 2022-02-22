
import { TOGGLEABLE_CLASSES } from "../../utils/constants";
import sounds from './sounds'

const { NONE, ACTIVATED } = TOGGLEABLE_CLASSES
const genRandomNumber = (val) => {
    return Math.random() * val
}

export const genCombo = (workout) => {
    const index = Math.floor(Math.random() * workout.combos.combos.length)
    return workout.combos.combos[index]
};

export const rollForNextCombo = () => {
    return Math.ceil(genRandomNumber(100));
};

export const genFollowup = (combo) => {
    return combo.followups[Math.floor(genRandomNumber(combo.followups.length))]
};

export const updateWithFollowup = (updatedManeuverTracker, followup) => {
    followup.forEach(item => {
        updatedManeuverTracker[item] = updatedManeuverTracker[item] + 1;
    })
    return updatedManeuverTracker
};

export const genUpdatedManeuverTracker = (combo, workout) => {
    let updatedManeuverTracker = workout.maneuverTracker;
    combo.newCombo.sequence.forEach(item => {
        if (item === "Pivot") return
        updatedManeuverTracker[item] = updatedManeuverTracker[item] + 1
    })

    const roll = rollForNextCombo()

    let followupClass = NONE
    const showFollowup = roll <= workout.followupChance

    if (showFollowup) {
        followupClass = ACTIVATED
        updatedManeuverTracker = updateWithFollowup(updatedManeuverTracker, combo.followup)
        setTimeout(() => sounds.playPowerup(), 500)
    }

    return { updatedManeuverTracker, showFollowup, followupClass }
};
