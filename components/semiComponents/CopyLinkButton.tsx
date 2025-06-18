"use client";

import { useState } from "react";
import { Link as LinkIcon } from "lucide-react";

const CopyLinkButton = ({ productSlug }: { productSlug: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/products/${productSlug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className="p-2 bg-gray-100 hover:bg-gray-200  rounded-[10px] cursor-pointer flex items-center gap-2 transition"
      title="Copy product link"
    >
      <LinkIcon size={20} className="text-gray-700" />
      <span className="text-sm text-gray-600">{copied ? "Copied!" : "Copy"}</span>
    </div>
  );
};

export default CopyLinkButton;