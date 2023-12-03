import { useEffect } from "react";

type LetterArray = {
  number: number;
  numberLetter: string;
  numberPosition: number;
};

const checkValue = (value: number | null | undefined): boolean => {
  return value !== null && value !== undefined;
};

const findFirstAndLastNumbersPartOne = (inputString: string) => {
  // Find the first number in the string
  const firstNumberMatch = inputString.match(/\d/);
  const firstNumber = firstNumberMatch ? parseInt(firstNumberMatch[0]) : "";

  // Find the last number in the string
  const lastNumberMatch = inputString.match(/\d/g);
  const lastNumber = lastNumberMatch
    ? parseInt(lastNumberMatch[lastNumberMatch.length - 1].charAt(0))
    : "";

  return firstNumber.toString() + lastNumber.toString();
};

const findFirstAndLastNumbersPartTwo = (inputString: string) => {
  //Get the first occurrence of a number
  const numberMatch = findFirstOccurrenceNumbers(inputString);
  const letterMatch = findFirstOccurrenceLetters(inputString);

  let selectedFirstNumber = "0";
  let selectedLastNumber = "0";

  // Figure out which number is first
  if (
    !letterMatch[0] ||
    numberMatch.firstNumberPosition < letterMatch[0].numberPosition
  ) {
    selectedFirstNumber = numberMatch.firstNumber.toString();
  } else {
    selectedFirstNumber = letterMatch[0].number.toString();
  }
  // Figure out which number is last
  if (
    !letterMatch[letterMatch.length - 1] ||
    numberMatch.lastNumberPosition >
      letterMatch[letterMatch.length - 1].numberPosition
  ) {
    selectedLastNumber = numberMatch.lastNumber.toString();
  } else {
    selectedLastNumber = letterMatch[letterMatch.length - 1].number.toString();
  }

  return selectedFirstNumber + selectedLastNumber;
};

const findFirstOccurrenceNumbers = (inputString: string) => {
  // Find the first number in the string and its char position
  const firstNumberMatch = inputString.match(/\d/);
  const firstNumber = firstNumberMatch ? parseInt(firstNumberMatch[0]) : "";
  const firstNumberPosition = firstNumberMatch?.index ?? -1;

  // Find the last number in the string and its char position
  const lastNumberMatch = inputString.match(/\d/g);
  const lastNumber = lastNumberMatch
    ? parseInt(lastNumberMatch[lastNumberMatch.length - 1])
    : "";
  const lastNumberPosition = lastNumberMatch
    ? inputString.lastIndexOf(lastNumber.toString())
    : -1;

  const result = {
    firstNumber: firstNumber,
    firstNumberPosition: firstNumberPosition,
    lastNumber: lastNumber,
    lastNumberPosition: lastNumberPosition,
  };
  return result;
};

const findFirstOccurrenceLetters = (inputString: string) => {
  const searchArray = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  let letterArray: LetterArray[] = [];

  let i = 1;
  for (const word of searchArray) {
    // Create a regular expression with the 'g' flag for global search
    const regex = new RegExp(word, "g");

    let match;

    // Use a loop to find all matches
    while ((match = regex.exec(inputString)) !== null) {
      letterArray.push({
        number: i,
        numberLetter: word,
        numberPosition: match.index || 0,
      });
    }

    i++;
  }

  // Now we need to sort the arrat by the position of the number
  letterArray.sort((a, b) => {
    return a.numberPosition - b.numberPosition;
  });

  // console.log("letterArray", letterArray);

  return letterArray;
};

const AdventOne = () => {
  //Part One
  useEffect(() => {
    fetch("src/assets/AdventOneText.txt")
      .then((r) => r.text())
      .then((text) => {
        //remove all non numerics in each array item
        const sum = text
          .split("\n")
          .map((line) => {
            return findFirstAndLastNumbersPartOne(line);
          })
          .reduce((a, b) => {
            return (Number(a) + Number(b)).toString();
          });

        document
          .querySelector("#adventOne")!
          .setAttribute("value", sum.toString());
      });
  }, []);

  //Part Two
  useEffect(() => {
    fetch("src/assets/AdventOneText.txt")
      .then((r) => r.text())
      .then((text) => {
        const sum = text
          .split("\n")
          .map((line) => {
            // console.log("line", line);
            return findFirstAndLastNumbersPartTwo(line);
          })
          .reduce((a, b) => {
            return (Number(a) + Number(b)).toString();
          });

        document
          .querySelector("#adventOnePartTwo")!
          .setAttribute("value", sum.toString());
      });
  }, []);

  return (
    <div>
      <h1>Advent One</h1>
      <div>
        <span>
          Part 1 - The sum of the inputs from the{" "}
          <a href="src/assets/AdventOneText.txt" target="_blank">
            text file here
          </a>{" "}
          is:
        </span>
        <input id="adventOne" name="adventOne" />
      </div>
      <div>
        <span>
          Part 2 - The sum of the inputs from the{" "}
          <a href="src/assets/AdventOneText.txt" target="_blank">
            text file here
          </a>{" "}
          is:
        </span>
        <input id="adventOnePartTwo" name="adventOnePartTwo" />
      </div>
    </div>
  );
};

export default AdventOne;
