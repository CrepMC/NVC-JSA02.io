// Nhập số dương n
let n = parseInt(prompt("Nhập số dương n:"));

// 1. Tính tổng các số chẵn từ 0 tới n
let sumEven = 0;
for (let i = 0; i <= n; i++) {
    if (i % 2 === 0) {
        sumEven += i;
    }
}
console.log("Tổng các số chẵn từ 0 tới", n, "là:", sumEven);

// 2. Tính tổng các số lẻ từ 0 tới n
let sumOdd = 0;
for (let i = 0; i <= n; i++) {
    if (i % 2 !== 0) {
        sumOdd += i;
    }
}
console.log("Tổng các số lẻ từ 0 tới", n, "là:", sumOdd);

// 3. Tính tổng các ước từ 0 tới n của n
let sumDivisors = 0;
for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
        sumDivisors += i;
    }
}
console.log("Tổng các ước từ 0 tới", n, "của", n, "là:", sumDivisors);

// 4. Tính 1/1 + 1/(1+2) + 1/(1+2+3) + ... + 1/(1+2+...+n)
let sumSeries = 0;
let currentSum = 0;
for (let i = 1; i <= n; i++) {
    currentSum += i;
    sumSeries += 1 / currentSum;
}
console.log("1/1 + 1/(1+2) + 1/(1+2+3) + ... + 1/(1+2+...+n)=", sumSeries);

// 1. for ( ; ; ) { }
// Trường hợp này tạo ra vòng lặp vô tận vì không có điều kiện dừng nào được xác định.

// 2. let i = 1; while (i < 5) { }
// Trường hợp này không tạo ra vòng lặp vô tận vì có điều kiện dừng là i < 5.

// 3. while (true) { }
// Trường hợp này tạo ra vòng lặp vô tận vì điều kiện luôn đúng (true).

// 4. while (1) { }
// Trường hợp này tạo ra vòng lặp vô tận vì điều kiện luôn đúng (1 được coi là true trong điều kiện).

// 5. let i = 5; do { i++ } while (1);
// Trường hợp này tạo ra vòng lặp vô tận vì điều kiện luôn đúng (1 được coi là true trong điều kiện) và không có điều kiện dừng nào được xác định.
