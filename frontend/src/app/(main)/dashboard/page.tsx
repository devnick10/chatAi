import RandomHeading from "@/app/_components/randomHeading";
import ResponseContainer from "@/app/_components/responseContainer";
import { cn } from "@sglara/cn";

export default function Page() {
  return (
    <div className={cn("h-screen overflow-y-hidden")}>
      <DashboardTopBar />
      <div className=" max-w-7xl flex flex-col mt-40 items-center mx-auto">
        <div className="flex sm:w-1/2 flex-col gap-10 items-center">
          <RandomHeading />
          <ResponseContainer />
        </div>
      </div>
    </div>
  );
}

function DashboardTopBar() {
  return (
    <>
      <div className="sm:p-4 flex justify-between w-full">
        <div>
          <h2 className="text-xl font-medium ">ChatAI</h2>
        </div>
        {/* <div className='flex gap-4 items-center'>
            <button className='flex gap-1 items-center justify-center'><IconShare2 />Share</button>
            <button><IconDots /></button>
          </div> */}
      </div>
    </>
  );
}
