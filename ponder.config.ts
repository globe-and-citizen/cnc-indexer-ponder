import { parseAbiItem } from "abitype";
import { createConfig, factory } from "ponder";

import { http } from "viem";

import { CashRemunerationEIP712Abi } from "./abis/CashRemunerationEIP712";
import { FactoryBeaconAbi } from "./abis/FactoryBeacon";

export default createConfig({
  networks: {
    hardhat: {
      chainId: 31337,
      transport: http(process.env.PONDER_RPC_URL_31337),
    },
  },
  contracts: {
    CashRemunerationFactoryBeacon: {
      network: "hardhat",
      abi: FactoryBeaconAbi,
      address: "0x59b670e9fA9D0A427751Af201D676719a970857b",
      startBlock: 0,
    },
    CashRemunerationEIP712: {
      network: "hardhat",
      abi: CashRemunerationEIP712Abi,
      address: factory({
        address: "0x59b670e9fA9D0A427751Af201D676719a970857b",
        event: parseAbiItem(
          "event BeaconProxyCreated(address indexed proxy, address indexed deployer)"
        ),
        parameter: "proxy",
      }),
      startBlock: 0,
    },
  },
});
