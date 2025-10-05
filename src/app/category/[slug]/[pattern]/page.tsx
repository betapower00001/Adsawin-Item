"use client";

import * as React from "react";
import Image from "next/image";
import { categories } from "@/data/characters";
import { motion } from "framer-motion";

interface Params {
  slug: string;
  pattern: string;
}

export default function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug, pattern } = React.use(params); // unwrap Promise

  const category = categories.find((c) => c.slug === slug);
  const patternData = category?.patterns.find((p) => p.id === pattern);

  if (!category || !patternData)
    return <h1 className="text-center p-10">ไม่พบลายนี้</h1>;

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">
        {patternData.name} ({category.name})
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-8">
        {patternData.products.map((prod, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.08 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="border rounded-2xl shadow p-4 hover:shadow-lg bg-white"
          >
            <Image
              src={prod.img}
              alt={prod.name}
              width={200}
              height={200}
              className="rounded-xl object-cover mx-auto"
            />
            <p className="mt-2 font-medium">{prod.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
