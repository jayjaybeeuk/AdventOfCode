import { useEffect } from "react";

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
  // Find the first number in the string and its char position
  const firstNumberMatch = inputString.match(/\d/);
  const firstNumber = firstNumberMatch ? parseInt(firstNumberMatch[0]) : "";
  const firstNumberPosition = firstNumberMatch?.index;

  // Find the last number in the string and its char position
  const lastNumberMatch = inputString.match(/\d/g);
  const lastNumber = lastNumberMatch
    ? parseInt(lastNumberMatch[lastNumberMatch.length - 1])
    : "";
  const lastNumberPosition = lastNumberMatch
    ? inputString.lastIndexOf(lastNumber.toString())
    : -1;

  console.log(
    "firstNumber",
    firstNumber,
    firstNumberPosition,
    lastNumber,
    lastNumberPosition
  );

  return firstNumber.toString() + lastNumber.toString();
};

const findFirstOccurrenceStartingPosition = (inputString: string) => {
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
  let firstNumberPosition = Infinity; // Initialize with a large value
  let firstNumber = 0;

  for (const word of searchArray) {
    const regex = new RegExp("\\b" + word + "\\b", "i"); // Case-insensitive whole word match
    const match = inputString.match(regex);

    if (match && match.index < firstNumberPosition) {
      firstNumberPosition = match.index || 0;
      firstNumber = parseInt(match[0]);
    }
  }

  const result = {
    firstNumber: firstNumber,
    firstNumberPosition:
      firstNumberPosition !== Infinity ? firstNumberPosition : null, // Return null if no match found
  };
  return result;
};

const AdventOne = () => {
  //Part One
  // useEffect(() => {
  //   fetch("src/assets/AdventOneText.txt")
  //     .then((r) => r.text())
  //     .then((text) => {
  //       //remove all non numerics in each array item
  //       const sum = text
  //         .split("\n")
  //         .map((line) => {
  //           return findFirstAndLastNumbersPartOne(line);
  //         })
  //         .reduce((a, b) => {
  //           return (Number(a) + Number(b)).toString();
  //         });

  //       document
  //         .querySelector("#adventOne")!
  //         .setAttribute("value", sum.toString());
  //     });
  // }, []);

  //Part Two
  useEffect(() => {
    fetch("src/assets/AdventOneText.txt")
      .then((r) => r.text())
      .then((text) => {
        //remove all non numerics in each array item
        const sum = text
          .split("\n")
          .map((line) => {
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
