// AceValueSelection.js
import { useState } from "react";

function AceValueSelection({ onSelect }) {
    return (
      <div>
        <button onClick={() => onSelect(1)}>1</button>
        <button onClick={() => onSelect(11)}>11</button>
      </div>
    );
  }

export default AceValueSelection;