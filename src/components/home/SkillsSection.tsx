'use client';

import { motion } from 'framer-motion';
import { SkillCategory, ToolItem } from '@/types/portfolio';

export default function SkillsSection({ skills, tools }: { skills: SkillCategory[]; tools: ToolItem[] }) {
  return (
    <section id="skills" className="py-20 border-t border-zinc-900/50">
      <div className="mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mb-4">Skills & Tools</h2>
        <p className="text-zinc-400 max-w-2xl">
          Technologies and tools I use to build digital products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {skills.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-semibold text-zinc-100 border-b border-zinc-800 pb-2">{category.categoryName}</h3>
            <ul className="flex flex-col gap-2">
              {category.skills.map((skill, sIdx) => (
                <li key={sIdx} className="text-zinc-400 text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                  {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-6">Everyday Tools</h3>
        <div className="flex flex-wrap gap-4">
          {tools.map((tool, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800 transition-colors cursor-default"
            >
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
