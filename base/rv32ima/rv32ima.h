#ifndef __RV32IMA_H__
#define __RV32IMA_H__

#include <stdint.h>

// This stores the first 5 bits of `opcode` (opcode is 7 bits long, however the first two are always `1`)
// Order:   [4:2] = A
//          [6:5] = B
//                   0bBBAAA00
typedef enum cpu_opcodes_t {
  OPC_LOAD     = 0b0000011,
  OPC_STORE    = 0b0100011,
  OPC_MADD     = 0b1000011,
  OPC_BRANCH   = 0b1100011,
  OPC_LOADFP   = 0b0000111,
  OPC_STOREFP  = 0b0100111,
  OPC_MSUB     = 0b1000111,
  OPC_JALR     = 0b1100111,
  OPC_CUSTOM0  = 0b0001011,
  OPC_CUSTOM1  = 0b0101011,
  OPC_NMSUB    = 0b1001011,
  OPC_RESRVD   = 0b1101011,
  OPC_MISCMEM  = 0b0001111,
  OPC_AMO      = 0b0101111,
  OPC_NMADD    = 0b1001111,
  OPC_JAL      = 0b1101111,
  OPC_OPIMM    = 0b0010011,
  OPC_OP       = 0b0110011,
  OPC_OPFP     = 0b1010011,
  OPC_SYSTEM   = 0b1110011,
  OPC_AUIPC    = 0b0010111,
  OPC_LUI      = 0b0110111,
  OPC_OP_V     = 0b1010111,
  OPC_OP_VE    = 0b1110111,
  OPC_OP_IMM32 = 0b0011011,
  OPC_OP32     = 0b0111011
} rv32_cpu_opcodes_t;

typedef struct cpu_state {
  uint32_t x[32], pc;
} rv32_cpu_state_t;

#endif /** __RV32IMA_H__ */
