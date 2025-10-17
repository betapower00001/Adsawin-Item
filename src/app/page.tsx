"use client";

import CharacterGrid from "../Component/CharacterGrid";
import { Container } from "react-bootstrap";

const characters = [
  { name: "ปลั๊กไฟตามสั่งB2B", img: "/MENU-ICON.png" },
  { name: "CATALOG", img: "/MENU-ICON-CATALOG.png" },
  { name: "SEASONAL", img: "/characters/skullpanda.png" },
  { name: "MUTELU", img: "/characters/crybaby.png" },
  { name: "FASHION&TREND", img: "/characters/hirono.png" },
  { name: "FUN&FANTASY", img: "/characters/twinkle.png" },
  { name: "AUTHENTIC THAI", img: "/characters/hacipupu.png" },
  { name: "OTAKU", img: "/characters/pucky.png" },
  { name: "FOOD", img: "/characters/zsiga.png" },
  { name: "PETS", img: "/characters/dimoo.png" },
];

export default function Page() {
  return (
    <Container className="page">
      <CharacterGrid characters={characters} />
    </Container>
  );
}
