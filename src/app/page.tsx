"use client";

import CharacterGrid from "../Component/CharacterGrid";
import { Container } from "react-bootstrap";

const characters = [

  {
    name: "SEASONAL",
    img: "/MENU-ICON-SEASONAL.png",
    video: "/MENU-ICON-SEASONAL.mp4",
  },
  {
    name: "FUN&FANTASY",
    img: "/MENU-ICON-Fantasy.png",
    video: "/Menu-fan.mp4",
  },
  {
    name: "OTAKU",
    img: "/MENU-ICON-Otaku.png",
    video: "/MENU-ICON-Otaku.mp4",
  },
  {
    name: "MUTELU",
    img: "/MENU-ICON.jpg",
    video: "/MENU-ICON-MU.mp4",
  },
  {
    name: "AUTHENTIC THAI",
    img: "/MENU-ICON-Thai.png",
    video: "/MENU-ICON-Thai.mp4",
  },
  {
    name: "FOOD",
    img: "/MENU-ICON-Food.png",
    video: "/MENU-ICON-Food.mp4",
  },
  {
    name: "FASHION&TREND",
    img: "/MENU-ICON-Fashion.png",
    video: "/MENU-ICON-FASHION-TREND.mp4",
  },
  {
    name: "PETS",
    img: "/MENU-ICON-PET.jpg",
    video: "/MENU-ICON-PET.mp4",
  },
  {
    name: "ปลั๊กไฟตามสั่งB2B",
    img: "/MENU-ICON-CATALOG.png",
  },
  {
    name: "CATALOG",
    img: "/MENU-ICON-CATALOG.jpg",
    video: "/videos/catalog.mp4",
  },
];

export default function Page() {
  return (
    <Container className="page">
      <CharacterGrid characters={characters} />
    </Container>
  );
}
