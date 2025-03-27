"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { Link } from "@heroui/link";
import { db } from "../db";

export function QuizHistory() {
  const lists = useLiveQuery(() => db.quizes.toArray());

  if (!lists) return null;

  return (
    <div>
      {lists.map((item) => (
        <div key={item.id}>
          <Link
            aria-label="Table Columns"
            isExternal
            href={`https://www.ei-navi.jp/dictionary/content/${item.from_message}/`}
          >
            {item.from_message}
          </Link>
        </div>
      ))}
    </div>
  );
}
