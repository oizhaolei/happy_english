"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Prisma } from "@prisma/client";

export const VocabolaryTable = ({
  list,
}: {
  list: Prisma.VocabularyGetPayload<{}>[];
}) => {
  return (
    <Table
      aria-label="Vocabularies"
      topContent={
        <span className="text-default-400 text-small">
          Total {list.length} records
        </span>
      }
    >
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>TEXT</TableColumn>
        <TableColumn>TO</TableColumn>
      </TableHeader>
      <TableBody>
        {list.map((voca) => (
          <TableRow key={voca.id}>
            <TableCell>{voca.id}</TableCell>
            <TableCell>{voca.from_message}</TableCell>
            <TableCell>{voca.to_message}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
