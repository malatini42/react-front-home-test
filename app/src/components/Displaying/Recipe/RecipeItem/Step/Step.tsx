import { StepProps } from "../../../../../interfaces/Recipe/Step/Step.interface";
import React from "react";

export default function Step(props: StepProps)
{
  return (
    <>
      {props && props.list && props.list.map((step) =>
          <span key={step.order} style={{fontSize: "12px", textAlign: "left", padding: "2px"}}>{step.order}. {step.description}</span>
      )}
    </>
  );
};
