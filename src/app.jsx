import { useEffect, useState } from 'preact/hooks';
import './app.css';

function getRandomUnsignedIntegers(dice) {
  const allDice = Array.from(dice)
    .map(([die, count]) => Array(count).fill(die))
    .flat();

  const randomNumbers = new Uint32Array(allDice.length);
  self.crypto.getRandomValues(randomNumbers);

  const results = Array.from(
    randomNumbers.map((result, index) => {
      const die = allDice[index];
      return (result % die) + 1;
    })
  );
  return results;
}

const time = new Array(60);

export function App() {
  const [dice, setDice] = useState(new Map());

  useEffect(() => {
    const sixes = new Map([[6, 6]]);
    setDice(sixes);
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {Array.from(dice.entries()).map(([die, count]) => {
              return <th colSpan={count}>{`d${die}`}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from(time).map((_, index) => {
            return (
              <tr>
                <td>{`:${index.toString().padStart(2, '0')}`}</td>
                {getRandomUnsignedIntegers(dice).map((result) => (
                  <td>{result}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
