// Artigos publicados, na mesma forma para listagens, cards, temas e busca.
// A coleção `blog` é a fonte única; território e evidências vêm do banco editorial.
import { type CollectionEntry, getCollection } from "astro:content";

import { type Territory, territoryBySlug } from "@/lib/editorial";
import { readingTime } from "@/lib/reading-time";

export interface PostView {
  id: string;
  href: string;
  title: string;
  description: string;
  pubDate: Date;
  minutes: number;
  image?: string;
  contentId?: string;
  type: CollectionEntry<"blog">["data"]["type"];
  tags: string[];
  evidence: string[];
  territory: Territory;
  entry: CollectionEntry<"blog">;
}

const TYPE_LABEL: Record<PostView["type"], string> = {
  artigo: "Artigo",
  guia: "Guia",
  mapa: "Mapa",
  ensaio: "Ensaio",
};
export const typeLabel = (t: PostView["type"]) => TYPE_LABEL[t];

export async function getPosts(): Promise<PostView[]> {
  const entries = await getCollection("blog", ({ data }) => !data.draft);
  return entries
    .map((entry) => {
      const territory = territoryBySlug(entry.data.territory);
      if (!territory) throw new Error(`${entry.id}: território desconhecido "${entry.data.territory}"`);
      return {
        id: entry.id,
        href: `/blog/${entry.id}/`,
        title: entry.data.title,
        description: entry.data.description,
        pubDate: entry.data.pubDate,
        minutes: readingTime(entry.body),
        image: entry.data.image,
        contentId: entry.data.contentId,
        type: entry.data.type,
        tags: entry.data.tags,
        evidence: entry.data.evidence,
        territory,
        entry,
      };
    })
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf() || a.territory.order - b.territory.order);
}

export const dateFmt = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
export const formatDate = (d: Date) => dateFmt.format(d).replace(/\./g, "").replace(/ de /g, " ");
