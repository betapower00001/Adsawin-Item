"use client";

import CharacterGrid from "../Component/CharacterGrid";
import { Container } from "react-bootstrap";

const characters = [
  { name: "ปลั๊กไฟตามสั่งB2B", img: "/MENU-ICON-CATALOG.png" },
  { name: "CATALOG", img: "/MENU-ICON-CATALOG.jpg" },
  { name: "SEASONAL", img: "/MENU-ICON-SEASONAL.png" },
  { name: "MUTELU", img: "/MENU-ICON.png" },
  { name: "FASHION&TREND", img: "/MENU-ICON-TREND.png" },
  { name: "FUN&FANTASY", img: "/MENU-ICON-Fashion.png" },
  { name: "AUTHENTIC THAI", img: "/MENU-ICON-Thai.png" },
  { name: "OTAKU", img: "/MENU-ICON-Otaku.png" },
  { name: "FOOD", img: "/MENU-ICON-Food.png" },
  { name: "PETS", img: "/characters/dimoo.png" },
];

export default function Page() {
  return (
    <Container className="page">
      <CharacterGrid characters={characters} />
    </Container>
  );
}
