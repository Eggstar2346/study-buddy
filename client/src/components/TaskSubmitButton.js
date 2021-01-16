import React from "react";
import { Button } from "shards-react";

export default function ButtonsExample() {
  return (
    <div className="example">
      <Button>Primary</Button>
      <Button theme="success">Success</Button>
    </div>
  );
}