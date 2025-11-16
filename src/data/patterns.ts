export interface PatternItem {
  id: string;
  name: string;
  img: string;      // รูปลายเดี่ยว
  preview: string;  // รูปลายที่ใส่ปลั๊กแล้ว
}

export interface PlugPatterns {
  [plugType: string]: PatternItem[];
}

export const patterns: PlugPatterns = {
  universal: [
    {
      id: "back-to-school-1",
      name: "Back to School 1",
      img: "/seasonal/Back-to-school/back-to-school-1.jpg",
      preview: "/plugs/universal/Back-to-school/back-to-school-1.png",
    },
    {
      id: "back-to-school-3",
      name: "Back to School 3",
      img: "/seasonal/Back-to-school/back-to-school-3.jpg",
      preview: "/plugs/universal/Back-to-school/back-to-school-3.png",
    },
    {
      id: "back-to-school-4",
      name: "Back to School 4",
      img: "/seasonal/Back-to-school/back-to-school-4.jpg",
      preview: "/plugs/universal/Back-to-school/back-to-school-4.png",
    },
  ],

  thai: [
    {
      id: "back-to-school-1",
      name: "Back to School 1",
      img: "/seasonal/Back-to-school/back-to-school-1.jpg",
      preview: "/plugs/thai/Back-to-school/back-to-school-1.png",
    },
    {
      id: "back-to-school-3",
      name: "Back to School 3",
      img: "/seasonal/Back-to-school/back-to-school-3.jpg",
      preview: "/plugs/thai/Back-to-school/back-to-school-3.png",
    },
    {
      id: "back-to-school-4",
      name: "Back to School 4",
      img: "/seasonal/Back-to-school/back-to-school-4.jpg",
      preview: "/plugs/thai/Back-to-school/back-to-school-4.png",
    },
  ],

  eu: [
    {
      id: "back-to-school-1",
      name: "Back to School 1",
      img: "/seasonal/Back-to-school/back-to-school-1.jpg",
      preview: "/plugs/eu/Back-to-school/back-to-school-1.png",
    },
    {
      id: "back-to-school-3",
      name: "Back to School 3",
      img: "/seasonal/Back-to-school/back-to-school-3.jpg",
      preview: "/plugs/eu/Back-to-school/back-to-school-3.png",
    },
    {
      id: "back-to-school-4",
      name: "Back to School 4",
      img: "/seasonal/Back-to-school/back-to-school-4.jpg",
      preview: "/plugs/eu/Back-to-school/back-to-school-4.png",
    },
  ],

  us: [
    {
      id: "back-to-school-1",
      name: "Back to School 1",
      img: "/seasonal/Back-to-school/back-to-school-1.jpg",
      preview: "/plugs/us/Back-to-school/back-to-school-1.png",
    },
    {
      id: "back-to-school-3",
      name: "Back to School 3",
      img: "/seasonal/Back-to-school/back-to-school-3.jpg",
      preview: "/plugs/us/Back-to-school/back-to-school-3.png",
    },
    {
      id: "back-to-school-4",
      name: "Back to School 4",
      img: "/seasonal/Back-to-school/back-to-school-4.jpg",
      preview: "/plugs/us/Back-to-school/back-to-school-4.png",
    },
  ],

  uk: [
    {
      id: "back-to-school-1",
      name: "Back to School 1",
      img: "/seasonal/Back-to-school/back-to-school-1.jpg",
      preview: "/plugs/uk/Back-to-school/back-to-school-1.png",
    },
    {
      id: "back-to-school-3",
      name: "Back to School 3",
      img: "/seasonal/Back-to-school/back-to-school-3.jpg",
      preview: "/plugs/uk/Back-to-school/back-to-school-3.png",
    },
    {
      id: "back-to-school-4",
      name: "Back to School 4",
      img: "/seasonal/Back-to-school/back-to-school-4.jpg",
      preview: "/plugs/uk/Back-to-school/back-to-school-4.png",
    },
  ],
};

export default patterns;
