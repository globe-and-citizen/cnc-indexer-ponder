import { onchainTable, primaryKey } from "ponder";

export const cashRemuneration = onchainTable(
  "cash_remuneration_transactions",
  (t) => ({
    contractAddress: t.text().notNull(),
    from: t.text().notNull(),
    to: t.text().notNull(),
    hash: t.text().notNull(),
    date: t.timestamp().notNull(),
    type: t.text().notNull(),
    amount: t.text().notNull().default("0"),
    amountInEth: t.text().default("0"),
  }),
  (table) => ({
    pk: primaryKey({ columns: [table.contractAddress, table.hash] }),
  })
);
