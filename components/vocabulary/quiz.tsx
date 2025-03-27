"use client";

import Iframe from "react-iframe";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Code } from "@heroui/code";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";

function mask(str: string, cnt: number) {
  return `${str.substring(0, cnt)}${str.substring(cnt).replace(/[^ ]/g, "*")}`;
}

export const VocabularyQuiz = ({
  data,
}: {
  data: Prisma.VocabularyGetPayload<{}>;
}) => {
  const [uid, setUid] = useState<string>();

  const [visibleCount, setVisibleCount] = useState(0);
  const [value, setValue] = useState("");
  const [color, setColor] = useState<
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  >("default");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem("unique_identity");

    if (uid) {
      setUid(uid);
    } else {
      const gen_uid = `${new Date().getTime()}`;

      localStorage.setItem("unique_identity", gen_uid);
      setUid(gen_uid);
    }
  }, []);
  const handleInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter") {
      try {
        const score =
          value.toLocaleLowerCase() === data.from_message.toLocaleLowerCase()
            ? (100 * (data.from_message.length - visibleCount)) /
              data.from_message.length
            : 0;

        if (score < 100) {
          const response = await fetch(`/api/vocabulary_test_result`, {
            method: "POST",
            body: JSON.stringify({
              uid,
              from_message: data.from_message,
              score,
            }),
          });
          await response.json();
        }
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else if (e.ctrlKey && e.key === "l") {
      setVisibleCount(visibleCount + 1);
    }
  };

  const handleValueChange = (value: string) => {
    setValue(value);
    if (value.length === data.from_message.length) {
      const invalid =
        value.toLocaleLowerCase() !== data.from_message.toLocaleLowerCase();

      setInvalid(invalid);
      setColor(invalid ? "danger" : "success");
    } else {
      setInvalid(false);
      setColor("default");
    }
  };

  return (
    <div className="columns-2">
      <Card className="">
        <CardBody>
          <Input
            autoFocus
            color={color}
            size="lg"
            endContent={`${value.length}/${data.from_message.length}`}
            isInvalid={invalid}
            value={value}
            onKeyDown={handleInputKeyDown}
            onValueChange={handleValueChange}
          />
          <Code size="lg">{mask(data.from_message, visibleCount)}</Code>
          <div className="text-2xl whitespace-break-spaces">
            {data.to_message.replace(/\\n/g, "\n")}
          </div>
        </CardBody>
        <CardFooter className="gap-4">
          <Code size="sm">
            <Kbd className="w-12" keys={["ctrl"]}>
              l
            </Kbd>
            : Show Hint
          </Code>
          <Code size="sm">
            <Kbd className="w-12" keys={[]}>
              Enter
            </Kbd>
            : Next Question
          </Code>
        </CardFooter>
      </Card>
      <div className="w-[600px]">
        {value.toLocaleLowerCase() ===
          data.from_message.toLocaleLowerCase() && (
          <Iframe
            url={`https://www.ei-navi.jp/dictionary/content/${data.from_message}/`}
            width="600px"
            height="900px"
          />
        )}
      </div>
    </div>
  );
};
