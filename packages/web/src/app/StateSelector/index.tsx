"use client";

import { FC } from "react";
import Link from "next/link";
import { MexicanState } from "./MexicoMap/mexicanStates";
import MexicoMap from "./MexicoMap";

interface StateSelectorProps {
  states: MexicanState[];
}

const StateSelector: FC<StateSelectorProps> = ({ states }) => (
  <div
    className="w-1/2 h-52 grid gap-16 items-center justify-center"
    style={{
      // grid height 100px
      gridTemplateRows: "repeat(2, 100px)",
      // grid width 100px
      gridTemplateColumns: "repeat(3, 100px)",
    }}
  >
    {
      states.map((state) => (
        <Link
          key={state}
          href={`/map?state=${state}`}
        >
          <MexicoMap states={[state]} interactive/>
        </Link>
      ))
    }
  </div>
)

export default StateSelector;