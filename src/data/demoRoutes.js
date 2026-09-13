// Illustrative geometry, not a routable or current road dataset. Text values are locale keys.
export const routes = {
  "balanced": {
    "label": "m_5386ea5db8",
    "distance": "m_0e10dc6f65",
    "gravel": "68%",
    "confidence": 92,
    "time": "2:24",
    "accent": "#f0542d",
    "path": "M54 398 C116 352 123 285 206 279 C291 273 318 351 392 320 C458 292 448 199 528 180 C614 158 661 238 738 193 C796 160 815 99 898 82",
    "altPath": "M54 398 C126 370 157 319 226 320 C309 322 338 388 412 352 C477 320 483 239 551 215 C630 187 688 249 756 214 C819 181 833 111 898 82",
    "risks": [
      {
        "x": 204,
        "y": 280,
        "level": "review",
        "label": "Покрытие не указано",
        "id": "balanced-1",
        "details": {
          "title": "m_374fc48bfd",
          "surface": "m_dc12bec5d7",
          "access": "m_07297fa94a",
          "explanation": "m_7b2eeda23c",
          "recommendation": "m_1b55180676"
        }
      },
      {
        "x": 529,
        "y": 180,
        "level": "warn",
        "label": "ground · проверить",
        "id": "balanced-2",
        "details": {
          "title": "m_778bfcfbcf",
          "surface": "m_209d11ceb1",
          "access": "m_07297fa94a",
          "explanation": "m_ecebc85da1",
          "recommendation": "m_69a456c4e1"
        }
      },
      {
        "x": 738,
        "y": 194,
        "level": "safe",
        "label": "gravel · подтверждено",
        "id": "balanced-3",
        "details": {
          "title": "m_06aa37298d",
          "surface": "m_1df7b3d338",
          "access": "m_601382adca",
          "explanation": "m_4e8ef3c192",
          "recommendation": "m_956eee1222"
        }
      }
    ]
  },
  "scenic": {
    "label": "m_cba4b4a55c",
    "distance": "m_15ed323af8",
    "gravel": "81%",
    "confidence": 84,
    "time": "2:46",
    "accent": "#3c6df0",
    "path": "M54 398 C102 329 167 370 208 300 C251 227 312 245 350 188 C394 120 460 145 508 220 C550 287 626 290 659 211 C686 145 751 130 783 181 C817 235 851 141 898 82",
    "altPath": "M54 398 C121 372 145 326 211 313 C290 297 321 352 388 323 C449 296 466 223 530 204 C612 179 664 248 741 213 C810 181 833 112 898 82",
    "risks": [
      {
        "x": 208,
        "y": 300,
        "level": "safe",
        "label": "forest track",
        "id": "scenic-1",
        "details": {
          "title": "m_06aa37298d",
          "surface": "m_1df7b3d338",
          "access": "m_601382adca",
          "explanation": "m_4e8ef3c192",
          "recommendation": "m_956eee1222"
        }
      },
      {
        "x": 350,
        "y": 188,
        "level": "warn",
        "label": "grade4 · медленно",
        "id": "scenic-2",
        "details": {
          "title": "m_778bfcfbcf",
          "surface": "m_209d11ceb1",
          "access": "m_07297fa94a",
          "explanation": "m_ecebc85da1",
          "recommendation": "m_69a456c4e1"
        }
      },
      {
        "x": 659,
        "y": 211,
        "level": "review",
        "label": "surface=missing",
        "id": "scenic-3",
        "details": {
          "title": "m_374fc48bfd",
          "surface": "m_dc12bec5d7",
          "access": "m_07297fa94a",
          "explanation": "m_7b2eeda23c",
          "recommendation": "m_1b55180676"
        }
      }
    ]
  },
  "safe": {
    "label": "m_b26cac1129",
    "distance": "m_ac27deb79b",
    "gravel": "54%",
    "confidence": 98,
    "time": "2:18",
    "accent": "#158367",
    "path": "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    "altPath": "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    "risks": [
      {
        "x": 221,
        "y": 344,
        "level": "safe",
        "label": "gravel · подтверждено",
        "id": "safe-1",
        "details": {
          "title": "m_06aa37298d",
          "surface": "m_1df7b3d338",
          "access": "m_601382adca",
          "explanation": "m_4e8ef3c192",
          "recommendation": "m_956eee1222"
        }
      },
      {
        "x": 567,
        "y": 221,
        "level": "safe",
        "label": "доступ разрешён",
        "id": "safe-2",
        "details": {
          "title": "m_06aa37298d",
          "surface": "m_1df7b3d338",
          "access": "m_601382adca",
          "explanation": "m_4e8ef3c192",
          "recommendation": "m_956eee1222"
        }
      },
      {
        "x": 766,
        "y": 196,
        "level": "safe",
        "label": "smoothness=good",
        "id": "safe-3",
        "details": {
          "title": "m_06aa37298d",
          "surface": "m_1df7b3d338",
          "access": "m_601382adca",
          "explanation": "m_4e8ef3c192",
          "recommendation": "m_956eee1222"
        }
      }
    ]
  }
};
