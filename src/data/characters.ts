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
  downloadUrl?: string; // ✅ เพิ่มฟิลด์นี้
  patterns: Pattern[];
}

export const categories: Category[] = [
  {
    slug: "%E0%B8%9C%E0%B8%A5%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B8%82%E0%B8%AD%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B2",
    name: "ปลั๊กไฟตามสั่ง B2B",
    patterns: [
      {
        id: "Agriculture",
        name: "การเกษตร",
        detail: "การเกษตร",
        img: "/Oem/agriculture/agriculture-1.jpg",
        products: [
          { name: "Agriculture 1", img: "/Oem/agriculture/agriculture-1.jpg" },
          { name: "Agriculture 1", img: "/Oem/agriculture/agriculture-2.jpg" },
          { name: "Agriculture 2", img: "/Oem/agriculture/agriculture-3.jpg" },
          { name: "Agriculture 3", img: "/Oem/agriculture/agriculture-4.jpg" },
        ],
      },
      {
        id: "technology",
        name: "เทคโนโลยี",
        img: "/Oem/technology/technology-1.jpg",
        products: [
          { name: "technology 1", img: "/Oem/technology/technology-1.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-2.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-3.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-4.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-5.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-6.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-7.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-8.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-9.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-10.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-11.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-12.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-13.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-14.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-15.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-16.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-17.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-18.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-19.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-20.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-21.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-22.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-23.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-24.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-25.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-26.jpg" },
          { name: "technology 1", img: "/Oem/technology/technology-27.jpg" },


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
    slug: "catalog",
    name: "ดาวน์โหลดแคตตาล็อก",
    downloadUrl: "/files/catalog.pdf",  // ✅ เพิ่มบรรทัดนี้
    patterns: [],
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
          { name: "Back-to-school 5", img: "/seasonal/Back-to-school/back-to-school-6.jpg" },

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
        img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-01.jpg",
        products: [
          { name: "Have-a-nice-Fall 1", img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-03.jpg" },
          { name: "Have-a-nice-Fall 2", img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-04.jpg" },
          { name: "Have-a-nice-Fall 3", img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-05.jpg" },
          { name: "Have-a-nice-Fall 4", img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-06.jpg" },
          { name: "Have-a-nice-Fall 5", img: "/seasonal/Have-a-nice-Fall/BG-Template 3-1-07.jpg" },

        ],
      },
      {
        id: "Hop-to-Prosperity",
        name: "Hop to Prosperity",
        detail: "ลายเริ่มต้นปีใหม่",
        detailProducts: "เริ่มต้นปีใหม่ไฟแรง เฮงรับตรุษจีนกับปลั๊กลายมงคลลิมิตเต็ด",
        img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-01.jpg",
        products: [
          { name: "Hop-to-Prosperity 1", img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-02.jpg" },
          { name: "Hop-to-Prosperity 2", img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-03.jpg" },
          { name: "Hop-to-Prosperity 3", img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-04.jpg" },
          { name: "Hop-to-Prosperity 4", img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-05.jpg" },
          { name: "Hop-to-Prosperity 5", img: "/seasonal/Hop-to-Prosperity/Hop-to-prosperity-06.jpg" },
        ],
      },
      {
        id: "Next-Level-Christmas",
        name: "Next Level Christmas",
        detail: "ลายคริสมาสมาเยียน",
        detailProducts: "งานนี้คลองเปรมไม่เหงา เพราะหมู่เฮามีซานต้ามาเยือน บอกเลย โก่ง ตึง ตึง นะหนมน้า",
        img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-01.jpg",
        products: [
          { name: "Next-Level-Christmas 1", img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-02.jpg" },
          { name: "Next-Level-Christmas 2", img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-03.jpg" },
          { name: "Next-Level-Christmas 3", img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-04.jpg" },
          { name: "Next-Level-Christmas 4", img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-05.jpg" },
          { name: "Next-Level-Christmas 5", img: "/seasonal/Next-Level-Christmas/Next Level Chrisstmas-06.jpg" },
        ],
      },
      {
        id: "Santa-Mafia",
        name: "Santa Mafia",
        detail: "ลายมาเฟียซานต้า",
        detailProducts: "ลืมคริสมาสที่คุณเคยเห็นไปได้เลย ซานต้ามาเฟีย ที่นี่ ที่เดียว Limited Edition เฉพาะช่วงคริสมาสนี้เท่านั้น",
        img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it1.jpg",
        products: [
          { name: "Santa-Mafia 1", img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it2.jpg" },
          { name: "Santa-Mafia 2", img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it3.jpg" },
          { name: "Santa-Mafia 3", img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it4.jpg" },
          { name: "Santa-Mafia 4", img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it5.jpg" },
          { name: "Santa-Mafia 5", img: "/seasonal/Santa-Mafia/It's-Christmas-Ain't-it6.jpg" },
        ],
      },
      {
        id: "Spooky-Halloween",
        name: "Spooky Halloween",
        detail: "ลายวันฮาโลวีนอันน่าขนลุก",
        detailProducts: "Fright but Fun คืนนี้หลอนให้สุด แล้วสนุกให้เต็ม หลอนแบบชิคๆ สนุกแบบคิวท์ๆ ฮาโลวีนนี้จัดเต็ม",
        img: "/seasonal/Spooky-Halloween/Template2-1.jpg",
        products: [
          { name: "Spooky-Halloween 1", img: "/seasonal/Spooky-Halloween/Template2-2.jpg" },
          { name: "Spooky-Halloween 2", img: "/seasonal/Spooky-Halloween/Template2-03.jpg" },
          { name: "Spooky-Halloween 3", img: "/seasonal/Spooky-Halloween/Template2-04.jpg" },
          { name: "Spooky-Halloween 4", img: "/seasonal/Spooky-Halloween/Template2-05.jpg" },
          { name: "Spooky-Halloween 5", img: "/seasonal/Spooky-Halloween/Template2-06.jpg" },
        ],
      },
      {
        id: "Summer-of-Love",
        name: "Summer of Love",
        detail: "ลายฤดูร้อนแห่งความรัก",
        detailProducts: "เติมพลังไม่ขาดตอน ให้ร้อนรัก แดดแรงแค่ไหนก็ไม่กลัวด้วยปลั๊กไฟซัมเมอร์",
        img: "/seasonal/Summer-of-Love/summer of love-01.jpg",
        products: [
          { name: "DSummer-of-Love 1", img: "/seasonal/Summer-of-Love/summer of love-02.jpg" },
          { name: "DSummer-of-Love 2", img: "/seasonal/Summer-of-Love/summer of love-03.jpg" },
          { name: "DSummer-of-Love 3", img: "/seasonal/Summer-of-Love/summer of love-04.jpg" },
          { name: "DSummer-of-Love 4", img: "/seasonal/Summer-of-Love/summer of love-05.jpg" },
          { name: "DSummer-of-Love 5", img: "/seasonal/Summer-of-Love/summer of love-06.jpg" },

        ],
      },
      {
        id: "Trick-or-Treat",
        name: "Trick or Treat",
        detail: "ลายคืนวันฮาโลวีนหลอกหรือเลี้ยง",
        detailProducts: "เติมพลังไม่ขาดตอน ให้ร้อนรัก แดดแรงแค่ไหนก็ไม่กลัวด้วยปลั๊กไฟซัมเมอร์",
        img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-01.jpg",
        products: [
          { name: "Trick-or-Treat 1", img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-02.jpg" },
          { name: "Trick-or-Treat 2", img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-03.jpg" },
          { name: "Trick-or-Treat 3", img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-04.jpg" },
          { name: "Trick-or-Treat 4", img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-05.jpg" },
          { name: "Trick-or-Treat 5", img: "/seasonal/Trick-or-Treat/Cat Hallo Ween-06.jpg" },

        ],
      },
    ],
  },

  {
    slug: "fun-fantasy",
    name: "FUN FANTASY",
    patterns: [
      {
        id: "Meow-fruit",
        name: "Meow Fruit",
        detail: "ลายผลไม้เหมียว",
        detailProducts: "ถ้าคุณคือทาสที่มองไปทางไหนก็เจอแต่เจ้าเหมียว...คุณมาถูกทางแล้ว! ปลั๊ก All Cats are made of Fruits...คุณอะ ทำถึง! เพราะถ้าไม่รักจริง...จะมองเห็นน้องแมวในผลไม้ได้ยังไง!",
        img: "/fantasy/Meow-fruit/Meow-fruit-1.jpg",
        products: [
          { name: "Meow-fruit 1", img: "/fantasy/Meow-fruit/Meow-fruit-2.jpg" },
          { name: "Meow-fruit 2", img: "/fantasy/Meow-fruit/Meow-fruit-3.jpg" },
          { name: "Meow-fruit 3", img: "/fantasy/Meow-fruit/Meow-fruit-4.jpg" },
          { name: "Meow-fruit 4", img: "/fantasy/Meow-fruit/Meow-fruit-5.jpg" },
          { name: "Meow-fruit 5", img: "/fantasy/Meow-fruit/Meow-fruit-6.jpg" },

        ],
      },
      {
        id: "Cute-Mermaid",
        name: "Cute Mermaid",
        detail: "ลายเงือกน้อย",
        detailProducts: "เงือกน้อยคอยรัก",
        img: "/fantasy/Cute-Mermaid/Cute-Mermaid-1.jpg",
        products: [
          { name: "Cute-Mermaid 1", img: "/fantasy/Cute-Mermaid/Cute-Mermaid-2.jpg" },
          { name: "Cute-Mermaid 2", img: "/fantasy/Cute-Mermaid/Cute-Mermaid-3.jpg" },
          { name: "Cute-Mermaid 3", img: "/fantasy/Cute-Mermaid/Cute-Mermaid-4.jpg" },
          { name: "Cute-Mermaid 4", img: "/fantasy/Cute-Mermaid/Cute-Mermaid-5.jpg" },
          { name: "Cute-Mermaid 5", img: "/fantasy/Cute-Mermaid/Cute-Mermaid-6.jpg" },

        ],
      },
      {
        id: "Dream-park",
        name: "Dream Park",
        detail: "ลายสวนสนุก",
        detailProducts: "สวนสนุกแห่งความฝัน",
        img: "/fantasy/Dream-park/Dream-park-1.jpg",
        products: [
          { name: "Dream-park 1", img: "/fantasy/Dream-park/Dream-park-2.jpg" },
          { name: "Dream-park 2", img: "/fantasy/Dream-park/Dream-park-3.jpg" },
          { name: "Dream-park 3", img: "/fantasy/Dream-park/Dream-park-4.jpg" },
          { name: "Dream-park 4", img: "/fantasy/Dream-park/Dream-park-5.jpg" },
          { name: "Dream-park 5", img: "/fantasy/Dream-park/Dream-park-6.jpg" },

        ],
      },
      {
        id: "Galaxy-Watcher",
        name: "Galaxy Watcher",
        detail: "ลายกาแลคซี่",
        detailProducts: "-",
        img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-1.png",
        products: [
          { name: "Galaxy-Watcher 1", img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-2.png" },
          { name: "Galaxy-Watcher 2", img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-3.png" },
          { name: "Galaxy-Watcher 3", img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-4.png" },
          { name: "Galaxy-Watcher 4", img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-5.png" },
          { name: "Galaxy-Watcher 5", img: "/fantasy/Galaxy-Watcher/Galaxy-Watcher-6.png" },
        ],
      },
      {
        id: "Just-a-cute-Duck",
        name: "Just a cute Duck",
        detail: "ลายเป็ดน้อย",
        detailProducts: "-",
        img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-1.jpg",
        products: [
          { name: "Just-a-cute-Duck 1", img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-2.jpg" },
          { name: "Just-a-cute-Duck 2", img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-3.jpg" },
          { name: "Just-a-cute-Duck 3", img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-4.jpg" },
          { name: "Just-a-cute-Duck 4", img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-5.jpg" },
          { name: "Just-a-cute-Duckr 5", img: "/fantasy/Just-a-cute-Duck/Just-a-cute-Duck-6.jpg" },

        ],
      },

      {
        id: "Lost-in-Space",
        name: "Lost in Space",
        detail: "ลาย Lost in Space",
        detailProducts: "-",
        img: "/fantasy/Lost-in-Space/Lost-in-Space-1.jpg",
        products: [
          { name: "Lost-in-Space 1", img: "/fantasy/Lost-in-Space/Lost-in-Space-2.jpg" },
          { name: "Lost-in-Space 2", img: "/fantasy/Lost-in-Space/Lost-in-Space-3.jpg" },
          { name: "Lost-in-Space 3", img: "/fantasy/Lost-in-Space/Lost-in-Space-4.jpg" },
          { name: "Lost-in-Space 4", img: "/fantasy/Lost-in-Space/Lost-in-Space-5.jpg" },

        ],
      },

      {
        id: "Magical-Moment",
        name: "Magical Moment",
        detail: "ลาย Magical Moment",
        detailProducts: "-",
        img: "/fantasy/Magical-Moment/Magical-Moment-1.jpg",
        products: [
          { name: "Magical-Moment 1", img: "/fantasy/Magical-Moment/Magical-Moment-2.jpg" },
          { name: "Magical-Moment 2", img: "/fantasy/Magical-Moment/Magical-Moment-3.jpg" },
          { name: "Magical-Moment 3", img: "/fantasy/Magical-Moment/Magical-Moment-4.jpg" },
          { name: "Magical-Moment 4", img: "/fantasy/Magical-Moment/Magical-Moment-5.jpg" },
          { name: "Magical-Moment 5", img: "/fantasy/Magical-Moment/Magical-Moment-6.jpg" },

        ],
      },

      {
        id: "MoMo-and-the-panguin-gang",
        name: "MoMo and the panguin gang",
        detail: "ลาย MoMo and the panguin gang",
        detailProducts: "-",
        img: "/fantasy/MoMo/MoMo-1.jpg",
        products: [
          { name: "MoMo 1", img: "/fantasy/MoMo/MoMo-2.jpg" },
          { name: "MoMo 2", img: "/fantasy/MoMo/MoMo-3.jpg" },
          { name: "MoMo 3", img: "/fantasy/MoMo/MoMo-4.jpg" },
          { name: "MoMo 4", img: "/fantasy/MoMo/MoMo-5.jpg" },
          { name: "MoMo 5", img: "/fantasy/MoMo/MoMo-6.jpg" },

        ],
      },

      {
        id: "One-night-with-meteer-shower",
        name: "One night with meteer shower",
        detail: "ลาย One night with meteer shower",
        detailProducts: "-",
        img: "/fantasy/One-night/One-night-1.jpg",
        products: [
          { name: "One-night 1", img: "/fantasy/One-night/One-night-2.jpg" },
          { name: "One-night 2", img: "/fantasy/One-night/One-night-3.jpg" },
          { name: "One-night 3", img: "/fantasy/One-night/One-night-4.jpg" },
          { name: "One-night 4", img: "/fantasy/One-night/One-night-5.jpg" },
          { name: "One-night 5", img: "/fantasy/One-night/One-night-6.jpg" },

        ],
      },

      {
        id: "Red-Riding-Hood",
        name: "Red Riding Hood",
        detail: "ลาย Red Riding Hood",
        detailProducts: "-",
        img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-1.jpg",
        products: [
          { name: "Red-Riding-Hood 1", img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-2.jpg" },
          { name: "Red-Riding-Hood 2", img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-3.jpg" },
          { name: "Red-Riding-Hood 3", img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-4.jpg" },
          { name: "Red-Riding-Hood 4", img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-5.jpg" },
          { name: "Red-Riding-Hood 5", img: "/fantasy/Red-Riding-Hood/Red-Riding-Hood-6.jpg" },

        ],
      },

      {
        id: "The-Ocean-Odyssey",
        name: "The Ocean Odyssey",
        detail: "ลาย The Ocean Odyssey",
        detailProducts: "-",
        img: "/fantasy/The-Ocean/The-Ocean-Odyssey-1.jpg",
        products: [
          { name: "The-Ocean-Odyssey 1", img: "/fantasy/The-Ocean/The-Ocean-Odyssey-2.jpg" },
          { name: "The-Ocean-Odyssey 2", img: "/fantasy/The-Ocean/The-Ocean-Odyssey-3.jpg" },
          { name: "The-Ocean-Odyssey 3", img: "/fantasy/The-Ocean/The-Ocean-Odyssey-4.jpg" },
          { name: "The-Ocean-Odyssey 4", img: "/fantasy/The-Ocean/The-Ocean-Odyssey-5.jpg" },
          { name: "The-Ocean-Odyssey 5", img: "/fantasy/The-Ocean/The-Ocean-Odyssey-6.jpg" },

        ],
      },
    ],
  },

  {
    slug: "otaku",
    name: "OTAKU",
    patterns: [
      {
        id: "kai-ju",
        name: "Kai Ju",
        detail: "ลาย Kai Ju",
        detailProducts: "-",
        img: "/Otaku/kai-ju/kai-ju.jpg",
        products: [
          { name: "kai-ju 1", img: "/Otaku/kai-ju/kai-ju-2.jpg" },
          { name: "kai-ju 2", img: "/Otaku/kai-ju/kai-ju-3.jpg" },
          { name: "kai-ju 3", img: "/Otaku/kai-ju/kai-ju-4.jpg" },
          { name: "kai-ju 4", img: "/Otaku/kai-ju/kai-ju-5.jpg" },
          { name: "kai-ju 5", img: "/Otaku/kai-ju/kai-ju-6.jpg" },

        ],
      },

      {
        id: "red-giant",
        name: "Red giant",
        detail: "ลาย Red giant",
        detailProducts: "-",
        img: "/Otaku/red-giant/red-giant-1.jpg",
        products: [
          { name: "red-giant 1", img: "/Otaku/red-giant/red-giant-2.jpg" },
          { name: "red-giant 2", img: "/Otaku/red-giant/red-giant-3.jpg" },
          { name: "red-giant 3", img: "/Otaku/red-giant/red-giant-4.jpg" },
          { name: "red-giant 4", img: "/Otaku/red-giant/red-giant-5.jpg" },
          { name: "red-giant 4", img: "/Otaku/red-giant/red-giant-6.jpg" },

        ],
      },

      {
        id: "Rising-Sun",
        name: "Rising Sun",
        detail: "ลาย Rising Sun",
        detailProducts: "-",
        img: "/Otaku/Rising-Sun/Rising-Sun-1.jpg",
        products: [
          { name: "Rising-Sun 1", img: "/Otaku/Rising-Sun/Rising-Sun-2.jpg" },
          { name: "Rising-Sun 2", img: "/Otaku/Rising-Sun/Rising-Sun-3.jpg" },
          { name: "Rising-Sun 3", img: "/Otaku/Rising-Sun/Rising-Sun-4.jpg" },
          { name: "Rising-Sun 4", img: "/Otaku/Rising-Sun/Rising-Sun-5.jpg" },

        ],
      },

      {
        id: "Shushi",
        name: "Shushi",
        detail: "ลาย Shushi",
        detailProducts: "-",
        img: "/Otaku/Shushi/Shushi-1.jpg",
        products: [
          { name: "Shushi 1", img: "/Otaku/Shushi/Shushi-2.jpg" },
          { name: "Shushi 2", img: "/Otaku/Shushi/Shushi-3.jpg" },
          { name: "Shushi 3", img: "/Otaku/Shushi/Shushi-4.jpg" },
          { name: "Shushi 4", img: "/Otaku/Shushi/Shushi-5.jpg" },
          { name: "Shushi 5", img: "/Otaku/Shushi/Shushi-6.jpg" },

        ],
      },

      {
        id: "Shushi-meow",
        name: "Shushi Meow",
        detail: "ลาย Shushi",
        detailProducts: "-",
        img: "/Otaku/Shushi-meow/Shushi-meow-1.jpg",
        products: [
          { name: "Shushi-meow 1", img: "/Otaku/Shushi-meow/Shushi-meow-2.jpg" },
          { name: "Shushi-meow 2", img: "/Otaku/Shushi-meow/Shushi-meow-3.jpg" },
          { name: "Shushi-meow 3", img: "/Otaku/Shushi-meow/Shushi-meow-4.jpg" },
          { name: "Shushi-meow 4", img: "/Otaku/Shushi-meow/Shushi-meow-5.jpg" },
          { name: "Shushi-meow 5", img: "/Otaku/Shushi-meow/Shushi-meow-6.jpg" },

        ],
      },


    ],
  },

  {
    slug: "mutelu",
    name: "MUTELU",
    patterns: [
      {
        id: "Cai-Shen-Ye",
        name: "Cai Shen Ye",
        detail: "ลาย Cai Shen Ye",
        detailProducts: "-",
        img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-1.jpg",
        products: [
          { name: "Cai-Shen-Ye 1", img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-2.jpg" },
          { name: "Cai-Shen-Ye 2", img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-3.jpg" },
          { name: "Cai-Shen-Ye 3", img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-4.jpg" },
          { name: "Cai-Shen-Ye 4", img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-5.jpg" },
          { name: "Cai-Shen-Ye 5", img: "/Mutelu/Cai-Shen-Ye/Cai-Shen-Ye-6.jpg" },

        ],
      },
      {
        id: "Fortune-cards",
        name: "Fortune cards",
        detail: "ลาย Fortune cards",
        detailProducts: "-",
        img: "/Mutelu/Fortune-cards/Fortune-cards-1.jpg",
        products: [
          { name: "Fortune-cards 1", img: "/Mutelu/Fortune-cards/Fortune-cards-2.jpg" },
          { name: "Fortune-cards 2", img: "/Mutelu/Fortune-cards/Fortune-cards-3.jpg" },
          { name: "Fortune-cards 3", img: "/Mutelu/Fortune-cards/Fortune-cards-4.jpg" },
          { name: "Fortune-cards 4", img: "/Mutelu/Fortune-cards/Fortune-cards-5.jpg" },
          { name: "Fortune-cards 5", img: "/Mutelu/Fortune-cards/Fortune-cards-6.jpg" },

        ],
      },
      {
        id: "Ganesha2",
        name: "Ganesha2",
        detail: "ลาย Ganesha2",
        detailProducts: "-",
        img: "/Mutelu/Ganesha2/Ganesha2-1.jpg",
        products: [
          { name: "Ganesha2 1", img: "/Mutelu/Ganesha2/Ganesha2-2.jpg" },
          { name: "Ganesha2 2", img: "/Mutelu/Ganesha2/Ganesha2-3.jpg" },
          { name: "Ganesha2 3", img: "/Mutelu/Ganesha2/Ganesha2-4.jpg" },
          { name: "Ganesha2 4", img: "/Mutelu/Ganesha2/Ganesha2-5.jpg" },
          { name: "Ganesha2 5", img: "/Mutelu/Ganesha2/Ganesha2-6.jpg" },

        ],
      },

      {
        id: "Gypsy-cards",
        name: "Gypsy Cards",
        detail: "ลาย Gypsy-cards",
        detailProducts: "-",
        img: "/Mutelu/Gypsy-cards/Gypsy-cards-1.jpg",
        products: [
          { name: "Gypsy-cards 1", img: "/Mutelu/Gypsy-cards/Ganesha2-2.jpg" },
          { name: "Gypsy-cards 2", img: "/Mutelu/Gypsy-cards/Ganesha2-3.jpg" },
          { name: "Gypsy-cards 3", img: "/Mutelu/Gypsy-cards/Ganesha2-4.jpg" },
          { name: "Gypsy-cards 4", img: "/Mutelu/Gypsy-cards/Ganesha2-5.jpg" },
          { name: "Gypsy-cards 5", img: "/Mutelu/Gypsy-cards/Ganesha2-6.jpg" },

        ],
      },

      {
        id: "Lord-Ganesha-v1",
        name: "Lord Ganesha v1",
        detail: "ลาย Lord Ganesha v1",
        detailProducts: "-",
        img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-1.jpg",
        products: [
          { name: "Lord-Ganeshav1 1", img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-2.jpg" },
          { name: "Lord-Ganeshav1 2", img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-3.jpg" },
          { name: "Lord-Ganeshav1 3", img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-4.jpg" },
          { name: "Lord-Ganeshav1 4", img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-5.jpg" },
          { name: "Lord-Ganeshav1 5", img: "/Mutelu/Lord-Ganeshav1/Lord-Ganesha-v1-6.jpg" },

        ],
      },

      {
        id: "Lord-Ganesha-v2",
        name: "Lord Ganesha v2",
        detail: "ลาย Lord Ganesha v2",
        detailProducts: "-",
        img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-1.jpg",
        products: [
          { name: "Lord-Ganesha-v2 1", img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-2.jpg" },
          { name: "Lord-Ganesha-v2 2", img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-3.jpg" },
          { name: "Lord-Ganesha-v2 3", img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-4.jpg" },
          { name: "Lord-Ganesha-v2 4", img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-5.jpg" },
        ],
      },

      {
        id: "Love-Card",
        name: "Love Card",
        detail: "ลาย Love Card",
        detailProducts: "-",
        img: "/Mutelu/Love-Card/Love-Card-1.jpg",
        products: [
          { name: "Love-Card 1", img: "/Mutelu/Love-Card/Love-Card-2.jpg" },
          { name: "Love-Card 2", img: "/Mutelu/Love-Card/Love-Card-3.jpg" },
          { name: "Love-Card 3", img: "/Mutelu/Love-Card/Love-Card-4.jpg" },
          { name: "Love-Card 4", img: "/Mutelu/Love-Card/Love-Card-5.jpg" },
          { name: "Love-Card 5", img: "/Mutelu/Love-Card/Love-Card-6.jpg" },

        ],
      },

      {
        id: "Men-Love-Card",
        name: "Men Love Card",
        detail: "ลาย Men Love Card",
        detailProducts: "-",
        img: "/Mutelu/Men-Love-Card/Love-Card-1.jpg",
        products: [
          { name: "Men-Love-Card 1", img: "/Mutelu/Men-Love-Card/Love-Card-2.jpg" },
          { name: "Men-Love-Card 2", img: "/Mutelu/Men-Love-Card/Love-Card-3.jpg" },
          { name: "Men-Love-Card 3", img: "/Mutelu/Men-Love-Card/Love-Card-4.jpg" },
          { name: "Men-Love-Card 4", img: "/Mutelu/Men-Love-Card/Love-Card-5.jpg" },
          { name: "Men-Love-Card 5", img: "/Mutelu/Men-Love-Card/Love-Card-6.jpg" },

        ],
      },

      {
        id: "Thao-Wessuwan",
        name: "Thao Wessuwan",
        detail: "ลาย Thao Wessuwan",
        detailProducts: "-",
        img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-1.jpg",
        products: [
          { name: "Thao-Wessuwan 1", img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-2.jpg" },
          { name: "Thao-Wessuwan 2", img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-3.jpg" },
          { name: "Thao-Wessuwan 3", img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-4.jpg" },
          { name: "Thao-Wessuwan 4", img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-5.jpg" },
          { name: "Thao-Wessuwan 5", img: "/Mutelu/Thao-Wessuwan/Thao-Wessuwan-6.jpg" },

        ],
      },

      {
        id: "Walth-Money",
        name: "Walth Money",
        detail: "ลาย Walth Money",
        detailProducts: "-",
        img: "/Mutelu/Walth-Money/Walth-Money-1.jpg",
        products: [
          { name: "Walth-Money 1", img: "/Mutelu/Walth-Money/Walth-Money-2.jpg" },
          { name: "Walth-Money 2", img: "/Mutelu/Walth-Money/Walth-Money-3.jpg" },
          { name: "Walth-Money 3", img: "/Mutelu/Walth-Money/Walth-Money-4.jpg" },
          { name: "Walth-Money 4", img: "/Mutelu/Walth-Money/Walth-Money-5.jpg" },
          { name: "Walth-Money 5", img: "/Mutelu/Walth-Money/Walth-Money-6.jpg" },

        ],
      },

    ],
  },

];
