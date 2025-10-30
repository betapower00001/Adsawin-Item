// src/data/characters.ts

export interface Product {
  name: string;
  img: string;
}

export interface Pattern {
  id: string;
  name: string;
  img: string;
  detail?: string;          // สำหรับหน้า pattern list
  detailProducts?: string;  // สำหรับหน้า pattern page
  products: Product[];
}

export interface Category {
  slug: string;
  name: string;
  detail?: string;
  patterns: Pattern[];
}

export const categories: Category[] = [
  {
    slug: "%E0%B8%9C%E0%B8%A5%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B2",
    name: "ปลั๊กไฟตามสั่ง B2B",
    patterns: [
      {
        id: "pink-sweet",
        name: "ลายมูเตรู",
        detail: "ลายเสริมดวง เรียกทรัพย์ เหมาะกับสายมูตัวจริง",
        img: "/1_0.png",
        products: [
          { name: "Crybaby Ver.1", img: "/2_0.jpg" },
          { name: "Crybaby Ver.2", img: "/3_0.jpg" },
          { name: "Crybaby Ver.3", img: "/4_0.jpg" },
          { name: "Crybaby Ver.4", img: "/5_0.jpg" },
        ],
      },
      {
        id: "black-white",
        name: "ลายยักษ์เกี่ยวทรัพย์",
        img: "/1-(2).jpg",
        products: [
          { name: "Crybaby Black", img: "/PicTest-1.jpg" },
          { name: "Crybaby Black", img: "/PicTest-2.jpg" },
          { name: "Crybaby Black", img: "/PicTest-3.jpg" },
        ],
      },
      {
        id: "black-white2",
        name: "ลายเทพร่ำรวย",
        img: "/Rolling In Money BG White-03.jpg",
        products: [
          { name: "Crybaby Black", img: "/01-Lost-in-Space Template-03.jpg" },
        ],
      },
      {
        id: "black-white3",
        name: "ลายพระพิฆเนศ",
        img: "/ads_nongneth-02.jpg",
        products: [
          { name: "Crybaby Black", img: "/01-Lost-in-Space Template-03.jpg" },
        ],
      },
    ],
  },
  {
    slug: "seasonal",
    name: "SEASONAL",
    patterns: [
      {
        id: "Back-to-school",
        name: "Back to school",
        detail: "ลายกลับห้องเรียนหน้า",
        detailProducts: "กลับห้องเรียนพร้อมไฟเต็มแม็กซ์ ปลั๊กลายพิเศษที่มีแค่เปิดเทอมนี้เท่านั้น",
        img: "/seasonal/Back-to-school/back-to-school-1.jpg",
        products: [
          { name: "Back-to-school 1", img: "/seasonal/Back-to-school/back-to-school-2.jpg" },
          { name: "Back-to-school 2", img: "/seasonal/Back-to-school/back-to-school-3.jpg" },
          { name: "Back-to-school 3", img: "/seasonal/Back-to-school/back-to-school-4.jpg" },
          { name: "Back-to-school 4", img: "/seasonal/Back-to-school/back-to-school-5.jpg" },
        ],
      },
      {
        id: "Christmas",
        name: "Christmas",
        detail: "ลายคริสมาส",
        detailProducts: "กลับห้องเรียนพร้อมไฟเต็มแม็กซ์ ปลั๊กลายพิเศษที่มีแค่เปิดเทอมนี้เท่านั้น",
        img: "/Christmas-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Have-a-nice-Fall",
        name: "Have a nice Fall",
        detail: "ลายฤดูร้อนลาลับ",
        detailProducts: "เมื่อฤดูร้อนลาลับ ป่าใหญ่ก็เปลี่ยนสี ฝูงสัตว์ออกมาต้อนรับสายลมเย็นในงานเลี้ยง",
        img: "/Have-a-nice-Fall-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Hop-to-Prosperity",
        name: "Hop to Prosperity",
        detail: "ลายเริ่มต้นปีใหม่",
        detailProducts: "เริ่มต้นปีใหม่ไฟแรง เฮงรับตรุษจีนกับปลั๊กลายมงคลลิมิตเต็ด",
        img: "/Hop-to-Prosperity-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Next-Level-Christmas",
        name: "Next Level Christmas",
        detail: "ลายคริสมาสมาเยียน",
        detailProducts: "งานนี้คลองเปรมไม่เหงา เพราะหมู่เฮามีซานต้ามาเยือน บอกเลย โก่ง ตึง ตึง นะหนมน้า",
        img: "/Next-Level-Christmas-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Santa-Mafia",
        name: "Santa Mafia",
        detail: "ลายมาเฟียซานต้า",
        detailProducts: "ลืมคริสมาสที่คุณเคยเห็นไปได้เลย ซานต้ามาเฟีย ที่นี่ ที่เดียว Limited Edition เฉพาะช่วงคริสมาสนี้เท่านั้น",
        img: "/Santa-Mafia-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Spooky-Halloween",
        name: "Spooky Halloween",
        detail: "ลายวันฮาโลวีนอันน่าขนลุก",
        detailProducts: "Fright but Fun คืนนี้หลอนให้สุด แล้วสนุกให้เต็ม หลอนแบบชิคๆ สนุกแบบคิวท์ๆ ฮาโลวีนนี้จัดเต็ม",
        img: "/Spooky-Halloween-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Summer-of-Love",
        name: "Summer of Love",
        detail: "ลายฤดูร้อนแห่งความรัก",
        detailProducts: "เติมพลังไม่ขาดตอน ให้ร้อนรัก แดดแรงแค่ไหนก็ไม่กลัวด้วยปลั๊กไฟซัมเมอร์",
        img: "/Summer-of-Love-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
      {
        id: "Trick-or-Treat",
        name: "Trick or Treat",
        detail: "ลายคืนวันฮาโลวีนหลอกหรือเลี้ยง",
        detailProducts: "เติมพลังไม่ขาดตอน ให้ร้อนรัก แดดแรงแค่ไหนก็ไม่กลัวด้วยปลั๊กไฟซัมเมอร์",
        img: "/Trick-or-Treat-1.jpg",
        products: [
          { name: "Dimoo Night Sky 1", img: "/characters/dimoo_nightsky1.png" },
          { name: "Dimoo Night Sky 2", img: "/characters/dimoo_nightsky2.png" },
        ],
      },
    ],
  },
];
