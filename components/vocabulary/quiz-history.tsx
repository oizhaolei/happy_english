"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "@heroui/link";
import { db } from "../db";
import { Button } from "@heroui/button";

const clearHistory = () => {
  db.quizes.clear();
};
export function QuizHistory() {
  const lists = useLiveQuery(() => db.quizes.orderBy("id").reverse().toArray());

  if (!lists) return null;

  return (
    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
      {lists.map((item) => (
        <li key={item.id}>
          <Link
            aria-label="Table Columns"
            isExternal
            href={`https://www.ei-navi.jp/dictionary/content/${item.from_message.toLocaleLowerCase()}/`}
          >
            {item.from_message}
          </Link>
        </li>
      ))}
      {lists.length > 0 && (
        <Button
          color="primary"
          size="sm"
          variant="light"
          onPress={clearHistory}
        >
          Clear History
        </Button>
      )}
    </ul>
  );
}
