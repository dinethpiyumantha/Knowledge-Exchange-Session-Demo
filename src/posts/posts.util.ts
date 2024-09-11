export function generateUniqueSlug(text: string): string {
  const baseSlug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

  const uniqueSuffix = Date.now().toString();
  return (`${baseSlug}-${uniqueSuffix}`).toLowerCase();
}
