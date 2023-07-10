import { produce } from 'immer';
import { useEffect, useState } from 'preact/hooks';
import './app.css';

function getDiceResults(dice) {
  const allDice = Array.from(dice)
    .filter(([_, count]) => count > 0)
    .flatMap(([die, count]) => Array(count).fill(die));

  const randomNumbers = new Uint32Array(allDice.length);
  self.crypto.getRandomValues(randomNumbers);

  const results = Array.from(randomNumbers).map((result, index) => {
    const die = allDice[index];
    return (result % die) + 1;
  });
  return results;
}

const time = new Array(60);

export function App() {
  const [dice, setDice] = useState(new Map());

  useEffect(function initialize() {
    const basicSet = new Map([
      [4, 0],
      [6, 0],
      [8, 0],
      [10, 0],
      [12, 0],
      [20, 0],
      [100, 0],
    ]);
    setDice(basicSet);
  }, []);

  const updateDieCount = (die) => (e) => {
    setDice(
      produce((draftDice) => {
        const value = Math.max(parseInt(e.target.value), 0);
        draftDice.set(die, value);
      })
    );
  };

  return (
    <>
      <form className="no-print">
        {Array.from(dice).map(([die, count]) => {
          return (
            <label>
              {`d${die}`}
              <input
                type="number"
                value={count}
                min={0}
                step={1}
                onChange={updateDieCount(die)}
              />
            </label>
          );
        })}
      </form>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {Array.from(dice)
              .filter(([_, count]) => count > 0)
              .map(([die, count]) => {
                return <th colSpan={count}>{`d${die}`}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {Array.from(time).map((_, index) => {
            return (
              <tr>
                <td>{`:${index.toString().padStart(2, '0')}`}</td>
                {getDiceResults(dice).map((result) => (
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
