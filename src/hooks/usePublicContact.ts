import { useEffect, useState } from "react";
import { getPublicContact } from "@/lib/site.functions";
import { defaultContact, type PublicContact } from "@/lib/site-settings";

let cached: PublicContact | null = null;

export function usePublicContact() {
  const [contact, setContact] = useState<PublicContact>(cached ?? defaultContact);

  useEffect(() => {
    let live = true;
    getPublicContact()
      .then((next) => {
        cached = next;
        if (live) setContact(next);
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);

  return contact;
}
