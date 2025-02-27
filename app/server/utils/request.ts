export function parseQueryParams(req: Request) {
  const { searchParams } = new URL(req.url);
  return Object.fromEntries(searchParams.entries());
}
