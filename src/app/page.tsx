"use client";

import CharacterGrid from "../Component/CharacterGrid";
import { Container } from "react-bootstrap";

const characters = [
  { name: "มูเตลู", img: "/112521.jpg" },
  { name: "THE MONSTERS", img: "/characters/monsters.png" },
  { name: "SKULLPANDA", img: "/characters/skullpanda.png" },
  { name: "CRYBABY", img: "/characters/crybaby.png" },
  { name: "Hirono", img: "/characters/hirono.png" },
  { name: "Twinkle Twinkle", img: "/characters/twinkle.png" },
  { name: "HACIPUPU", img: "/characters/hacipupu.png" },
  { name: "PUCKY", img: "/characters/pucky.png" },
  { name: "Zsiga", img: "/characters/zsiga.png" },
  { name: "DIMOO", img: "/characters/dimoo.png" },
  { name: "WARNER BAROS.", img: "/characters/warner.png" },
  { name: "DISNEY", img: "/characters/disney.png" },
  { name: "UNIVERSAL", img: "/characters/universal.png" },
  { name: "ALL", img: "/characters/all.png" },
];

export default function Page() {
  return (
    <Container className="page">
      <CharacterGrid characters={characters} />
    </Container>
  );
}
