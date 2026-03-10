"use client";

type CTAProps = {
  texto: string;
  link: string;
};

export default function CTA({ texto, link }: CTAProps) {
  return (
    <section className="w-full bg-black dark:bg-slate-900 py-20 border-t dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        <h2 className="text-3xl font-bold text-white">
          {texto}
        </h2>
        <a href={link}
          className="bg-white text-black dark:bg-sky-600 dark:text-white px-8 py-3 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-sky-500 transition shadow-lg"
        >
          Contactar ahora
        </a>
      </div>
    </section>
  );
}
