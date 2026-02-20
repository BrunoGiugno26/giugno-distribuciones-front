"use client";

import { useSearchStore } from "@/store/search-store";
import { X } from "lucide-react";
import SearchAutocomplete from "./SearchAutocomplete";

export default function SearchOverlay() {
  const { isOpen, close } = useSearchStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10050] bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20">
      <div className="bg-background text-foreground w-full max-w-lg p-4 rounded-lg shadow-xl relative">

        <button
          onClick={close}
          className="absolute top-4 right-4 z-[10051]"
        >
          <X className="w-6 h-6" />
        </button>

        <SearchAutocomplete
          onSelect={({ url }) => {
            close();
            window.location.href = url;
          }}
        />
      </div>
    </div>
  );
}

