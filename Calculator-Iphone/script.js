"use strict";

let value1 = "",
  value2 = "",
  sing = "",
  finish = false;

const out = document.querySelector(".calculator__result");

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const action = ["+", "-", "X", "/"];

function clearAll() {
  value1 = "";
  value2 = "";
  sing = "";
  finish = false;
  out.textContent = 0;
}

document.querySelector("#AC").addEventListener("click", clearAll);

document.querySelectorAll("button").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.id == "AC") {
      return;
    }

    out.textContent = "";

    const key = e.target.textContent;

    if (digit.includes(key)) {
      if (value2 === "" && sing === "") {
        value1 += key;
        out.textContent = value1;
      } else if (value1 !== "" && value2 !== "" && finish) {
        value2 = key;
        finish = false;
        out.textContent = value2;
      } else {
        value2 += key;
        out.textContent = value2;

        return;
      }
    }

    if (action.includes(key)) {
      sing = key;
      out.textContent = sing;
      return;
    }

    if (key === "=") {
      if (value2 === "") {
        value2 = value1;
      }
      switch (sing) {
        case "+":
          value1 = +value1 + +value2;
          break;
        case "-":
          value1 = +value1 - +value2;
          break;
        case "X":
          value1 = +value1 * +value2;
          break;
        case "/":
          if (value2 === "0") {
            out.textContent = "Ошибка";
            value1 = "";
            value2 = "";
            sing = "";
            return;
          }
          value1 = +value1 / +value2;
          break;
      }

      finish = true;

      out.textContent = value1;
    }
  });
});
