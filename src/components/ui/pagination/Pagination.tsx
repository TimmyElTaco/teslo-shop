'use client';

import { generatePagination } from "@/utility";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

export function Pagination({ totalPages }: Props) {

  const pathName = usePathname();
  const searchParams = useSearchParams();
  
  const pageString = searchParams.get('page') ?? 1;
  const currentPage = isNaN(Number(pageString)) ? 1 : Number(pageString);

  if(currentPage < 1) {
    redirect(pathName);
  }

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if(pageNumber === '...') {
      return `${pathName}?${params.toString()}`;
    }

    if(Number(pageNumber) <= 0) {
      return `${pathName}`
    }

    if(Number(pageNumber) > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set('page', pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  }

  return (
    <div className="flex text-center justify-center my-20">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageURL(currentPage - 1)}
              aria-disabled="true"
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          
          {
            allPages.map((page, i) => (
              <li key={i} className="page-item">
                <Link
                  className={
                    clsx(
                      "page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                      {
                        'bg-blue-600 shadow-sm text-white hover:bg-blue-500 hover:text-white': page === currentPage
                      }
                    )
                  }
                  href={createPageURL(page)}
                >
                  {page}
                </Link>
              </li>
            ))
          }

          <li className="page-item">
            <Link
              className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href={createPageURL(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
