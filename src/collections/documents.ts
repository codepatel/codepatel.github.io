import { defineCollection } from 'astro:content';

import { ObsidianMdLoader, ObsidianWikiLinkSchema } from "astro-loader-obsidian";

import { DOCUMENTS_COLLECTION_NAME, DEFAULT_VAULT_DIR } from 'astro-spaceship/constants';
import { DocumentSchema } from 'astro-spaceship/schemas';
import config from 'astro-spaceship/config';

import { ENV } from 'varlock/env';

export default {
  [DOCUMENTS_COLLECTION_NAME]: defineCollection({
    loader: ObsidianMdLoader({
      author: config.author,
      base: ENV.OBSIDIAN_VAULT_DIR ?? DEFAULT_VAULT_DIR,
      url: '',
      wikilinkFields: ['relateds'],
      pattern: [
        "**/*.md", // include all markdown files AND
        "!**/drafts/**/*.md", // exclude all folders named draft
        "!**/*.draft.md" // exclude all files with extension  .draft.md
	  ]
    }),
    schema: ({ image }) => DocumentSchema.extend({
      images: ObsidianWikiLinkSchema.extend({
        href: image().optional(),
      }).array().optional(),
      cover: image().optional(),
      image: image().optional(),
    }),
  })
};
