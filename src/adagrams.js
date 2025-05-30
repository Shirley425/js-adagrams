
//Wave 1
export const drawLetters = () => {
  const letterList = [];
  for (let letter in LETTER_POOL) {
    for (let i = 0; i < LETTER_POOL[letter]; i++) {
      letterList.push(letter);
    }
  };

  for (let i = letterList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [letterList[i], letterList[j]] = [letterList[j], letterList[i]];
  }
  return letterList.splice(0, 10);
};


  //Wave 2
export const usesAvailableLetters = (input, lettersInHand) => {
  const lettersBank = [...lettersInHand];
  for (let letter of input.toUpperCase()) {
    if (!lettersBank.includes(letter)) {
      return false;
    }
    lettersBank.splice(lettersBank.indexOf(letter),1);
  }
  return true;
};


  //Wave 3
export const scoreWord = (word) => {
  const SCORE_DICT = {
        'A': 1, 'E': 1, 'I': 1, 'O': 1, 'U': 1, 'L': 1, 'N': 1, 'R': 1, 'S': 1, 'T': 1,
        'D': 2, 'G': 2,
        'B': 3, 'C': 3, 'M': 3, 'P': 3,
        'F': 4, 'H': 4, 'V': 4, 'W': 4, 'Y': 4,
        'K': 5,
        'J': 8, 'X': 8,
        'Q': 10, 'Z': 10
    };

    let score = 0;
    if (word.length === 0) {
      return score;
    }

    for (let letter of word.toUpperCase()) {
      score += SCORE_DICT[letter];
    }
    if (word.length >= 7) {
      score += 8;
    }
    return score;
};


  //Wave 4
export const highestScoreFrom = (words) => {
  let maxScore = 0;
  let maxWord = '';
  let tieWords = [];

  for (let word of words) {
    const score = scoreWord(word);
    if (score > maxScore) {
      maxScore = score;
      maxWord = word;
      tieWords = [word];
    } else if (score === maxScore) {
      tieWords.push(word);
    }
  }

  if (tieWords.length > 1) {
    let minLen = tieWords[0].length;
    for (let tieWord of tieWords) {
      if (tieWord.length === 10) {
        return { word: tieWord, score: maxScore };
      } else if (tieWord.length < minLen) {
        maxWord = tieWord;
        minLen = tieWord.length;
      }
    }
  }

  return { word: maxWord, score: maxScore };
};

const LETTER_POOL = {A: 9, B: 2, C: 2, D: 4, E: 12, F: 2,
                    G: 3, H: 2, I: 9, J: 1, K: 1, L: 4,
                    M: 2, N: 6, O: 8, P: 2, Q: 1, R: 6,
                    S: 4, T: 6, U: 4, V: 2, W: 2, X: 1,
                    Y: 2,Z: 1,
};