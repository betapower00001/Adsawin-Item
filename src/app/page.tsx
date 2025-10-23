"use client";

import CharacterGrid from "../Component/CharacterGrid";
import { Container } from "react-bootstrap";

const characters = [
  {
    name: "ปลั๊กไฟตามสั่งB2B",
    img: "/MENU-ICON-CATALOG.png",
  },
  {
    name: "CATALOG",
    img: "/MENU-ICON-CATALOG.jpg",
    video: "/videos/catalog.mp4",
  },
  {
    name: "SEASONAL",
    img: "/MENU-ICON-SEASONAL.png",
    video: "/MenuMp4.mp4",
  },
  {
    name: "MUTELU",
    img: "/MENU-ICON.jpg",
    video: "/MenuMp4.mp4",
  },
  {
    name: "FASHION&TREND",
    img: "/MENU-ICON-FASHION-TREND.jpg",
    video: "/videos/fashion.mp4",
  },
  {
    name: "FUN&FANTASY",
    img: "/MENU-ICON-Fashion.png",
    video: "/videos/funfantasy.mp4",
  },
  {
    name: "AUTHENTIC THAI",
    img: "/MENU-ICON-Thai.png",
    video: "/videos/thai.mp4",
  },
  {
    name: "OTAKU",
    img: "/MENU-ICON-Otaku.png",
    video: "/videos/otaku.mp4",
  },
  {
    name: "FOOD",
    img: "/MENU-ICON-Food.png",
    video: "/videos/food.mp4",
  },
  {
    name: "PETS",
    img: "/MENU-ICON-PET.jpg",
    video: "/videos/pets.mp4",
  },
];

export default function Page() {
  return (
    <Container className="page">
      <CharacterGrid characters={characters} />
    </Container>
  );
}
