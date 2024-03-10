import React, { useRef } from "react";
import styles from "@/styles/Layout.module.css";
import { useEffect, useState } from "react";
import translateHandler from "@/service/translateHandler";
import { debounce } from "@/utils/translationDebounce";
import Spinner from "./Spinner";

const SideBarForm = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [languageFrom, setLanguageFrom] = useState("english");
  const [outPutValue, setOutPutValue] = useState("");
  const buttonRef = useRef("english");

  async function handleTranslate() {
    setIsLoading(true);
    await translateHandler({
      input: input,
      from: buttonRef.current,
      to: "persian",
    })
      .then((res) => setOutPutValue(res?.choices[0]?.message?.content))
      .then(() => setIsLoading(false));
  }

  const translateFunc = debounce(() => handleTranslate());

  function selectLang(ev: Event) {
    //@ts-ignore
    buttonRef.current = ev?.target?.id;
    //@ts-ignore
    setLanguageFrom(ev?.target.id);
  }

  useEffect(() => {
    const inputText = document.querySelector("textarea#inputText");

    inputText?.addEventListener("paste", (ev) => {
      translateFunc();

      //@ts-ignore.
      setInput(ev?.target.value);
    });
    inputText?.addEventListener("keyup", (ev) => {
      translateFunc();

      //@ts-ignore.
      setInput(ev?.target.value);
    });

    const languageAuto = document.querySelector("button#english");
    const languageThai = document.querySelector("button#thai");
    const languageFrench = document.querySelector("button#french");

    languageAuto?.addEventListener("click", selectLang);
    languageThai?.addEventListener("click", selectLang);
    languageFrench?.addEventListener("click", selectLang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.sideBarForm}>
      <h1>Translate</h1>
      <div className={styles.btnGroup}>
        <button
          id="english"
          name="english"
          className={`${
            languageFrom == "english"
              ? styles.activeFromLang
              : styles.languageButton
          }`}
        >
          Auto detect
        </button>
        <button
          id="thai"
          name="thai"
          className={`${
            languageFrom == "thai"
              ? styles.activeFromLang
              : styles.languageButton
          }`}
        >
          Thai
        </button>
        <button
          id="french"
          name="french"
          className={`${
            languageFrom == "french"
              ? styles.activeFromLang
              : styles.languageButton
          }`}
        >
          French
        </button>
      </div>

      <div className={styles.textAreaLayout}>
        <textarea
          name="inputTextArea"
          id="inputText"
          placeholder="Enter Text"
          defaultValue={""}
          className={styles.textAreaInput}
        />
        {isLoading ? <Spinner /> : null}
      </div>

      <div className={styles.textAreaLayout}>
        <textarea
          className={styles.textAreaOutPut}
          value={outPutValue}
          readOnly
          placeholder="Translation"
        />
      </div>
    </div>
  );
};

export default SideBarForm;
