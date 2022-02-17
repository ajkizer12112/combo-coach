
export const WORKOUT_STATES = Object.freeze({
    INACTIVE: "INACTIVE",
    WORK: "WORK",
    REST: "REST",
    COUNTDOWN: "COUNTDOWN"
})

export const TIME_VALUES = Object.freeze({
    WARNING_INTERVAL: 60,
})

export const TOGGLEABLE_CLASSES = Object.freeze({
    NONE: "",
    ACTIVATED: "activated"
})

export const OPTIONS_FIELD_NAMES = Object.freeze({
    ROUND_TIME: "roundTime",
    TOTAL_ROUNDS: "totalRounds",
    REST_TIME: "restTime",
    RATE: "rate",
    FOLLOWUP_CHANCE: "followupChance",
    COMBOS: "combos"
})

export const DIFFICULTY = Object.freeze({
    RATE_EASY: 8,
    TEXT_EASY: "Easy",
    FOLLOWUP_EASY: 30,

    RATE_AMATEUR: 6,
    TEXT_AMATEUR: "Amateur",
    FOLLOWUP_AMATEUR: 40,

    RATE_PRO: 5,
    TEXT_PRO: "Pro",
    FOLLOWUP_PRO: 55,

    RATE_LEGEND: 4,
    TEXT_LEGEND: "Legend",
    FOLLOWUP_LEGEND: 70
})