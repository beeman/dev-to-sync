import * as extractFrontMatter from 'front-matter';

export interface ArticleFrontMatter {
  title: string;
  published: boolean;
  description?: string;
  tags?: string;
  canonical_url?: string;
  cover_image?: string;
}

export function extractDataFromFrontMatter(
  content: string
): ArticleFrontMatter {
  // @ts-ignore
  const frontMatter = extractFrontMatter<ArticleFrontMatter>(content);

  if (
    !frontMatter ||
    !frontMatter.attributes ||
    !frontMatter.attributes.title
  ) {
    throw new Error('The article front matter is not valid');
  }

  return {
    title: frontMatter.attributes.title,
    published: frontMatter.attributes.published || false,
  };
}

export function validateFrontMatter(content: string) {
  const frontMatter: ArticleFrontMatter = extractDataFromFrontMatter(content);

  if (!frontMatter) {
    throw new Error('Error extracting Front Matter');
  }
  return frontMatter;
}
