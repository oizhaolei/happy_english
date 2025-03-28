"use client";

import { Key, useCallback, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Prisma } from "@prisma/client";
import { Progress } from "@heroui/progress";
import { Link } from "@heroui/link";
const columns = [
  {
    key: "from_message",
    label: "Word",
  },
  {
    key: "score",
    label: "SCORE",
  },
];

export const VocabularyResultTable = () => {
  const [rows, setRows] = useState<Prisma.VocabularyTestResultGetPayload<{}>[]>(
    [],
  );

  useEffect(() => {
    (async () => {
      const uid = localStorage.getItem("unique_identity");

      if (uid) {
        const res = await fetch(`/api/vocabulary_test_result?uid=${uid}`);

        const res_json = await res.json();

        setRows(res_json);
      }
    })();
  }, []);

  const renderCell = useCallback(
    (item: Prisma.VocabularyTestResultGetPayload<{}>, columnKey: Key) => {
      switch (columnKey) {
        case "from_message":
          return (
            <Link
              aria-label="Table Columns"
              isExternal
              href={`https://www.ei-navi.jp/dictionary/content/${item.from_message.toLocaleLowerCase()}/`}
            >
              {item.from_message}
            </Link>
          );

        case "score":
          return (
            <Progress aria-label="Table Columns" size="sm" value={item.score} />
          );
        default:
          return "-";
      }
    },
    [],
  );

  return (
    <Table
      aria-label="Example table with dynamic content"
      selectionMode="single"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
