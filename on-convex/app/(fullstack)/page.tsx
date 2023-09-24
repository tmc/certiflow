"use client";

import { FakeParagraphs } from "@/components/helpers/FakeParagraphs";
import { FakeWordList } from "@/components/helpers/FakeWordList";
import { Footer } from "@/components/layout/footer";
import { Paragraph } from "@/components/layout/paragraph";
import { StickyHeader } from "@/components/layout/sticky-header";
import { StickySidebar } from "@/components/layout/sticky-sidebar";
import ItemList from "./item-list";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [doc, setDoc] = useState("");
  return (
    <>
      <StickyHeader className="p-2 font-bold">certiflow</StickyHeader>
      <div className="grid grid-cols-[500px_minmax(0,1fr)]">
        <StickySidebar className="top-[calc(2.5rem+1px)] h-[calc(100vh-(2.5rem+1px))] p-4 flex flex-col">
          <SearchedInput />
        </StickySidebar>
        <main className="min-h-[calc(100vh-(2.5rem+1px))] p-4">
          <Textarea
            value={doc}
            onChange={(event) => {
              setDoc(event.target.value);
            }}
            className="h-full"
            placeholder="Insert your policy here"
          />
        </main>
      </div>
      <Footer>copyright Certiflow 2023</Footer>
    </>
  );
}

function SearchedInput() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Progress value={30} className="mb-2 basis-4" />
      <Input
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        className="mb-2"
        placeholder="Search controls"
      />
      <ItemList filter={search} />
    </>
  );
}
