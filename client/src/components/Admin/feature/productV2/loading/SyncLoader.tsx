import * as React from "react";

import { LoaderSizeMarginProps } from "src/components/Admin/feature/productV2/helpers/props";
import { createAnimation } from "src/components/Admin/feature/productV2/helpers/animation";
import { cssValue } from "src/components/Admin/feature/productV2/helpers/unitConverter";

const sync = createAnimation(
  "SyncLoader",
  `33% {transform: translateY(10px)}
  66% {transform: translateY(-10px)}
  100% {transform: translateY(0)}`,
  "sync"
);

function SyncLoader({
  loading = true,
  color = "#3e83f8",
  speedMultiplier = 2,
  cssOverride = {},
  size = 5,
  margin = 2,
  ...additionalprops
}: LoaderSizeMarginProps): JSX.Element | null {
  const wrapper: React.CSSProperties = {
    display: "inherit",
    ...cssOverride,
  };

  const style = (i: number): React.CSSProperties => {
    return {
      backgroundColor: color,
      width: cssValue(size),
      height: cssValue(size),
      margin: cssValue(margin),
      borderRadius: "100%",
      display: "inline-block",
      animation: `${sync} ${0.6 / speedMultiplier}s ${i * 0.07}s infinite ease-in-out`,
      animationFillMode: "both",
    };
  };

  if (!loading) {
    return null;
  }

  return (
    <span style={wrapper} {...additionalprops}>
      <span style={style(1)} />
      <span style={style(2)} />
      <span style={style(3)} />
    </span>
  );
}

export default SyncLoader;