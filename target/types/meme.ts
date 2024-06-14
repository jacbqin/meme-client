export type Meme = {
  "version": "0.0.1",
  "name": "meme",
  "constants": [
    {
      "name": "MEME_SEED",
      "type": "string",
      "value": "\"MEME\""
    },
    {
      "name": "VALUT_SEED",
      "type": "string",
      "value": "\"Vault\""
    },
    {
      "name": "MINT_SEED",
      "type": "string",
      "value": "\"Mint\""
    }
  ],
  "instructions": [
    {
      "name": "initializeMeme",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeTo",
          "type": "publicKey"
        },
        {
          "name": "tokenLiquidityAmount",
          "type": "u64"
        },
        {
          "name": "tokenLaunchAmount",
          "type": "u64"
        },
        {
          "name": "buyFee",
          "type": "u64"
        },
        {
          "name": "createFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMeme",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeTo",
          "type": "publicKey"
        },
        {
          "name": "tokenLiquidityAmount",
          "type": "u64"
        },
        {
          "name": "tokenLaunchAmount",
          "type": "u64"
        },
        {
          "name": "buyFee",
          "type": "u64"
        },
        {
          "name": "createFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "launchAmount",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "userMaxBuyAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "create",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emergencyWithdrawSol",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, receive sol"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emergencyWithdrawToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, receive sol"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "memeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "feeTo",
            "type": "publicKey"
          },
          {
            "name": "tokenLiquidityAmount",
            "type": "u64"
          },
          {
            "name": "tokenLaunchAmount",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u64"
          },
          {
            "name": "createFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creater",
            "type": "publicKey"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "solLaunchAmount",
            "type": "u64"
          },
          {
            "name": "userMaxBuyAmount",
            "type": "u64"
          },
          {
            "name": "tokenLiquidityAmount",
            "type": "u64"
          },
          {
            "name": "tokenLaunchAmount",
            "type": "u64"
          },
          {
            "name": "tokenSoldAmount",
            "type": "u64"
          },
          {
            "name": "solAmount",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidTokenPrice",
      "msg": "invalid token price"
    },
    {
      "code": 6001,
      "name": "LaunchActivityFinished",
      "msg": "launch activity finished"
    }
  ]
};

export const IDL: Meme = {
  "version": "0.0.1",
  "name": "meme",
  "constants": [
    {
      "name": "MEME_SEED",
      "type": "string",
      "value": "\"MEME\""
    },
    {
      "name": "VALUT_SEED",
      "type": "string",
      "value": "\"Vault\""
    },
    {
      "name": "MINT_SEED",
      "type": "string",
      "value": "\"Mint\""
    }
  ],
  "instructions": [
    {
      "name": "initializeMeme",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeTo",
          "type": "publicKey"
        },
        {
          "name": "tokenLiquidityAmount",
          "type": "u64"
        },
        {
          "name": "tokenLaunchAmount",
          "type": "u64"
        },
        {
          "name": "buyFee",
          "type": "u64"
        },
        {
          "name": "createFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "updateMeme",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "feeTo",
          "type": "publicKey"
        },
        {
          "name": "tokenLiquidityAmount",
          "type": "u64"
        },
        {
          "name": "tokenLaunchAmount",
          "type": "u64"
        },
        {
          "name": "buyFee",
          "type": "u64"
        },
        {
          "name": "createFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "mint",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "launchAmount",
          "type": "u64"
        },
        {
          "name": "duration",
          "type": "u64"
        },
        {
          "name": "userMaxBuyAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "create",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadataAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "symbol",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "buy",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultSolAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeTo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tokenAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emergencyWithdrawSol",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "solVaultAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, receive sol"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "emergencyWithdrawToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "memeAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "recipientAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK, receive sol"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "memeAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "feeTo",
            "type": "publicKey"
          },
          {
            "name": "tokenLiquidityAmount",
            "type": "u64"
          },
          {
            "name": "tokenLaunchAmount",
            "type": "u64"
          },
          {
            "name": "buyFee",
            "type": "u64"
          },
          {
            "name": "createFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "mintAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creater",
            "type": "publicKey"
          },
          {
            "name": "duration",
            "type": "u64"
          },
          {
            "name": "solLaunchAmount",
            "type": "u64"
          },
          {
            "name": "userMaxBuyAmount",
            "type": "u64"
          },
          {
            "name": "tokenLiquidityAmount",
            "type": "u64"
          },
          {
            "name": "tokenLaunchAmount",
            "type": "u64"
          },
          {
            "name": "tokenSoldAmount",
            "type": "u64"
          },
          {
            "name": "solAmount",
            "type": "u64"
          },
          {
            "name": "tokenPrice",
            "type": "u64"
          },
          {
            "name": "createTime",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidTokenPrice",
      "msg": "invalid token price"
    },
    {
      "code": 6001,
      "name": "LaunchActivityFinished",
      "msg": "launch activity finished"
    }
  ]
};
