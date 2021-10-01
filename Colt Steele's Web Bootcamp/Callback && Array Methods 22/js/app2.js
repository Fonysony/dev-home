const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

let total = 0;
prices.forEach((n) => total += n);

let total2 = prices.reduce((total, price) => {
    return total + price;
});