import React, { useMemo, useRef } from "react";
import { useThree, useRender } from "react-three-fiber";
import { a } from "react-spring/three";

function Text({
  children,
  position,
  opacity,
  color = "white",
  fontSize = 300
}) {
  const {
    size: { width, height },
    viewport: { width: viewportWidth, height: viewportHeight }
  } = useThree();
  const sprite = useRef();
  let s = 0;

  useRender(() => {
    s += 0.02;
    if (s >= 10) {
      s = -10;
    }
    sprite.current.position.set(position[0] + s, position[1], position[2]);
  });
  const scale = viewportWidth > viewportHeight ? viewportWidth : viewportHeight;
  const canvas = useMemo(() => {
    console.log(sprite);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 2048;
    const context = canvas.getContext("2d");
    context.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    // context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = 4;
    context.strokeText(children, 1024, 1024 - 300 / 2);
    return canvas;
  }, [children, width, height]);
  return (
    <a.sprite ref={sprite} scale={[scale, scale, 1]}>
      <a.spriteMaterial attach="material" transparent opacity={opacity}>
        <canvasTexture
          attach="map"
          image={canvas}
          premultiplyAlpha
          onUpdate={s => (s.needsUpdate = true)}
        />
      </a.spriteMaterial>
    </a.sprite>
  );
}

export default Text;
