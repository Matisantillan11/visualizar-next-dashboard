import { fetcher } from "@/lib/fetcher";
import {
  BookRequest,
  BookRequestStatus,
} from "@/lib/react-query/books/books.types";

export async function getBooksRequests() {
  return await fetcher<BookRequest[]>({ url: "/books/all/requests" });
}

export async function getBookRequestById(requestId: string) {
  return await fetcher<BookRequest & { authorId: string }>({
    url: `/books/request/${requestId}`,
  });
}

export async function updateBookRequestStatus(
  requestId: string,
  newStatus: BookRequestStatus,
) {
  return await fetcher<BookRequest>({
    url: `/books/request/${requestId}/status`,
    init: {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });
}
