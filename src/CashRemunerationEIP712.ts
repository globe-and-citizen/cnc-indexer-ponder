import { ponder } from "ponder:registry";
import { cashRemuneration } from "ponder:schema";
import { formatEther } from "viem";

ponder.on("CashRemunerationEIP712:Withdraw", async ({ event, context }) => {
  await context.db.insert(cashRemuneration).values({
    contractAddress: event.log.address,
    from: event.args.withdrawer,
    to: event.log.address,
    hash: event.transaction.hash,
    date: new Date(Number(event.block.timestamp) * 1000),
    type: "Withdraw",
    amount: event.args.amount.toString(),
    amountInEth: formatEther(event.args.amount),
  });
});

ponder.on("CashRemunerationEIP712:Deposited", async ({ event, context }) => {
  await context.db.insert(cashRemuneration).values({
    contractAddress: event.log.address,
    from: event.args.depositor,
    to: event.log.address,
    hash: event.transaction.hash,
    date: new Date(Number(event.block.timestamp) * 1000),
    type: "Deposited",
    amount: event.args.amount.toString(),
    amountInEth: formatEther(event.args.amount),
  });
});
