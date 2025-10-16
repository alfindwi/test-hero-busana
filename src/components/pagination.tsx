import {
  Pagination,
  PaginationContent,
  PaginationItem
} from "@/components/ui/pagination";

interface paginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

export function PaginationComponent({
  currentPage,
  setCurrentPage,
  totalPages,
}: paginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <Pagination className="mt-6 font-mono">
      <PaginationContent className="flex gap-2">
        <PaginationItem>
          <button
            onClick={handlePrev}
            className="bg-[#faae2b] text-black border cursor-pointer border-black px-3 py-1 rounded shadow-[3px_3px_0px_#222222] hover:bg-[#faae2b] transition"
          >
            &lt;
          </button>
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <PaginationItem key={num}>
            <button
              onClick={() => setCurrentPage(num)}
              className={`px-3 py-1 border border-black rounded cursor-pointer shadow-[3px_3px_0px_#222222] ${
                num === currentPage
                  ? "bg-black text-white hover:bg-[#292929]"
                  : "bg-[#8bd3dd] text-black hover:bg-[#9fe2eb]"
              } transition`}
            >
              {num}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <button
            onClick={handleNext}
            className="bg-[#faae2b] text-black border cursor-pointer border-black px-3 py-1 rounded shadow-[3px_3px_0px_#222222] hover:bg-[#faae2b] transition"
          >
            &gt;
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
