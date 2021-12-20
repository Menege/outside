import style from "./modalbox.module.css";
import CalcBlock from "./CalcBlock";
import { useState} from "react";

const mrot = 12130;

export default function ModalBox({ active, setActive }) {
  const desc =
    "Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.";

  const [isCalc, setIsCalc] = useState(false);
  const [input, setInput] = useState("");
  const [arr, setArr] = useState([]);
  const [error, setError] = useState(false);

  const handlerSalary = (event) => {
    if (event.target.value > mrot) {
      setInput(+event.target.value);
      setError(false);
    } else {
      setInput("");
    }
  };

  const buttonAction = (e) => {
    e.preventDefault();
  };

  const handlerCalc = () => {
    setArr([]);
    if (input) {
      let perYear = input * 12 * 0.13;
      let x = 0;
      const maxValue = 260000;
      while (x < maxValue) {
        if (x + perYear > maxValue) {
          x = maxValue - x;
          setArr((number) => [...number, x]);
          break;
        } else {
          x += perYear;
          setArr((number) => [...number, perYear]);
        }
      }
      setIsCalc(true);
    } else {
      setError(true);
      setIsCalc(false);
    }
  };


  return (
    <div className={style.box}>
      <div
        className={style.exit}
        onClick={() => {
          setActive(false);
          setIsCalc(false);
        }}
      >
        <img src="/images/Vector.svg" alt="Выход" />
      </div>
      <span className={style.title}>Налоговый вычет</span>
      <p className={style.desc}> {desc} </p>
      <form action="">
        <span className={style.quest}>Ваша зарплата в месяц</span>
        <input
          type="text"
          placeholder="Введите данные"
          onChange={handlerSalary}
          className={error ? style.salary_input_error : style.salary_input}
        />
        {error && (
          <div className={style.text_error}>
            Введите заработную плату в числовом формате и выше минимального
            размера (МРОТ в РФ 12 130 ₽)
          </div>
        )}
        <span
          className={style.calc}
          onClick={handlerCalc}
        >
          Рассчитать
        </span>
        {isCalc && <CalcBlock arr={arr} />}
        <div className={style.block_quest}>
          <div className={`${style.quest} ${style.mg32}`}>Что уменьшаем?</div>
          <input
            className={style.reduce_input}
            name="reduce"
            type="radio"
            value="Pay"
            id="Pay"
          />
          <label className={style.label} htmlFor="Pay">
            Платеж
          </label>
          <input
            className={style.reduce_input}
            name="reduce"
            type="radio"
            value="Period"
            id="Period"
          />
          <label className={style.label} htmlFor="Period">
            Срок
          </label>
        </div>
        <button onClick={buttonAction} className={style.form__button}>
          Добавить
        </button>
      </form>
    </div>
  );
}
