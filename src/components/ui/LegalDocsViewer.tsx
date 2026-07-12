"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";

export function LegalDocsViewer({ defaultDoc = "privacy", dict }: { defaultDoc?: string; dict?: any }) {
  const [activeDoc, setActiveDoc] = useState(defaultDoc);

  const safeDict = dict?.legal || {};

  const renderContent = (contentArray: any[]) => {
    if (!contentArray || !Array.isArray(contentArray)) return null;
    return (
      <>
        {contentArray.map((item, idx) => {
          if (item.type === "h2") return <h2 key={idx}>{item.text}</h2>;
          if (item.type === "p") return <p key={idx} dangerouslySetInnerHTML={{ __html: item.text }} />;
          if (item.type === "ul") return (
            <ul key={idx}>
              {item.items.map((li: string, i: number) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: li }} />
              ))}
            </ul>
          );
          return null;
        })}
      </>
    );
  };

  const dynamicDocs = [
    {
      id: "privacy",
      title: safeDict.privacy?.title || "Privacy Policy",
      content: renderContent(safeDict.privacy?.content)
    },
    {
      id: "terms",
      title: safeDict.terms?.title || "Terms of Use",
      content: renderContent(safeDict.terms?.content)
    },
    {
      id: "cookies",
      title: safeDict.cookies?.title || "Cookie Policy",
      content: renderContent(safeDict.cookies?.content)
    },
    {
      id: "kvkk",
      title: safeDict.kvkk?.title || "KVKK Disclosure",
      content: renderContent(safeDict.kvkk?.content)
    }
  ];

  const content = dynamicDocs.find((d) => d.id === activeDoc)?.content || dynamicDocs[0].content;

  return (
    <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative min-h-[60vh]">
      {/* Sidebar Navigation */}
      <div className="md:w-64 shrink-0">
        <div className="sticky top-32 flex flex-col gap-2 border-l-2 border-gray-100 dark:border-white/10">
          {dynamicDocs.map((doc) => {
            const isActive = activeDoc === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => setActiveDoc(doc.id)}
                className={cn(
                  "text-left px-6 py-3 text-sm font-medium transition-all duration-200 border-l-2 -ml-[2px]",
                  isActive 
                    ? "border-accent text-accent dark:text-accent-light" 
                    : "border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                {doc.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl">
        <div className="text-[var(--color-text-secondary)] dark:text-white/80 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-medium [&>h2]:text-[var(--color-text-heading)] [&>h2]:dark:text-white [&>h2]:mt-12 [&>h2:first-child]:mt-0 [&>h2]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>strong]:font-semibold [&>strong]:text-[var(--color-text-heading)] [&>strong]:dark:text-white [&>p]:mb-4">
          {content}
        </div>
      </div>
    </div>
  );
}
