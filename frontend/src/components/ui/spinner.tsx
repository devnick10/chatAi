
import { cn } from "@sglara/cn"
import { LoaderIcon } from "./icons"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      classNames={cn("size-4 animate-spin", className)}
      {...props}
      size={"6"}
    />
  )
}

export function SpinnerCustom() {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  )
}
