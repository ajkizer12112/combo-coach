//each combo stored as an object with 1 field instead of a 2d array.  This is in anticipation of future updates/additions to the combo feature.

export const combos = [
    {
        name: "Fundamentals",
        combos: [
            {
                sequence: ["1", "2"],
                followups: [["Slip", "2", "3"], ["3", "2", "3"], ["3b", "4b", "3", "4"], ["Pull", "2", "5"], ["3b", "3", "2"], ["1", "1", "2"], ["3", "4", "Roll"], ["3", "3", "2"]]
            },
            {
                sequence: ["1", "1", "2"],
                followups: [["Roll", "3"], ["Duck", "2", "3"], ["3", "2", "3"], ["Pull", "2", "5"], ["3b", "3", "2"], ["1", "1", "2"], ["3", "4", "Roll"], ["3", "3", "2"]]
            },
            {
                sequence: ["1", "1"],
                followups: [["2", "3", "2"], ["Slip", "3", "2"], ["Slip", "5", "2"], ["2", "Roll", "2"]]
            }
        ]
    }
]






    // {
    //     sequence: ["1", "2", "3b", "3b", "3", "4"],
    //     followup: ["RU", "2", "5", "2"]
    // },