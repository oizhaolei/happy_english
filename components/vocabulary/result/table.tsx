"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Prisma } from "@prisma/client";
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

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
