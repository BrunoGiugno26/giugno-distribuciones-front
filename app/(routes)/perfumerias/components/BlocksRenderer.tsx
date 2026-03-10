import { StrapiBlock } from "@/types/soluciones";

export default function BlocksRenderer({ blocks }: { blocks: StrapiBlock[] }) {
  return (
    <div className="flex flex-col gap-3 text-gray-600 dark:text-gray-400 leading-relaxed">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          const text = block.children.map((c) => c.text).join(" ");
          return <p key={index}>{text}</p>;
        }

        return null;
      })}
    </div>
  );
}
