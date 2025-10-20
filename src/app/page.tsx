'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Search, Calculator } from "lucide-react";

export default function Home() {
  const [additional, setAdditional] = useState("");
  const [author, setAuthor] = useState("");
  const [openTop, setOpenTop] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [openBottom, setOpenBottom] = useState(false);
  const [showBottom, setShowBottom] = useState(false);

  useEffect(() => {
    if (openTop) {
      setShowTop(true);
    } else {
      const t = setTimeout(() => setShowTop(false), 200); // match transition duration
      return () => clearTimeout(t);
    }
  }, [openTop]);

  useEffect(() => {
    if (openBottom) {
      setShowBottom(true);
    } else {
      const t = setTimeout(() => setShowBottom(false), 200);
      return () => clearTimeout(t);
    }
  }, [openBottom]);

  return (
    <div className="min-h-screen bg-background p-8 sm:p-20 flex flex-col items-center gap-10">
      <main className="w-full max-w-2xl space-y-6">
        {/* top autocomplete */}
        <Command className="w-full rounded-md border">
          <CommandInput
            placeholder="Art der Verletzung eingeben (Autocomplete)"
            onFocus={() => {
              setOpenTop(true);
            }}
            onBlur={() => {
              setOpenTop(false);
            }}
          />
          {showTop && (
            <CommandList
              className={`transition-all duration-200 ease-out overflow-hidden transform ${
                openTop ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <CommandGroup heading="Suggestions">
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenTop(false)}
                >
                  <Calendar className="mr-2" size={16} /> Calendar
                </CommandItem>
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenTop(false)}
                >
                  <Search className="mr-2" size={16} /> Search Emoji
                </CommandItem>
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenTop(false)}
                >
                  <Calculator className="mr-2" size={16} /> Calculator
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Settings">
                <CommandItem onMouseDown={(e) => e.preventDefault()} onClick={() => setOpenTop(false)}>Profile</CommandItem>
                <CommandItem onMouseDown={(e) => e.preventDefault()} onClick={() => setOpenTop(false)}>Billing</CommandItem>
                <CommandItem onMouseDown={(e) => e.preventDefault()} onClick={() => setOpenTop(false)}>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          )}
        </Command>

        {/* grey multistage map */}
        <Card className="bg-slate-200 p-6">
          <p className="text-sm font-medium">multistage map</p>
          <p className="mt-3 text-sm">gebäude → stockwerk → raum/flur</p>
        </Card>

        {/* second autocomplete */}
        <Command className="w-full rounded-md border">
          <CommandInput
            placeholder="Raum der Verletzung eingeben (Autocomplete)"
            onFocus={() => {
              setOpenBottom(true);
            }}
            onBlur={() => {
              setOpenBottom(false);
            }}
          />
          {showBottom && (
            <CommandList
              className={`transition-all duration-200 ease-out overflow-hidden transform ${
                openBottom ? "max-h-80 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-1"
              }`}
            >
              <CommandGroup heading="Suggestions">
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenBottom(false)}
                >
                  <Calendar className="mr-2" size={16} /> Calendar
                </CommandItem>
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenBottom(false)}
                >
                  <Search className="mr-2" size={16} /> Search Emoji
                </CommandItem>
                <CommandItem
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => setOpenBottom(false)}
                >
                  <Calculator className="mr-2" size={16} /> Calculator
                </CommandItem>
              </CommandGroup>
            </CommandList>
          )}
        </Command>

        {/* additional info */}
        <div className="space-y-2">
          <Label htmlFor="additional">additional Information (optional)</Label>
          <Textarea
            id="additional"
            placeholder="Type your message here"
            value={additional}
            onChange={(e) => setAdditional(e.currentTarget.value)}
            className="min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">Your message will be copied to the support team.</p>
        </div>

        {/* author + submit (now a real form with native submit button) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ additional, author });
          }}
          className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-3"
        >
          <div className="flex-1">
            <Label htmlFor="author">Verfasser</Label>
            <Input
              id="author"
              placeholder="Type your message here"
              value={author}
              onChange={(e) => setAuthor(e.currentTarget.value)}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </main>
    </div>
  );
}
