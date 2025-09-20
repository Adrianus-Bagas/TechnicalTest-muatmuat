import {useEffect, useState} from "react";

export default function FetchAPI() {
  const [result, setResult] = useState<
    {
      name: string;
      url: string;
    }[]
  >([]);
  const [effect, setEffect] = useState<any[]>([]);

  useEffect(() => {
    getAbility();
    getBattleArmor();
  }, []);

  const getAbility = async () => {
    try {
      const result = await fetch("https://pokeapi.co/api/v2/ability");
      const jsonValue = await result.json();

      setResult(jsonValue.results);
    } catch (err) {
      console.error(err);
    }
  };

  const getBattleArmor = async () => {
    try {
      const result = await fetch("https://pokeapi.co/api/v2/ability/battle-armor");
      const jsonValue = await result.json();

      setEffect(jsonValue.effect_entries);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="p-4 md:flex md:gap-2">
        <table className="border-collapse w-full">
          <tr>
            <th className="border-black border-2">Name</th>
            <th className="border-black border-2">Url</th>
          </tr>
          {result.map((result, index) => (
            <tr key={index}>
              <td className="border-black border-2">{result.name}</td>
              <td className="border-black border-2">{result.url}</td>
            </tr>
          ))}
        </table>
        <div className="flex flex-col gap-2">
          {effect.map((item) => (
            <p>Effect:{item.effect}</p>
          ))}
        </div>
      </div>
    </>
  );
}
