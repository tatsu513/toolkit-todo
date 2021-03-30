import React from "react";

const Sample: React.FC = () => {
  return (
    <div>
      <button className="button" onClick={() => alert("onClick")}>
        ボタン
      </button>
    </div>
  );
};

export default Sample;
