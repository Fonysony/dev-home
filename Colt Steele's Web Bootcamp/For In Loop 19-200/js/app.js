const testScores = {
    aaron: 90,
    david: 87,
    jared: 77,
    matt: 92,
    justin: 86,
    william: 60
}


for (let person in testScores) {
    console.log(`${person} scored ${testScores[person]}`);
}

let total = 0;
let scores = Object.values(testScores);

for (let score of scores) {
  total += score;
}
console.log(total / scores.length);

console.log(Object.keys(testScores));
console.log(Object.values(testScores));
console.log(Object.entries(testScores));