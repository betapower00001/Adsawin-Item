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
        id: "Energy",
        name: "Energy",
        detail: "Energy",
        img: "/Oem/Energy/1.jpg",
        products: [
          { name: "Energy 1", img: "/Oem/Energy/1.jpg" },
          { name: "Energy 2", img: "/Oem/Energy/2.jpg" },
          { name: "Energy 3", img: "/Oem/Energy/3.jpg" },
          { name: "Energy 4", img: "/Oem/Energy/4.jpg" },
        ],
      },

      {
        id: "Health",
        name: "Health",
        img: "/Oem/Health/1.jpg",
        products: [
          { name: "Health 1", img: "/Oem/Health/1.jpg" },
          { name: "Health 2", img: "/Oem/Health/2.jpg" },
          { name: "Health 3", img: "/Oem/Health/3.jpg" },
          { name: "Health 4", img: "/Oem/Health/4.jpg" },
          { name: "Health 5", img: "/Oem/Health/5.jpg" },
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
          { name: "Lord-Ganesha-v2 5", img: "/Mutelu/Lord-Ganeshav2/Lord-Ganesha-v2-6.jpg" },

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

  {
    slug: "authentic-thai",
    name: "AUTHENTIC THAI",
    patterns: [
      {
        id: "Elephant-San",
        name: "Elephant San",
        detail: "ลาย Elephant-San",
        detailProducts: "-",
        img: "/Authentic-thai/Elephant-San/Elephant-San-1.jpg",
        products: [
          { name: "Elephant-San 1", img: "/Authentic-thai/Elephant-San/Elephant-San-2.jpg" },
          { name: "Elephant-San 2", img: "/Authentic-thai/Elephant-San/Elephant-San-3.jpg" },
          { name: "Elephant-San 3", img: "/Authentic-thai/Elephant-San/Elephant-San-4.jpg" },
          { name: "Elephant-San 4", img: "/Authentic-thai/Elephant-San/Elephant-San-5.jpg" },
          { name: "Elephant-San 5", img: "/Authentic-thai/Elephant-San/Elephant-San-6.jpg" },

        ],
      },
      {
        id: "End-of-month",
        name: "End of month",
        detail: "ลาย End of month",
        detailProducts: "-",
        img: "/Authentic-thai/End-of-month/end-1.jpg",
        products: [
          { name: "End-of-month 1", img: "/Authentic-thai/End-of-month/end-2.jpg" },
          { name: "End-of-month 2", img: "/Authentic-thai/End-of-month/end-3.jpg" },
          { name: "End-of-month 3", img: "/Authentic-thai/End-of-month/end-4.jpg" },
          { name: "End-of-month 4", img: "/Authentic-thai/End-of-month/end-5.jpg" },
          { name: "End-of-month 5", img: "/Authentic-thai/End-of-month/end-6.jpg" },

        ],
      },
      {
        id: "KrungThep",
        name: "KrungThep",
        detail: "ลาย KrungThep",
        detailProducts: "-",
        img: "/Authentic-thai/KrungThep/KrungThep-1.jpg",
        products: [
          { name: "KrungThep 1", img: "/Authentic-thai/KrungThep/KrungThep-2.jpg" },
          { name: "KrungThep 2", img: "/Authentic-thai/KrungThep/KrungThep-3.jpg" },
          { name: "KrungThep 3", img: "/Authentic-thai/KrungThep/KrungThep-4.jpg" },
          { name: "KrungThep 4", img: "/Authentic-thai/KrungThep/KrungThep-5.jpg" },
          { name: "KrungThep 5", img: "/Authentic-thai/KrungThep/KrungThep-6.jpg" },

        ],
      },
      {
        id: "Mango-Rice",
        name: "Mango Rice",
        detail: "ลาย Mango Rice",
        detailProducts: "-",
        img: "/Authentic-thai/Mango-Rice/Mango-Rice-1.jpg",
        products: [
          { name: "Mango-Rice 1", img: "/Authentic-thai/Mango-Rice/Mango-Rice-2.jpg" },
          { name: "Mango-Rice 2", img: "/Authentic-thai/Mango-Rice/Mango-Rice-3.jpg" },
          { name: "Mango-Rice 3", img: "/Authentic-thai/Mango-Rice/Mango-Rice-4.jpg" },
          { name: "Mango-Rice 4", img: "/Authentic-thai/Mango-Rice/Mango-Rice-5.jpg" },
          { name: "Mango-Rice 5", img: "/Authentic-thai/Mango-Rice/Mango-Rice-6.jpg" },

        ],
      },

      {
        id: "Monk",
        name: "Monk",
        detail: "ลาย Monk",
        detailProducts: "-",
        img: "/Authentic-thai/Monk/Monk-1.jpg",
        products: [
          { name: "Monk 1", img: "/Authentic-thai/Monk/Monk-2.jpg" },
          { name: "Monk 2", img: "/Authentic-thai/Monk/Monk-3.jpg" },
          { name: "Monk 3", img: "/Authentic-thai/Monk/Monk-4.jpg" },
          { name: "Monk 4", img: "/Authentic-thai/Monk/Monk-5.jpg" },
          { name: "Monk 5", img: "/Authentic-thai/Monk/Monk-6.jpg" },

        ],
      },

      {
        id: "Papaya-Pok-Pok",
        name: "Papaya Pok Pok",
        detail: "ลาย Papaya Pok Pok",
        detailProducts: "-",
        img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-1.jpg",
        products: [
          { name: "Papaya-Pok-Pok 1", img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-2.jpg" },
          { name: "Papaya-Pok-Pok 2", img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-3.jpg" },
          { name: "Papaya-Pok-Pok 4", img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-5.jpg" },
          { name: "Papaya-Pok-Pok 5", img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-6.jpg" },
          { name: "Papaya-Pok-Pok 3", img: "/Authentic-thai/Papaya-Pok-Pok/Papaya-4.jpg" },

        ],
      },

      {
        id: "Ramayana",
        name: "Ramayana",
        detail: "ลาย Ramayana",
        detailProducts: "-",
        img: "/Authentic-thai/Ramayana/Ramayana-1.png",
        products: [
          { name: "Ramayana 1", img: "/Authentic-thai/Ramayana/Ramayana-2.png" },
          { name: "Ramayana 2", img: "/Authentic-thai/Ramayana/Ramayana-3.png" },
          { name: "Ramayana 3", img: "/Authentic-thai/Ramayana/Ramayana-4.png" },
          { name: "Ramayana 4", img: "/Authentic-thai/Ramayana/Ramayana-5.png" },

        ],
      },

      {
        id: "Songkran",
        name: "Songkran",
        detail: "ลาย Songkran",
        detailProducts: "-",
        img: "/Authentic-thai/Songkran/Songkran-1.jpg",
        products: [
          { name: "Songkran 1", img: "/Authentic-thai/Songkran/Songkran-2.jpg" },
          { name: "Songkran 2", img: "/Authentic-thai/Songkran/Songkran-3.jpg" },
          { name: "Songkran 3", img: "/Authentic-thai/Songkran/Songkran-4.jpg" },
          { name: "Songkran 4", img: "/Authentic-thai/Songkran/Songkran-5.jpg" },
          { name: "Songkran 5", img: "/Authentic-thai/Songkran/Songkran-6.jpg" },

        ],
      },

      {
        id: "Spooky-Thai-Ghost",
        name: "Spooky Thai Ghost",
        detail: "ลาย Spooky Thai Ghost",
        detailProducts: "-",
        img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-1.jpg",
        products: [
          { name: "Spooky-Thai-Ghost 1", img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-2.jpg" },
          { name: "Spooky-Thai-Ghost 2", img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-3.jpg" },
          { name: "Spooky-Thai-Ghost 3", img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-4.jpg" },
          { name: "Spooky-Thai-Ghost 4", img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-5.jpg" },
          { name: "Spooky-Thai-Ghost 5", img: "/Authentic-thai/Spooky-Thai-Ghost/Spooky-6.jpg" },

        ],
      },

      {
        id: "Thai-Floating-mk",
        name: "Thai Floating mk",
        detail: "ลาย Thai Floating mk",
        detailProducts: "-",
        img: "/Authentic-thai/Thai-Floating-mk/Floating-1.jpg",
        products: [
          { name: "Thai-Floating-mk 1", img: "/Authentic-thai/Thai-Floating-mk/Floating-2.jpg" },
          { name: "Thai-Floating-mk 2", img: "/Authentic-thai/Thai-Floating-mk/Floating-3.jpg" },
          { name: "Thai-Floating-mk 3", img: "/Authentic-thai/Thai-Floating-mk/Floating-4.jpg" },
          { name: "Thai-Floating-mk 4", img: "/Authentic-thai/Thai-Floating-mk/Floating-5.jpg" },
          { name: "Thai-Floating-mk 5", img: "/Authentic-thai/Thai-Floating-mk/Floating-6.jpg" },

        ],
      },

      {
        id: "Tom-Yum",
        name: "Tom Yum",
        detail: "ลาย Tom Yum",
        detailProducts: "-",
        img: "/Authentic-thai/Tom-Yum/Tom-Yum-1.jpg",
        products: [
          { name: "Tom-Yum 1", img: "/Authentic-thai/Tom-Yum/Tom-Yum-2.jpg" },
          { name: "Tom-Yum 2", img: "/Authentic-thai/Tom-Yum/Tom-Yum-3.jpg" },
          { name: "Tom-Yum 3", img: "/Authentic-thai/Tom-Yum/Tom-Yum-4.jpg" },
          { name: "Tom-Yum 4", img: "/Authentic-thai/Tom-Yum/Tom-Yum-5.jpg" },
          { name: "Tom-Yum 5", img: "/Authentic-thai/Tom-Yum/Tom-Yum-6.jpg" },

        ],
      },

      {
        id: "Tuk-Tuk",
        name: "Tuk Tuk",
        detail: "ลาย Tuk Tuk",
        detailProducts: "-",
        img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-1.jpg",
        products: [
          { name: "Tuk-Tuk 1", img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-2.jpg" },
          { name: "Tuk-Tuk 2", img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-3.jpg" },
          { name: "Tuk-Tuk 3", img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-4.jpg" },
          { name: "Tuk-Tuk 4", img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-5.jpg" },
          { name: "Tuk-Tuk 5", img: "/Authentic-thai/Tuk-Tuk/Tuk-Tuk-6.jpg" },

        ],
      },


    ],
  },

  {
    slug: "food",
    name: "Food",
    patterns: [
      {
        id: "Candy-Addict",
        name: "Candy Addict",
        detail: "ลาย Candy Addict",
        detailProducts: "-",
        img: "/Food/Candy-Addict/Candy-Addict-1.jpg",
        products: [
          { name: "Candy-Addict 1", img: "/Food/Candy-Addict/Candy-Addict-2.jpg" },
          { name: "Candy-Addict 2", img: "/Food/Candy-Addict/Candy-Addict-3.jpg" },
          { name: "Candy-Addict 3", img: "/Food/Candy-Addict/Candy-Addict-4.jpg" },
          { name: "Candy-Addict 4", img: "/Food/Candy-Addict/Candy-Addict-5.jpg" },
          { name: "Candy-Addict 5", img: "/Food/Candy-Addict/Candy-Addict-6.jpg" },

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
        id: "Fat-Or-Bold",
        name: "Fat Or Bold",
        detail: "ลาย Fat Or Bold",
        detailProducts: "-",
        img: "/Food/Fat-Or-Bold/Fat-Or-Bold-1.jpg",
        products: [
          { name: "Fat-Or-Bold 1", img: "/Food/Fat-Or-Bold/Fat-Or-Bold-2.jpg" },
          { name: "Fat-Or-Bold 2", img: "/Food/Fat-Or-Bold/Fat-Or-Bold-3.jpg" },
          { name: "Fat-Or-Bold 3", img: "/Food/Fat-Or-Bold/Fat-Or-Bold-4.jpg" },
          { name: "Fat-Or-Bold 4", img: "/Food/Fat-Or-Bold/Fat-Or-Bold-5.jpg" },
          { name: "Fat-Or-Bold 5", img: "/Food/Fat-Or-Bold/Fat-Or-Bold-6.jpg" },

        ],
      },
      {
        id: "In-Carbs-We-Trust",
        name: "In Carbs We Trust",
        detail: "ลาย In Carbs We Trust",
        detailProducts: "-",
        img: "/Food/In-Carbs-We-Trust/Trust-1.jpg",
        products: [
          { name: "In-Carbs-We-Trust 1", img: "/Food/In-Carbs-We-Trust/Trust-2.jpg" },
          { name: "In-Carbs-We-Trust 2", img: "/Food/In-Carbs-We-Trust/Trust-3.jpg" },
          { name: "In-Carbs-We-Trust 3", img: "/Food/In-Carbs-We-Trust/Trust-4.jpg" },
          { name: "In-Carbs-We-Trust 4", img: "/Food/In-Carbs-We-Trust/Trust-5.jpg" },

        ],
      },


    ],
  },


  {
    slug: "fashion-trend",
    name: "FASHION TREND",
    patterns: [
      {
        id: "Blossom",
        name: "Blossom",
        detail: "ลาย Blossom",
        detailProducts: "-",
        img: "/Fashion-Trend/Blossom/Blossom-1.jpg",
        products: [
          { name: "Blossom 1", img: "/Fashion-Trend/Blossom/Blossom-2.jpg" },
          { name: "Blossom 2", img: "/Fashion-Trend/Blossom/Blossom-3.jpg" },
          { name: "Blossom 3", img: "/Fashion-Trend/Blossom/Blossom-4.jpg" },
          { name: "Blossom 4", img: "/Fashion-Trend/Blossom/Blossom-5.jpg" },
          { name: "Blossom 5", img: "/Fashion-Trend/Blossom/Blossom-6.jpg" },

        ],
      },
      {
        id: "Cute-Ghost",
        name: "Cute Ghost",
        detail: "ลาย Cute Ghost",
        detailProducts: "-",
        img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-1.jpg",
        products: [
          { name: "Cute-Ghost 1", img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-2.jpg" },
          { name: "Cute-Ghost 2", img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-3.jpg" },
          { name: "Cute-Ghost 3", img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-4.jpg" },
          { name: "Cute-Ghost 4", img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-5.jpg" },
          { name: "Cute-Ghost 5", img: "/Fashion-Trend/Cute-Ghost/Cute-Ghost-6.jpg" },

        ],
      },
      {
        id: "End-of-month",
        name: "End of month",
        detail: "ลาย End of month",
        detailProducts: "-",
        img: "/Fashion-Trend/End-of-month/End-of-month-1.jpg",
        products: [
          { name: "End-of-month 1", img: "/Fashion-Trend/End-of-month/End-of-month-2.jpg" },
          { name: "End-of-month 2", img: "/Fashion-Trend/End-of-month/End-of-month-3.jpg" },
          { name: "End-of-month 3", img: "/Fashion-Trend/End-of-month/End-of-month-4.jpg" },
          { name: "End-of-month 4", img: "/Fashion-Trend/End-of-month/End-of-month-5.jpg" },
          { name: "End-of-month 5", img: "/Fashion-Trend/End-of-month/End-of-month-6.jpg" },

        ],
      },
      {
        id: "GAME-OVER",
        name: "GAME OVER",
        detail: "ลาย GAME OVER",
        detailProducts: "-",
        img: "/Fashion-Trend/GAME-OVER/GAME-OVER-1.jpg",
        products: [
          { name: "GAME-OVER 1", img: "/Fashion-Trend/GAME-OVER/GAME-OVER-2.jpg" },
          { name: "GAME-OVER 2", img: "/Fashion-Trend/GAME-OVER/GAME-OVER-3.jpg" },
          { name: "GAME-OVER 3", img: "/Fashion-Trend/GAME-OVER/GAME-OVER-4.jpg" },
          { name: "GAME-OVER 4", img: "/Fashion-Trend/GAME-OVER/GAME-OVER-5.jpg" },
          { name: "GAME-OVER 5", img: "/Fashion-Trend/GAME-OVER/GAME-OVER-6.jpg" },

        ],
      },
      {
        id: "Graffiti",
        name: "Graffiti",
        detail: "ลาย Graffiti",
        detailProducts: "-",
        img: "/Fashion-Trend/Graffiti/Graffiti-1.jpg",
        products: [
          { name: "Graffiti 1", img: "/Fashion-Trend/Graffiti/Graffiti-2.jpg" },
          { name: "Graffiti 2", img: "/Fashion-Trend/Graffiti/Graffiti-3.jpg" },
          { name: "Graffiti 3", img: "/Fashion-Trend/Graffiti/Graffiti-4.jpg" },
          { name: "Graffiti 4", img: "/Fashion-Trend/Graffiti/Graffiti-5.jpg" },
          { name: "Graffiti 5", img: "/Fashion-Trend/Graffiti/Graffiti-6.jpg" },

        ],
      },
      {
        id: "Happy-in-Forest",
        name: "Happy in Forest",
        detail: "ลาย Happy in Forest",
        detailProducts: "-",
        img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-1.jpg",
        products: [
          { name: "Happy-in-Forest 1", img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-2.jpg" },
          { name: "Happy-in-Forest 2", img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-3.jpg" },
          { name: "Happy-in-Forest 3", img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-4.jpg" },
          { name: "Happy-in-Forest 4", img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-5.jpg" },
          { name: "Happy-in-Forest 5", img: "/Fashion-Trend/Happy-in-Forest/Happy-in-Forest-6.jpg" },

        ],
      },
      {
        id: "Happy-Life",
        name: "Happy Life",
        detail: "ลาย Happy Life",
        detailProducts: "-",
        img: "/Fashion-Trend/Happy-Life/Happy-Life-1.png",
        products: [
          { name: "Happy-Life 1", img: "/Fashion-Trend/Happy-Life/Happy-Life-2.png" },
          { name: "Happy-Life 2", img: "/Fashion-Trend/Happy-Life/Happy-Life-3.png" },
          { name: "Happy-Life 3", img: "/Fashion-Trend/Happy-Life/Happy-Life-4.png" },
          { name: "Happy-Life 4", img: "/Fashion-Trend/Happy-Life/Happy-Life-5.png" },
          { name: "Happy-Life 5", img: "/Fashion-Trend/Happy-Life/Happy-Life-6.png" },

        ],
      },
      {
        id: "Hygge",
        name: "Hygge",
        detail: "ลาย Hygge",
        detailProducts: "-",
        img: "/Fashion-Trend/Hygge/Hygge-1.jpg",
        products: [
          { name: "Hygge 1", img: "/Fashion-Trend/Hygge/Hygge-2.jpg" },
          { name: "Hygge 2", img: "/Fashion-Trend/Hygge/Hygge-3.jpg" },
          { name: "Hygge 3", img: "/Fashion-Trend/Hygge/Hygge-4.jpg" },
          { name: "Hygge 4", img: "/Fashion-Trend/Hygge/Hygge-5.jpg" },

        ],
      },

      {
        id: "LGBTQ",
        name: "LGBTQ",
        detail: "ลาย LGBTQ",
        detailProducts: "-",
        img: "/Fashion-Trend/LGBTQ/LGBTQ-1.jpg",
        products: [
          { name: "LGBTQ 1", img: "/Fashion-Trend/LGBTQ/LGBTQ-2.jpg" },
          { name: "LGBTQ 2", img: "/Fashion-Trend/LGBTQ/LGBTQ-3.jpg" },
          { name: "LGBTQ 3", img: "/Fashion-Trend/LGBTQ/LGBTQ-4.jpg" },
          { name: "LGBTQ 4", img: "/Fashion-Trend/LGBTQ/LGBTQ-5.jpg" },

        ],
      },

      {
        id: "Love-Wins",
        name: "Love-Wins",
        detail: "ลาย Love-Wins",
        detailProducts: "-",
        img: "/Fashion-Trend/Love-Wins/Love-Wins-1.jpg",
        products: [
          { name: "Love-Wins 1", img: "/Fashion-Trend/Love-Wins/Love-Wins-2.jpg" },
          { name: "Love-Wins 2", img: "/Fashion-Trend/Love-Wins/Love-Wins-3.jpg" },
          { name: "Love-Wins 3", img: "/Fashion-Trend/Love-Wins/Love-Wins-4.jpg" },
          { name: "Love-Wins 4", img: "/Fashion-Trend/Love-Wins/Love-Wins-5.jpg" },
          { name: "Love-Wins 5", img: "/Fashion-Trend/Love-Wins/Love-Wins-6.jpg" },

        ],
      },
      {
        id: "Narm-Laem",
        name: "Narm Laem",
        detail: "ลาย Narm Laem",
        detailProducts: "-",
        img: "/Fashion-Trend/Narm-Laem/Narm-Laem-1.jpg",
        products: [
          { name: "Narm-Laem 1", img: "/Fashion-Trend/Narm-Laem/Narm-Laem-2.jpg" },
          { name: "Narm-Laem 2", img: "/Fashion-Trend/Narm-Laem/Narm-Laem-3.jpg" },
          { name: "Narm-Laem 3", img: "/Fashion-Trend/Narm-Laem/Narm-Laem-4.jpg" },
          { name: "Narm-Laem 4", img: "/Fashion-Trend/Narm-Laem/Narm-Laem-5.jpg" },
          { name: "Narm-Laem 5", img: "/Fashion-Trend/Narm-Laem/Narm-Laem-6.jpg" },

        ],
      },
      {
        id: "Opulently-Peony",
        name: "Opulently Peony",
        detail: "ลาย Opulently Peony",
        detailProducts: "-",
        img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-1.jpg",
        products: [
          { name: "Opulently-Peony 1", img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-2.png" },
          { name: "Opulently-Peony 2", img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-3.png" },
          { name: "Opulently-Peony 3", img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-4.png" },
          { name: "Opulently-Peony 4", img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-5.png" },
          { name: "Opulently-Peony 5", img: "/Fashion-Trend/Opulently-Peony/Opulently-Peony-6.png" },

        ],
      },
      {
        id: "Pick-Up",
        name: "Pick Up",
        detail: "ลาย Pick Up",
        detailProducts: "-",
        img: "/Fashion-Trend/Pick-Up/Pick-Up-1.jpg",
        products: [
          { name: "Pick-Up 1", img: "/Fashion-Trend/Pick-Up/Pick-Up-2.jpg" },
          { name: "Pick-Up 2", img: "/Fashion-Trend/Pick-Up/Pick-Up-3.jpg" },
          { name: "Pick-Up 3", img: "/Fashion-Trend/Pick-Up/Pick-Up-4.jpg" },
          { name: "Pick-Up 4", img: "/Fashion-Trend/Pick-Up/Pick-Up-5.jpg" },
          { name: "Pick-Up 5", img: "/Fashion-Trend/Pick-Up/Pick-Up-6.jpg" },

        ],
      },
      {
        id: "Rock-Roll-FEV",
        name: "Rock & Roll FEV",
        detail: "ลาย Rock & Roll FEV",
        detailProducts: "-",
        img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-1.jpg",
        products: [
          { name: "Rock-Roll-FEV 1", img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-2.jpg" },
          { name: "Rock-Roll-FEV 2", img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-3.jpg" },
          { name: "Rock-Roll-FEV 3", img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-4.jpg" },
          { name: "Rock-Roll-FEV 4", img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-5.jpg" },
          { name: "Rock-Roll-FEV 5", img: "/Fashion-Trend/Rock-Roll-FEV/Rock-Roll-FEV-6.jpg" },

        ],
      },
      {
        id: "Salaryman-DL",
        name: "Salaryman DL",
        detail: "ลาย Salaryman DL",
        detailProducts: "-",
        img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-1.png",
        products: [
          { name: "Salaryman-DL 1", img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-2.png" },
          { name: "Salaryman-DL 2", img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-3.png" },
          { name: "Salaryman-DL 3", img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-4.png" },
          { name: "Salaryman-DL 4", img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-5.png" },
          { name: "Salaryman-DL 5", img: "/Fashion-Trend/Salaryman-DL/Salaryman-DL-6.png" },

        ],
      },
      {
        id: "Swim-with-me",
        name: "Swim with me",
        detail: "ลาย Swim with me",
        detailProducts: "-",
        img: "/Fashion-Trend/Swim-with-me/Swim-with-me-1.jpg",
        products: [
          { name: "Swim-with-me 1", img: "/Fashion-Trend/Swim-with-me/Swim-with-me-2.jpg" },
          { name: "Swim-with-me 2", img: "/Fashion-Trend/Swim-with-me/Swim-with-me-3.jpg" },
          { name: "Swim-with-me 3", img: "/Fashion-Trend/Swim-with-me/Swim-with-me-4.jpg" },
          { name: "Swim-with-me 4", img: "/Fashion-Trend/Swim-with-me/Swim-with-me-5.jpg" },
          { name: "Swim-with-me 5", img: "/Fashion-Trend/Swim-with-me/Swim-with-me-6.jpg" },

        ],
      },
      {
        id: "Toxic-Love",
        name: "Toxic Love",
        detail: "ลาย Toxic Love",
        detailProducts: "-",
        img: "/Fashion-Trend/Toxic-Love/Toxic-Love-1.jpg",
        products: [
          { name: "Toxic-Love 1", img: "/Fashion-Trend/Toxic-Love/Toxic-Love-2.jpg" },
          { name: "Toxic-Love 2", img: "/Fashion-Trend/Toxic-Love/Toxic-Love-3.jpg" },
          { name: "Toxic-Love 3", img: "/Fashion-Trend/Toxic-Love/Toxic-Love-4.jpg" },
          { name: "Toxic-Love 4", img: "/Fashion-Trend/Toxic-Love/Toxic-Love-5.jpg" },
          { name: "Toxic-Love 5", img: "/Fashion-Trend/Toxic-Love/Toxic-Love-6.jpg" },

        ],
      },
      {
        id: "Want-to-travel",
        name: "Want to travel",
        detail: "ลาย Want to travel",
        detailProducts: "-",
        img: "/Fashion-Trend/Want-to-travel/Want-to-travel-1.jpg",
        products: [
          { name: "Want-to-travel 1", img: "/Fashion-Trend/Want-to-travel/Want-to-travel-2.jpg" },
          { name: "Want-to-travel 2", img: "/Fashion-Trend/Want-to-travel/Want-to-travel-3.jpg" },
          { name: "Want-to-travel 3", img: "/Fashion-Trend/Want-to-travel/Want-to-travel-4.jpg" },
          { name: "Want-to-travel 4", img: "/Fashion-Trend/Want-to-travel/Want-to-travel-5.jpg" },
          { name: "Want-to-travel 5", img: "/Fashion-Trend/Want-to-travel/Want-to-travel-6.jpg" },

        ],
      },


    ],
  },



  {
    slug: "pets",
    name: "PETS",
    patterns: [
      {
        id: "black-cat",
        name: "black cat",
        detail: "ลาย black cat",
        detailProducts: "-",
        img: "/Pets/black-cat/black-cat-1.jpg",
        products: [
          { name: "black-cat 1", img: "/Pets/black-cat/black-cat-2.jpg" },
          { name: "black-cat 2", img: "/Pets/black-cat/black-cat-3.jpg" },
          { name: "black-cat 3", img: "/Pets/black-cat/black-cat-4.jpg" },
          { name: "black-cat 4", img: "/Pets/black-cat/black-cat-5.jpg" },

        ],
      },

      {
        id: "Bunny-Carrot",
        name: "Bunny Carrot",
        detail: "ลาย Bunny Carrot",
        detailProducts: "-",
        img: "/Pets/Bunny-Carrot/Bunny-Carrot-1.jpg",
        products: [
          { name: "Bunny-Carrot 1", img: "/Pets/Bunny-Carrot/Bunny-Carrot-2.jpg" },
          { name: "Bunny-Carrot 2", img: "/Pets/Bunny-Carrot/Bunny-Carrot-3.jpg" },
          { name: "Bunny-Carrot 3", img: "/Pets/Bunny-Carrot/Bunny-Carrot-4.jpg" },
          { name: "Bunny-Carrot 4", img: "/Pets/Bunny-Carrot/Bunny-Carrot-5.jpg" },
          { name: "Bunny-Carrot 5", img: "/Pets/Bunny-Carrot/Bunny-Carrot-6.jpg" },

        ],
      },

      {
        id: "Bunny-Painter",
        name: "Bunny Painter",
        detail: "ลาย Bunny Painter",
        detailProducts: "-",
        img: "/Pets/Bunny-Painter/Bunny-Painter-1.jpg",
        products: [
          { name: "Bunny-Painter 1", img: "/Pets/Bunny-Painter/Bunny-Painter-2.jpg" },
          { name: "Bunny-Painter 2", img: "/Pets/Bunny-Painter/Bunny-Painter-3.jpg" },
          { name: "Bunny-Painter 3", img: "/Pets/Bunny-Painter/Bunny-Painter-4.jpg" },
          { name: "Bunny-Painter 4", img: "/Pets/Bunny-Painter/Bunny-Painter-5.jpg" },
          { name: "Bunny-Painter 5", img: "/Pets/Bunny-Painter/Bunny-Painter-6.jpg" },

        ],
      },
      {
        id: "Cat-World",
        name: "Cat World",
        detail: "ลาย Cat World",
        detailProducts: "-",
        img: "/Pets/Cat-World/Cat-World-1.jpg",
        products: [
          { name: "Cat-World 1", img: "/Pets/Cat-World/Cat-World-2.jpg" },
          { name: "Cat-World 2", img: "/Pets/Cat-World/Cat-World-3.jpg" },
          { name: "Cat-World 3", img: "/Pets/Cat-World/Cat-World-4.jpg" },
          { name: "Cat-World 4", img: "/Pets/Cat-World/Cat-World-5.jpg" },
          { name: "Cat-World 5", img: "/Pets/Cat-World/Cat-World-6.jpg" },

        ],
      },

      {
        id: "Cats-Lover",
        name: "Cats Lover",
        detail: "ลาย Cats Lover",
        detailProducts: "-",
        img: "/Pets/Cats-Lover/Cats-Lover-1.jpg",
        products: [
          { name: "Cats-Lover 1", img: "/Pets/Cats-Lover/Cats-Lover-2.jpg" },
          { name: "Cats-Lover 2", img: "/Pets/Cats-Lover/Cats-Lover-3.jpg" },
          { name: "Cats-Lover 3", img: "/Pets/Cats-Lover/Cats-Lover-4.jpg" },
          { name: "Cats-Lover 4", img: "/Pets/Cats-Lover/Cats-Lover-5.jpg" },
          { name: "Cats-Lover 5", img: "/Pets/Cats-Lover/Cats-Lover-6.jpg" },
        ],
      },

      {
        id: "Cat-weekend",
        name: "Cat weekend",
        detail: "ลาย Cat weekend",
        detailProducts: "-",
        img: "/Pets/Cat-weekend/Cat-weekend-1.jpg",
        products: [
          { name: "Cat-weekend 1", img: "/Pets/Cat-weekend/Cat-weekend-2.jpg" },
          { name: "Cat-weekend 2", img: "/Pets/Cat-weekend/Cat-weekend-3.jpg" },
          { name: "Cat-weekend 3", img: "/Pets/Cat-weekend/Cat-weekend-4.jpg" },
          { name: "Cat-weekend 4", img: "/Pets/Cat-weekend/Cat-weekend-5.jpg" },
          { name: "Cat-weekend 5", img: "/Pets/Cat-weekend/Cat-weekend-6.jpg" },
        ],
      },

      {
        id: "Cat-whisperer",
        name: "Cat whisperer",
        detail: "ลาย Cat whisperer",
        detailProducts: "-",
        img: "/Pets/Cat-whisperer/Cat-whisperer-1.jpg",
        products: [
          { name: "Cat-whisperer 1", img: "/Pets/Cat-whisperer/Cat-whisperer-2.jpg" },
          { name: "Cat-whisperer 2", img: "/Pets/Cat-whisperer/Cat-whisperer-3.jpg" },
          { name: "Cat-whisperer 3", img: "/Pets/Cat-whisperer/Cat-whisperer-4.jpg" },
          { name: "Cat-whisperer 4", img: "/Pets/Cat-whisperer/Cat-whisperer-5.jpg" },

        ],
      },

      {
        id: "Circus",
        name: "Circus",
        detail: "ลาย Circus",
        detailProducts: "-",
        img: "/Pets/Circus/Circus-1.jpg",
        products: [
          { name: "Circus 1", img: "/Pets/Circus/Circus-2.jpg" },
          { name: "Circus 2", img: "/Pets/Circus/Circus-3.jpg" },
          { name: "Circus 3", img: "/Pets/Circus/Circus-4.jpg" },
          { name: "Circus 4", img: "/Pets/Circus/Circus-5.jpg" },
          { name: "Circus 5", img: "/Pets/Circus/Circus-6.jpg" },
        ],
      },

      {
        id: "Colorful",
        name: "Colorful",
        detail: "ลาย Colorful",
        detailProducts: "-",
        img: "/Pets/Colorful/Colorful-1.jpg",
        products: [
          { name: "Colorful 1", img: "/Pets/Colorful/Colorful-2.jpg" },
          { name: "Colorful 2", img: "/Pets/Colorful/Colorful-3.jpg" },
          { name: "Colorful 3", img: "/Pets/Colorful/Colorful-4.jpg" },
          { name: "Colorful 4", img: "/Pets/Colorful/Colorful-5.jpg" },
          { name: "Colorful 5", img: "/Pets/Colorful/Colorful-6.jpg" },
        ],
      },

      {
        id: "Croaky",
        name: "Croaky",
        detail: "ลาย Croaky",
        detailProducts: "-",
        img: "/Pets/Croaky/Croaky-1.jpg",
        products: [
          { name: "Croaky 1", img: "/Pets/Croaky/Croaky-2.jpg" },
          { name: "Croaky 2", img: "/Pets/Croaky/Croaky-3.jpg" },
          { name: "Croaky 3", img: "/Pets/Croaky/Croaky-4.jpg" },
          { name: "Croaky 4", img: "/Pets/Croaky/Croaky-5.jpg" },
          { name: "Croaky 5", img: "/Pets/Croaky/Croaky-6.jpg" },
        ],
      },

      {
        id: "Cutie-animals",
        name: "Cutie animals",
        detail: "ลาย Cutie animals",
        detailProducts: "-",
        img: "/Pets/Cutie-animals/Cutie-animals-1.jpg",
        products: [
          { name: "Cutie-animals 1", img: "/Pets/Cutie-animals/Cutie-animals-2.jpg" },
          { name: "Cutie-animals 2", img: "/Pets/Cutie-animals/Cutie-animals-3.jpg" },
          { name: "Cutie-animals 3", img: "/Pets/Cutie-animals/Cutie-animals-4.jpg" },
          { name: "Cutie-animals 4", img: "/Pets/Cutie-animals/Cutie-animals-5.jpg" },
          { name: "Cutie-animals 5", img: "/Pets/Cutie-animals/Cutie-animals-6.jpg" },
        ],
      },

      {
        id: "Dogs-Happy",
        name: "Dogs-Happy",
        detail: "ลาย Dogs-Happy",
        detailProducts: "-",
        img: "/Pets/Dogs-Happy/Dogs-Happy-1.jpg",
        products: [
          { name: "Dogs-Happy 1", img: "/Pets/Dogs-Happy/Dogs-Happy-2.jpg" },
          { name: "Dogs-Happy 2", img: "/Pets/Dogs-Happy/Dogs-Happy-3.jpg" },
          { name: "Dogs-Happy 3", img: "/Pets/Dogs-Happy/Dogs-Happy-4.jpg" },
          { name: "Dogs-Happy 4", img: "/Pets/Dogs-Happy/Dogs-Happy-5.jpg" },
          { name: "Dogs-Happy 5", img: "/Pets/Dogs-Happy/Dogs-Happy-6.jpg" },
        ],
      },

      {
        id: "Hedgehog",
        name: "Hedgehog",
        detail: "ลาย Hedgehog",
        detailProducts: "-",
        img: "/Pets/Hedgehog/Hedgehog-1.jpg",
        products: [
          { name: "Hedgehog 1", img: "/Pets/Hedgehog/Hedgehog-2.jpg" },
          { name: "Hedgehog 2", img: "/Pets/Hedgehog/Hedgehog-3.jpg" },
          { name: "Hedgehog 3", img: "/Pets/Hedgehog/Hedgehog-4.jpg" },
          { name: "Hedgehog 4", img: "/Pets/Hedgehog/Hedgehog-5.jpg" },
          { name: "Hedgehog 5", img: "/Pets/Hedgehog/Hedgehog-6.jpg" },
        ],
      },

      {
        id: "Just-bee",
        name: "Just bee",
        detail: "ลาย Just bee",
        detailProducts: "-",
        img: "/Pets/Just-bee/Just-bee-1.jpg",
        products: [
          { name: "Just-bee 1", img: "/Pets/Just-bee/Just-bee-2.jpg" },
          { name: "Just-bee 2", img: "/Pets/Just-bee/Just-bee-3.jpg" },
          { name: "Just-bee 3", img: "/Pets/Just-bee/Just-bee-4.jpg" },
          { name: "Just-bee 4", img: "/Pets/Just-bee/Just-bee-5.jpg" },
          { name: "Just-bee 5", img: "/Pets/Just-bee/Just-bee-6.jpg" },
        ],
      },

      {
        id: "Just-Bird",
        name: "Just Bird",
        detail: "ลาย Just Bird",
        detailProducts: "-",
        img: "/Pets/Just-Bird/Just-Bird-1.jpg",
        products: [
          { name: "Just-Bird 1", img: "/Pets/Just-Bird/Just-Bird-2.jpg" },
          { name: "Just-Bird 2", img: "/Pets/Just-Bird/Just-Bird-3.jpg" },
          { name: "Just-Bird 3", img: "/Pets/Just-Bird/Just-Bird-4.jpg" },
          { name: "Just-Bird 4", img: "/Pets/Just-Bird/Just-Bird-5.jpg" },
          { name: "Just-Bird 5", img: "/Pets/Just-Bird/Just-Bird-6.jpg" },
        ],
      },

      {
        id: "Korean-cat",
        name: "Korean cat",
        detail: "ลาย Korean cat",
        detailProducts: "-",
        img: "/Pets/Korean-cat/Korean-cat-1.jpg",
        products: [
          { name: "Korean-cat 1", img: "/Pets/Korean-cat/Korean-cat-2.jpg" },
          { name: "Korean-cat 2", img: "/Pets/Korean-cat/Korean-cat-3.jpg" },
          { name: "Korean-cat 3", img: "/Pets/Korean-cat/Korean-cat-4.jpg" },
          { name: "Korean-cat 4", img: "/Pets/Korean-cat/Korean-cat-5.jpg" },
        ],
      },

      {
        id: "Mee-Noi",
        name: "Mee Noi",
        detail: "ลาย Mee Noi",
        detailProducts: "-",
        img: "/Pets/Mee-Noi/Mee-Noi-1.jpg",
        products: [
          { name: "Mee-Noi 1", img: "/Pets/Mee-Noi/Mee-Noi-2.jpg" },
          { name: "Mee-Noi 2", img: "/Pets/Mee-Noi/Mee-Noi-3.jpg" },
          { name: "Mee-Noi 3", img: "/Pets/Mee-Noi/Mee-Noi-4.jpg" },
          { name: "Mee-Noi 4", img: "/Pets/Mee-Noi/Mee-Noi-5.jpg" },
          { name: "Mee-Noi 5", img: "/Pets/Mee-Noi/Mee-Noi-6.jpg" },
        ],
      },

      {
        id: "Meow",
        name: "Meow",
        detail: "ลาย Meow",
        detailProducts: "-",
        img: "/Pets/Meow/Meow-1.jpg",
        products: [
          { name: "Meow 1", img: "/Pets/Meow/Meow-2.jpg" },
          { name: "Meow 2", img: "/Pets/Meow/Meow-3.jpg" },
          { name: "Meow 3", img: "/Pets/Meow/Meow-4.jpg" },
          { name: "Meow 4", img: "/Pets/Meow/Meow-5.jpg" },
          { name: "Meow 5", img: "/Pets/Meow/Meow-6.jpg" },
        ],
      },
      {
        id: "Nekko",
        name: "Nekko",
        detail: "ลาย Nekko",
        detailProducts: "-",
        img: "/Pets/Nekko/Neko-1.jpg",
        products: [
          { name: "Nekko 1", img: "/Pets/Nekko/Neko-2.jpg" },
          { name: "Nekko 2", img: "/Pets/Nekko/Neko-3.jpg" },
          { name: "Nekko 3", img: "/Pets/Nekko/Neko-4.jpg" },
          { name: "Nekko 4", img: "/Pets/Nekko/Neko-5.jpg" },
          { name: "Nekko 5", img: "/Pets/Nekko/Neko-6.jpg" },
        ],
      },

      {
        id: "Open-the-world",
        name: "Open the world",
        detail: "ลาย Open the-world",
        detailProducts: "-",
        img: "/Pets/Open-the-world/Open-the-world-1.jpg",
        products: [
          { name: "Open-the-world 1", img: "/Pets/Open-the-world/Open-the-world-2.jpg" },
          { name: "Open-the-world 2", img: "/Pets/Open-the-world/Open-the-world-3.jpg" },
          { name: "Open-the-world 3", img: "/Pets/Open-the-world/Open-the-world-4.jpg" },
          { name: "Open-the-world 4", img: "/Pets/Open-the-world/Open-the-world-5.jpg" },
          { name: "Open-the-world 5", img: "/Pets/Open-the-world/Open-the-world-6.jpg" },
        ],
      },
      {
        id: "Penguin",
        name: "Penguin",
        detail: "ลาย Penguin",
        detailProducts: "-",
        img: "/Pets/Penguin/Penguin-1.jpg",
        products: [
          { name: "Penguin 1", img: "/Pets/Penguin/Penguin-2.jpg" },
          { name: "Penguin 2", img: "/Pets/Penguin/Penguin-3.jpg" },
          { name: "Penguin 3", img: "/Pets/Penguin/Penguin-4.jpg" },
          { name: "Penguin 4", img: "/Pets/Penguin/Penguin-5.jpg" },
          { name: "Penguin 5", img: "/Pets/Penguin/Penguin-6.jpg" },
        ],
      },
      {
        id: "Pets-Yummy",
        name: "Pets Yummy",
        detail: "ลาย Pets Yummy",
        detailProducts: "-",
        img: "/Pets/Pets-Yummy/Pets-Yummy-1.jpg",
        products: [
          { name: "Pets-Yummy 1", img: "/Pets/Pets-Yummy/Pets-Yummy-2.jpg" },
          { name: "Pets-Yummy 2", img: "/Pets/Pets-Yummy/Pets-Yummy-3.jpg" },
          { name: "Pets-Yummy 3", img: "/Pets/Pets-Yummy/Pets-Yummy-4.jpg" },
          { name: "Pets-Yummy 4", img: "/Pets/Pets-Yummy/Pets-Yummy-5.jpg" },
          { name: "Pets-Yummy 5", img: "/Pets/Pets-Yummy/Pets-Yummy-6.jpg" },
        ],
      },
      {
        id: "Sweet-PETS",
        name: "Sweet PETS",
        detail: "ลาย Sweet PETS",
        detailProducts: "-",
        img: "/Pets/Sweet-PETS/Sweet-PETS-1.jpg",
        products: [
          { name: "Sweet-PETS 1", img: "/Pets/Sweet-PETS/Sweet-PETS-2.jpg" },
          { name: "Sweet-PETS 2", img: "/Pets/Sweet-PETS/Sweet-PETS-3.jpg" },
          { name: "Sweet-PETS 3", img: "/Pets/Sweet-PETS/Sweet-PETS-4.jpg" },
          { name: "Sweet-PETS 4", img: "/Pets/Sweet-PETS/Sweet-PETS-5.jpg" },
          { name: "Sweet-PETS 5", img: "/Pets/Sweet-PETS/Sweet-PETS-6.jpg" },
        ],
      },

      {
        id: "We-are-Golden",
        name: "We are Golden",
        detail: "ลาย We are Golden",
        detailProducts: "-",
        img: "/Pets/We-are-Golden/We-are-Golden-1.jpg",
        products: [
          { name: "We-are-Golden 1", img: "/Pets/We-are-Golden/We-are-Golden-2.jpg" },
          { name: "We-are-Golden 2", img: "/Pets/We-are-Golden/We-are-Golden-3.jpg" },
          { name: "We-are-Golden 3", img: "/Pets/We-are-Golden/We-are-Golden-4.jpg" },
          { name: "We-are-Golden 4", img: "/Pets/We-are-Golden/We-are-Golden-5.jpg" },
          { name: "We-are-Golden 5", img: "/Pets/We-are-Golden/We-are-Golden-6.jpg" },
        ],
      },

    ],
  },



];
