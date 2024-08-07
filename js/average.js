function findAverage() {
    const numbers = document.getElementsByClassName('field');
    let sum = 0;
    let count = 0;
    for (let i = 0; i < numbers.length; i++) {
        const value = parseFloat(numbers[i].value);
        if (!isNaN(value)) {
            sum += value;
            count++;
        }
    }
    console.log(sum / count);
}