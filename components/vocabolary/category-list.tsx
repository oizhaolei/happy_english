"use client";

import { Listbox, ListboxItem } from "@heroui/listbox";
import { ReactNode } from "react";

const ListboxWrapper = ({ children }: { children: ReactNode }) => (
  <div className="w-full max-w-[260px] border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);
export const VocabolaryList = ({ list }: { list: { category: string }[] }) => {
  return (
    <ListboxWrapper>
      <Listbox aria-label="Actions" topContent="Choose Grade Please:">
        {list.map((voca) => (
          <ListboxItem
            key={voca.category}
            href={`/vocabulary/${voca.category}`}
          >
            {voca.category}
          </ListboxItem>
        ))}
      </Listbox>
    </ListboxWrapper>
  );
};
