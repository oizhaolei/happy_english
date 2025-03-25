"use client";

import { Card, CardBody } from "@heroui/card";
import { Code } from "@heroui/code";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Prisma } from "@prisma/client";
import { useId, useState } from "react";

function mask(str: string, cnt: number) {
  return `${str.substring(0, cnt)}${str.substring(cnt).replace(/[^ ]/g, "*")}`;
}

export const VocabularyQuiz = ({
  data,
}: {
  data: Prisma.VocabularyGetPayload<{}>;
}) => {
  const uid = useId();
  const [visibleCount, setVisibleCount] = useState(0);
  const [value, setValue] = useState("");
  const [color, setColor] = useState<
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  >("default");
  const [invalid, setInvalid] = useState(false);

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
        const response = await fetch(`/api/vocabulary_test_result`, {
          method: "POST",
          body: JSON.stringify({
            uid,
            from_message: data.from_message,
            score,
          }),
        });
        const res_json = await response.json();
        console.log("res_json:", res_json);

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
    <>
      <Card className="scale-150 w-[400px]">
        <CardBody>
          <Input
            autoFocus
            color={color}
            description={
              <div>
                <Code>{mask(data.from_message, visibleCount)}</Code>
              </div>
            }
            endContent={`${value.length}/${data.from_message.length}`}
            isInvalid={invalid}
            value={value}
            onKeyDown={handleInputKeyDown}
            onValueChange={handleValueChange}
          />
          <div>{data.to_message}</div>
        </CardBody>
      </Card>
      <div className="flex flex-col text-left  mt-10">
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
      </div>
    </>
  );
};
