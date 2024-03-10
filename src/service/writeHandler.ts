const API = `https://api.deepseek.com/v1/chat/completions
`;

export default async function writeHandler({
  input,
  format,
  outputLang,
  length,
}: {
  input: string;
  format: string;
  outputLang: string;
  length: string;
}) {
  //@ts-ignore
  const inputValue = document?.getElementById("writeInputText")?.value;
  //@ts-ignore

  const payload = {
    messages: [
      {
        content: "You are a helpful assistant",
        role: "system",
      },
      {
        content: `Please rewrite below text in length ${length} and format  ${
          format == "formatAuto" ? "auto" : format
        }  in ${outputLang}:${input}`,
        role: "user",
      },
    ],
    model: "deepseek-chat",
    frequency_penalty: null,
    max_tokens: 2048,
    presence_penalty: null,
    stop: null,
    stream: false,
    temperature: 1,
    top_p: 1,
  };

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer sk-2c5d5a7ceebc4968b2c96065bccb21b1`,
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return response;
}

export const testContent = `translate below text {Auto- English} to {Farsi}:
Once received, applica:ons are reviewed by the Housing Accommoda:on Review Commi#ee. If the
commi#ee requests addi:onal informa:on to support an accommoda:on, students will be no:ﬁed
through their UWM email.
If a Housing Accommoda:on Request is approved or denied, students will be no:ﬁed through their
UWM email from University Housing. If approved, students also may receive addi:onal informa:on
relevant to a speciﬁc accommoda:on.
`;
