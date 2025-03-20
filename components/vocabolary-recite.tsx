"use client";

import { Card, CardBody, CardFooter } from "@heroui/card";
import { Code } from "@heroui/code";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import { Prisma } from "@prisma/client";
import { useState } from "react";

function mask(str: string, cnt: number) {
  return `${str.substring(0, cnt)}${str.substring(cnt).replace(/[^ ]/g, "*")}`;
}

export const VocabolaryRecite = ({
  data,
}: {
  data: Prisma.VocabularyGetPayload<{}>;
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [value, setValue] = useState("");
  const [color, setColor] = useState<
    "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  >("default");
  const [invalid, setInvalid] = useState(false);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey && e.key === "Enter") {
      window.location.reload();
    } else if (e.ctrlKey && e.key === "l") {
      setValue("");
      setVisibleCount(visibleCount + 1);
    }
  };

  const handleValueChange = (value: string) => {
    setValue(value);
    if (value.length === data.from_message.length) {
      const invalid = value !== data.from_message;
      setInvalid(invalid);
      setColor(invalid ? "danger" : "success");
    } else {
      setInvalid(false);
      setColor("default");
    }
  };

  return (
    <Card className="scale-150 w-[400px]">
      <CardBody>
        <Input
          autoFocus
          placeholder={mask(data.from_message, visibleCount)}
          onKeyDown={handleInputKeyDown}
          value={value}
          onValueChange={handleValueChange}
          description={`${value.length}/${data.from_message.length}`}
          errorMessage="not correct"
          isInvalid={invalid}
          color={color}
        />
        <div>{data.to_message}</div>
      </CardBody>
      <CardFooter>
        <div className="flex flex-col gap-4 text-left">
          <Code size="sm">
            <Kbd keys={["ctrl"]}>l</Kbd> : Show Hint
          </Code>
          <Code size="sm">
            <Kbd keys={["ctrl"]}>Enter</Kbd>: Next Question
          </Code>
        </div>
      </CardFooter>
    </Card>
  );
};
