import { useHotkeys, useMouse } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useInterval } from "@mantine/hooks";

const TIMES = 24

export default function MediaMaker() {
  const { ref, x } = useMouse();

  const [seconds, setSeconds] = useState(0);
  const interval = useInterval(() => setSeconds((s) => s + 1), 10);

  useEffect(() => {
    if(seconds > 60*TIMES) {
      setSeconds(0)
    }
  }, [seconds])


  useHotkeys([
    ['Space', (event) => {
      event.preventDefault();
      interval.toggle()
    }],
  ]);

  return (
    <div
      ref={ref}
      className="relative bg-black h-full overflow-y-hidden overflow-x-auto m-0"
      onClick={() => setSeconds(x)}
    >
    <div className="ml-[1px] whitespace-nowrap mt-[-4px]">
      {Array.from(Array(TIMES).keys()).map((item) => (
        <div key={item} className="w-[59px] inline-block m-[1px] bg-muted text-center text-sm">
          {item+1}s
        </div>
      ))}
    </div>
      <div>
        <div
          className="absolute t-0 bg-red-600 w-[1px] h-[350px]"
          style={{ left: seconds }}
        />
      </div>
      {seconds}
    </div>
  )
}