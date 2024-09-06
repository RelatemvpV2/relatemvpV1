import React, { useState, useEffect } from 'react'

const useGetRecomendation = (currentUserScoreObj, partnerScoreObj) => {

    const [finalScores, setFinalScores] = useState([])


    const catagories = [/* 'Relation',  */'Communication', 'Values', 'Everyday life', 'Trust', 'Boundaries', 'Intimacy', 'Economy', 'Child rearing']
    const weightObj = {
       /*  "Relation": 0, */
        "Communication": 0.999,
        "Values": 0.998,
        "Everyday life": 0.997,
        "Trust": 0.996,
        "Boundaries": 0.995,
        "Intimacy": 0.994,
        "Economy": 0.993,
        "Child rearing": 0.992
    }

    const scoresArr = catagories.map((c, i) => {
        let a = Number(currentUserScoreObj[c]);
        let b = Number(partnerScoreObj[c])
        let sub = Math.abs(a - b);
        console.log("sub",sub)
        let avg = (a + b) / 2;
        let SubRelativeTo5 = sub / 5;
        let avgRelativeTo5 = avg / 5;

        let result = (avgRelativeTo5 - SubRelativeTo5) * weightObj[c]
        return { key:c,value: result }
    })

    let sortedScore = scoresArr.sort(
        (p1, p2) => (p1.value > p2.value) ? 1 : (p1.value < p2.value) ? -1 : 0);

        

    console.log(sortedScore)

    return {sortedScore}
}

export default useGetRecomendation