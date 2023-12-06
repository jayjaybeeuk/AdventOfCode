import { useEffect } from "react";

const calculateAdventThreePartOne = (
  inputString: string,
  lineNumber: number
) => {
  const numbers = getNumbersObject(inputString, lineNumber);
  console.log(numbers);

  let sum = 0;

  //Loop through numbers and add them together
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i].number;
  }
  return sum.toString();
};

const getNumbersObject = (inputString: string, lineNumber: number) => {
  const regex = /\d+/g;
  const matches = [];
  let match;

  // Reset the regex index for each line
  regex.lastIndex = 0;

  console.log("line no", lineNumber);

  // Find all matches in the current line
  while ((match = regex.exec(inputString)) !== null) {
    matches.push({
      line: lineNumber + 1, // Line number (1-indexed)
      start: match.index,
      end: match.index + match[0].length,
      number: parseInt(match[0], 10), // Convert the matched string to a number
    });
  }

  return matches;
};

const AdventThree = () => {
  //Part One
  useEffect(() => {
    fetch("src/assets/AdventThreeText.txt")
      .then((r) => r.text())
      .then((text) => {
        //remove all non numerics in each array item
        const sum = text
          .split("\n")
          .map((line, index) => {
            return calculateAdventThreePartOne(line, index);
          })
          .reduce((a, b) => {
            return (Number(a) + Number(b)).toString();
          });

        document
          .querySelector("#adventOne")!
          .setAttribute("value", sum.toString());
      });
  }, []);
  return (
    <div>
      <h1>Advent Two</h1>
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

export default AdventThree;
