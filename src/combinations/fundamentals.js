//each combo stored as an object with 1 field instead of a 2d array.  This is in anticipation of future updates/additions to the combo feature.

export const combos = [
    {
        name: "Offense 1",
        combos: [
            {
                sequence: ["1", "2"],
                followups: [["1", "1", "2b"], ["1", "1", "2"], ["1", "1b", "2"], ["1b", "1", "2"], ["3", "4"], ["3", "2"], ["3", "3", "3", "2"]]
            },
            {
                sequence: ["1", "1", "2"],
                followups: [["3", "2"], ["3b", "2"], ["5b", "2"], ["5", "2"], ["3b", "6"], ["3", "6"]]
            },
            {
                sequence: ["1", "1"],
                followups: [["2b", "5"], ["2", "3"], ["2", "5", "2"], ["2", "3", "2"], ["6", "3"]]
            }
        ]
    },
    {
        name: "Defense 1",
        combos: [
            {
                sequence: ["Slip", "2"],
                followups: [["Pull", "6",], ["Slip", "2", "5"], ["Slip", "2"], ["Pull", "2"], ["2", "Roll"]]
            },
            {
                sequence: ["Slip", "1"],
                followups: [["Slip", "1", "2"], ["Roll", "3"], ["4", "Roll"], ["Pivot", "1", "4"], ["2", "Roll"]]
            },
            {
                sequence: ["Pivot", "Slip"],
                followups: [["Roll", "Roll", "1"], ["1", "Pivot", "1"], ["Pivot", "1", "2"], ["Duck", "2"]]
            }
        ],
    },
    {
        name: "Destroyer",
        combos: [
            {
                sequence: ["1", "2", "Duck"],
                followups: [["3b", "5", "2"], ["2", "5", "Roll", "3", "2"]]
            },
            {
                sequence: ["1", "Slip", "4"],
                followups: [["3b", "5", "2"], ["5b", "Roll", "3"]]
            },
            {
                sequence: ["1", "2"],
                followups: [["Slip", "Slip", "3", "4"], ["Slip", "Slip", "3", "2"], ["Slip", "Roll", "3", "2"]]
            },
            {
                sequence: ["Slip", "Roll"],
                followups: [["3", "2", "Roll", "2", "3"]]
            },
            {
                sequence: ["1", "2", "Slip"],
                followups: [["Slip", "3b", "5", "2"], ["Slip", "Roll", "2", "3b", "5"], ["Slip", "Roll", "Roll", "3"]]
            },
            {
                sequence: ["3", "2", "Roll"],
                followups: [["2", "3", "Roll"], ["2", "3", "Pivot", "5", "4"]]
            }
        ]
    },
]






    // {
    //     sequence: ["1", "2", "3b", "3b", "3", "4"],
    //     followup: ["RU", "2", "5", "2"]
    // },