// db.ts
import Dexie, { type EntityTable } from "dexie";

interface Quiz {
  id: number;
  from_message: string;
  score: number;
}

const db = new Dexie("QuizsDatabase") as Dexie & {
  quizes: EntityTable<
    Quiz,
    "id" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  quizes: "++id, from_message, score", // primary key "id" (for the runtime!)
});

export type { Quiz };
export { db };
