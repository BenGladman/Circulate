<script>
  export let x;
  export let y;
  export let r;
  export let hue;
  export let lightness;
  export let alpha;
</script>

<circle cx={x} cy={y} {r} fill="hsla({hue}, 100%, {lightness}%, {alpha})" stroke="hsla({hue},
  50%, 20%, {alpha}" stroke-width="0.003" />
