import React, { useRef } from "react";
import { useEffect, useState } from "react";
import styles from "@/styles/WriteLayout.module.css";
import Spinner from "./Spinner";
import writeHandler from "@/service/writeHandler";

const SideBarWrite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [outPutValue, setOutPutValue] = useState("");
  const [length, setLength] = useState("auto");
  const [format, setFormat] = useState("formatAuto");
  const [languageOutput, setLanguageOutput] = useState("");

  const inputRef = useRef("");
  const formatRef = useRef("auto");
  const lengthRef = useRef("auto");
  const outputLangRef = useRef("english");

  async function handleTranslate() {
    setIsLoading(true);
    await writeHandler({
      input: inputRef.current,
      format: formatRef.current,
      length: lengthRef.current,
      outputLang: outputLangRef.current,
    })
      .then((res) => setOutPutValue(res?.choices[0]?.message?.content))
      .then(() => setIsLoading(false));
  }

  function lengthHandler(ev: Event) {
    //@ts-ignore
    setLength(ev?.target?.id);
    //@ts-ignore
    lengthRef.current = ev?.target?.id;
  }

  function handleFormat(ev: Event) {
    //@ts-ignore
    setFormat(ev?.target?.id);
    //@ts-ignore
    formatRef.current = ev?.target?.id;
  }
  function handleOuputLang(ev: Event) {
    //@ts-ignore
    setLanguageOutput(ev?.target?.value);
    //@ts-ignore
    outputLangRef.current = ev?.target?.value;
  }

  useEffect(() => {
    // inputTextArea
    const inputTextArea = document.querySelector("textarea#writeInputText");

    //------length
    const lengthAuto = document.querySelector("button#auto");
    const lengthshort = document.querySelector("button#short");
    const lengthmedium = document.querySelector("button#medium");
    const lengthlong = document.querySelector("button#long");

    //--------Format
    const formatAuto = document.querySelector("button#formatAuto");
    const formatEmail = document.querySelector("button#email");
    const formMessage = document.querySelector("button#message");

    //---------output language
    const outputLanguage = document.querySelector("select#putPutLanguage");

    //------------regenerate
    const regenerate = document.querySelector("button#regenerate");

    //-----------------------------------input handler
    inputTextArea?.addEventListener("keyup", (ev: Event) => {
      //@ts-ignore
      inputRef.current = ev?.target?.value;
    });

    inputTextArea?.addEventListener("paste", (ev: Event) => {
      //@ts-ignore
      inputRef.current = ev?.target?.value;
    });

    //-------------------------------------- length handler
    lengthAuto?.addEventListener("click", lengthHandler);
    lengthshort?.addEventListener("click", lengthHandler);
    lengthmedium?.addEventListener("click", lengthHandler);
    lengthlong?.addEventListener("click", lengthHandler);

    //-------------------------------------------format handler
    formatAuto?.addEventListener("click", handleFormat);
    formatEmail?.addEventListener("click", handleFormat);
    formMessage?.addEventListener("click", handleFormat);

    //-------------------------------------------output language handler
    outputLanguage?.addEventListener("click", handleOuputLang);

    //-----------------------------regenerate handler
    regenerate?.addEventListener("click", handleTranslate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.sideBarWrite}>
      <h1>Write</h1>
      <div className={styles.btnGroup}></div>
      <div className={styles.textAreaLayout}>
        <h2>Write About</h2>
        <textarea
          name="writeInputText"
          id="writeInputText"
          placeholder="Enter Text"
          defaultValue={""}
          className={styles.textAreaInput}
        />
      </div>
      <h2>Length</h2>
      <div className={styles.btnGp}>
        <button
          id="auto"
          className={`${
            length == "auto" ? styles.customButtonActive : styles.customButton
          }`}
        >
          Auto
        </button>
        <button
          id="short"
          className={`${
            length == "short" ? styles.customButtonActive : styles.customButton
          }`}
        >
          Short
        </button>
        <button
          id="medium"
          className={`${
            length == "medium" ? styles.customButtonActive : styles.customButton
          }`}
        >
          Medium
        </button>
        <button
          id="long"
          className={`${
            length == "long" ? styles.customButtonActive : styles.customButton
          }`}
        >
          Long
        </button>
      </div>
      <h2>Format</h2>
      <div className={styles.btnGp}>
        <button
          id="formatAuto"
          className={`${
            format == "formatAuto"
              ? styles.customButtonActive
              : styles.customButton
          }`}
        >
          Auto
        </button>
        <button
          id="email"
          className={`${
            format == "email" ? styles.customButtonActive : styles.customButton
          }`}
        >
          Email
        </button>
        <button
          id="message"
          className={`${
            format == "message"
              ? styles.customButtonActive
              : styles.customButton
          }`}
        >
          Message
        </button>
      </div>
      <h2>Output Language</h2>
      <select id="putPutLanguage">
        <option selected value={"english"}>
          English
        </option>
        <option value={"thai"}>Thai</option>
        <option value={"french"}>French</option>
      </select>
      <button id="regenerate" className={styles.regenerateButton}>
        Regenerate
      </button>
      <>
        <h2>Preview</h2>
        <div className={styles.textAreaLayout}>
          <div className={styles.spinnerPosition}>
            {isLoading ? <Spinner /> : null}
          </div>

          <textarea
            id="preview"
            className={styles.textAreaOutPut}
            value={outPutValue}
            readOnly
            placeholder="preview"
          />
        </div>
      </>
    </div>
  );
};

export default SideBarWrite;
