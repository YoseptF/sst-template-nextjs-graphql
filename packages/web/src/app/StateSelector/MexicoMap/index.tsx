"use client"

import { FC, useEffect, useRef, useState } from "react"

import classNames from "classnames";
import { MexicanState } from "./mexicanStates";
import State from "./State";

interface MexicoMapProps {
  states: (MexicanState)[],
  className?: string,
  interactive?: boolean,
}

const MexicoMap: FC<MexicoMapProps> = ({
  states,
  className,
  interactive
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewBox, setViewBox] = useState("1300 0 1000 631");

  useEffect(() => {
    if (svgRef.current) {
      const bbox = svgRef.current.getBBox();
      const padding = 10; // Adjust padding as needed
      const newViewBox = `${bbox.x - padding} ${bbox.y - padding} ${bbox.width + padding * 2} ${bbox.height + padding * 2}`;

      setViewBox(newViewBox);
    }
  }, [states]); // Recalculate when states change

  return (
    <svg
      ref={svgRef}
      className={classNames(
        "fill-slate-400 stroke-white",
        className,
        interactive && "hover:fill-slate-600 hover:stroke-gray-400 cursor-pointer"
      )}
      baseProfile="tiny"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      version="1.2"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {
        states.map((state) => (
          <State
            state={state}
            key={`state-${state}`}
          />
        ))
      }
    </svg>
  )
}

export default MexicoMap