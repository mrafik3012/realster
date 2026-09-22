import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function buildHref(baseParams: Record<string, string | undefined>, page: number) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(baseParams)) {
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  return `/properties${qs ? `?${qs}` : ""}`;
}

export function PropertyPagination({
  page,
  pageCount,
  baseParams,
}: {
  page: number;
  pageCount: number;
  baseParams: Record<string, string | undefined>;
}) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pageCount || Math.abs(p - page) <= 1
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(baseParams, Math.max(1, page - 1))}
            aria-disabled={page === 1}
            className={page === 1 ? "pointer-events-none opacity-40" : undefined}
          />
        </PaginationItem>

        {pages.map((p, idx) => {
          const prev = pages[idx - 1];
          const showEllipsis = prev !== undefined && p - prev > 1;
          return (
            <span key={p} className="flex items-center">
              {showEllipsis && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink href={buildHref(baseParams, p)} isActive={p === page}>
                  {p}
                </PaginationLink>
              </PaginationItem>
            </span>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={buildHref(baseParams, Math.min(pageCount, page + 1))}
            aria-disabled={page === pageCount}
            className={page === pageCount ? "pointer-events-none opacity-40" : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
