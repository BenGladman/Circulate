<script>
  import { onMount } from "svelte";
  import Circle from "./Circle.svelte";
  import { newCircle } from "./newCircle";
  import { calculateAlpha } from "./calculateAlpha";
  import { calculatePositionsAndSizes } from "./calculatePositionsAndSizes";
  import { calculateVelocities } from "./calculateVelocities";

  export let name;

  const numberOfCicles = 30;
  const tickConstant = 0.0001;

  let svg;
  let svgPoint;

  let centre = { x: 0, y: 0, r: 1 };

  onMount(() => {
    svgPoint = svg.createSVGPoint();
  });

  let circles = Array(numberOfCicles)
    .fill()
    .map(newCircle);

  let animateTime = performance.now();

  function animate(newAnimateTime) {
    const dt = (newAnimateTime - animateTime) * tickConstant;
    if (isNaN(dt)) {
      console.log(dt, newAnimateTime, animateTime, tickConstant);
    }
    animateTime = newAnimateTime;
    circles = calculateAlpha(circles, dt);
    circles = calculatePositionsAndSizes(circles, dt);
    circles = calculateVelocities(circles, centre, dt);
    circles = circles.sort(({ id: id1 }, { id: id2 }) => id1 - id2);
    requestAnimationFrame(animate);
  }

  animate(animateTime);

  function handleMousemove({ clientX, clientY, currentTarget }) {
    svgPoint.x = clientX;
    svgPoint.y = clientY;
    const loc = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    centre = { x: loc.x, y: loc.y, r: 30 };
  }

  function handleMouseleave() {
    centre = { x: 0, y: 0, r: 1 };
  }
</script>

<style>
  h1 {
    color: darkslateblue;
    position: absolute;
    top: 20px;
    left: 0;
    width: 100vw;
    margin: 0;
    text-align: center;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 20px;
    text-shadow: 0px 1px 2px black;
    pointer-events: none;
  }

  footer {
    color: slateblue;
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100vw;
    margin: 0;
    text-align: center;
    font-family: "Courier New", Courier, monospace;
    font-size: 8px;
    text-shadow: 0px 1px 2px black;
    pointer-events: none;
  }

  svg {
    background: black;
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<svg
  bind:this={svg}
  viewBox="-1 -1 2 2"
  xmlns="http://www.w3.org/2000/svg"
  on:mousemove={handleMousemove}
  on:mouseleave={handleMouseleave}>
  {#each circles as circle (circle.id)}
    <Circle {...circle} />
  {/each}
</svg>

<h1>CIRCULATE</h1>
<footer>Ben Gladman 2019</footer>
