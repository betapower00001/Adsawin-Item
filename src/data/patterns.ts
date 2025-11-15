export interface PatternItem {
  id: string;
  name: string;
  img: string;
}

export interface PatternGroup {
  [key: string]: PatternItem[];
}

const patterns: PatternGroup = {
  typeA: [
    { id: "p1", name: "ลาย 1", img: "/patterns/typeA/p1.png" },
    { id: "p2", name: "ลาย 2", img: "/patterns/typeA/p2.png" },
    { id: "p3", name: "ลาย 3", img: "/patterns/typeA/p3.png" },
    { id: "p4", name: "ลาย 4", img: "/patterns/typeA/p4.png" }
  ],

  typeB: [
    { id: "p1", name: "ลาย 1", img: "/patterns/typeB/p1.png" },
    { id: "p2", name: "ลาย 2", img: "/patterns/typeB/p2.png" }
  ],

  typeC: [
    { id: "p1", name: "ลาย 1", img: "/patterns/typeC/p1.png" },
    { id: "p2", name: "ลาย 2", img: "/patterns/typeC/p2.png" }
  ]
};

export default patterns;
