import { fetcher } from "@/lib/fetcher";
import { BookRequest, BookRequestStatus } from "@/types/book";

export default async function getBooksRequests() {
  return await fetcher<BookRequest[]>({ url: "/books/requests/all" });
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
