//C1
//b
const myNums = [1, 0, -8, 100, 20, 13, -99];
let sum = 0;
for (let i = 0; i < myNums.length; i++) {
    if (myNums[i] % 2 === 0) {
        sum += myNums[i]
    }
}

console.log(sum);

const myEvenNums = myNums.filter(num => num % 2 === 0);
console.log(myEvenNums);

const car = {
    name: 'Laferari',
    age: '20',
    maxFuel: '12L',
    startEngine: function() {
        console.log("Engine Started")
    },
    stopEngine: function() {
        console.log("Engine Stopped")
    }
};

console.log(Math.random(Math.floor(Math.random() * 100) + 1))
