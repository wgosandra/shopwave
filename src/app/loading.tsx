import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6"
    >
      <span className="sr-only">Loading</span>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="mt-6 h-12 w-full max-w-2xl" />
      <Skeleton className="mt-3 h-12 w-full max-w-md" />
      <Skeleton className="mt-8 h-5 w-full max-w-xl" />
      <div className="mt-10 flex gap-3">
        <Skeleton className="h-11 w-48" />
        <Skeleton className="h-11 w-36" />
      </div>
    </div>
  );
}
