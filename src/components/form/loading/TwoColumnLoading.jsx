import { Card } from "@/components/ui/card";

export function TwoColumnFormLoadingScreen() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold mb-6">Fetching Data ...</h1>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <FormFieldSkeleton />
          </div>
          <div className="space-y-6">
            <FormFieldSkeleton />
            <FormFieldSkeleton />
            <div className="h-24 bg-gray-200 rounded animate-pulse" />{" "}
            {/* Textarea skeleton */}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <div className="h-10 w-24 bg-primary/30 rounded animate-pulse" />{" "}
          {/* Button skeleton */}
        </div>
      </div>
    </div>
  );
}

function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />{" "}
      {/* Label skeleton */}
      <div className="h-10 bg-gray-200 rounded animate-pulse" />{" "}
      {/* Input skeleton */}
    </div>
  );
}
