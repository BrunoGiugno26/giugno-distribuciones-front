import { Copy, Share2, } from "lucide-react";
import {FaWhatsapp} from "react-icons/fa"
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";



interface ShareButtonsProps{
    className?:string;
    label?: string;
    overrideUrl?: string
}

const ShareButtons = ({ className, label, overrideUrl }:ShareButtonsProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [copied, setCopied] = useState(false);

    const url = useMemo(() => {
        if (overrideUrl) return overrideUrl;
        if(typeof window === "undefined") return "";
        const origin = window.location.origin;
        const qs = searchParams?.toString();
        return qs ? `${origin}${pathname}?${qs}` : `${origin}${pathname}`;
    }, [overrideUrl, pathname, searchParams]);

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500)
        } catch {
            const textarea = document.createElement("textarea");
            textarea.value = url;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    }, [url]);

    const shareOnWhatsApp = useCallback(() => {
        const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        window.open(whatsAppUrl, "_blank", "noopener,noreferrer")
    }, [url]);

    const webShare = useCallback(() => {
        if (navigator.share){
            navigator.share({ url }).catch(() => {});
        } else {
            copyToClipboard()
        }
    }, [url, copyToClipboard]);

    return (
        <div className={className}>
            {label && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
            )}
            <div className="flex flex-wrap gap-3">
                <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                >
                    <Copy className="w-4 h-4"/>
                    {copied ? "Copiado ✅" : "Copiar link"}
                </button>

                <button
                onClick={shareOnWhatsApp}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-green-500 text-white hover:bg-green-600 transition"
                >
                    <FaWhatsapp className="w-4 h-4"/>
                    WhatsApp
                </button>
                <button
                onClick={webShare}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer bg-amber-600 hover:bg-amber-500 dark:bg-sky-600 text-white dark:hover:bg-sky-500 transition"
                >
                    <Share2 className="w-4 h-4"/>
                    Compartir
                </button>
            </div>
        </div>
    );
};

export default ShareButtons