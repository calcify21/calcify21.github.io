function utils() {
  return {
    getOrdinalSuffixOf: function (num) {
      const suffixes = ["th", "st", "nd", "rd"];
      const lastDigit = num % 10;
      const lastTwoDigits = num % 100;
      if (lastDigit === 1 && lastTwoDigits !== 11) {
        return num + suffixes[1];
      } else if (lastDigit === 2 && lastTwoDigits !== 12) {
        return num + suffixes[2];
      } else if (lastDigit === 3 && lastTwoDigits !== 13) {
        return num + suffixes[3];
      } else {
        return num + suffixes[0];
      }
    },
  };
}
