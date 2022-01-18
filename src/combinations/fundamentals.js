export const fundamentals = {
    name: "fundamentals",
    combos: [
        {
            sequence: ["1", "2", "1", "1", "2"],
            followup: ["ROLL", "3", "2", "3"]
        },
        {
            sequence: ["1", "2", "3", "4"],
            followup: ["ROLL", "2", "3", "2"]
        },
        {
            sequence: ["1", "2", "3", "2"],
            followup: ["SR", "2", "3b", "5"]
        },

        {
            sequence: ["1", "2", "3", "2", "3"],
            followup: ["SL", "3b", "3", "2"]
        },
        {
            sequence: ["1", "2"],
            followup: ["PB", "2", "3", "6"]
        },
        {
            sequence: ["1", "2b"],
            followup: ["PB", "2", "3b", "3b", "3", "2"]
        }
    ]
};
export const peakaboo_basic = {
    name: "peakaboo basic",
    combos: [
        {
            sequence: ["1", "SL", "SR", "2", "ROLL"],
            followup: ["2", "3b", "5", "2"]
        },
        {
            sequence: ["SR", "SL", "3b", "5", "ROLL"],
            followup: ["3b", "3b", "5", "3", "4", "ROLL", "ROLL"]
        },
        {
            sequence: ["SL", "SR", "SL", "SR", "2", "3", "ROLL", "ROLL"],
            followup: ["2", "3", "SL", "StSw", "4b", "5", "2"]
        }
    ]
}





    // {
    //     sequence: ["1", "2", "3b", "3b", "3", "4"],
    //     followup: ["RU", "2", "5", "2"]
    // },