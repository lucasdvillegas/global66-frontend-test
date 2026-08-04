<template>
  <div class="column items-center">
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="77.5" cy="77.5" r="75.5" fill="white" stroke="#333333" stroke-width="4" />

      <!-- Máscara y semicírculo superior rojo -->
      <mask
        id="mask0_9_835"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="155"
        height="78"
      >
        <rect width="155" height="77.5" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0_9_835)">
        <circle cx="77.5" cy="77.5" r="75.5" fill="#F22539" stroke="#333333" stroke-width="4" />
      </g>

      <path d="M0.574066 77.5H154.426" stroke="#333333" stroke-width="4" />

      <circle cx="77.5" cy="77.5" r="30.4259" fill="white" />

      <circle cx="77.5" cy="77.5" r="28.4259" stroke="#333333" stroke-width="4" />

      <path
        d="M134.135 53.6759C127.129 37.0413 113.008 24.1388 95.5833 18.7791"
        stroke="white"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <circle
        class="pulse-circle"
        cx="77.5"
        cy="77.5"
        r="15.6481"
        stroke="#808080"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<style scoped>
.pulse-circle {
  animation: pulseColor 1s ease-in-out infinite;
  transform-origin: center;
}

@keyframes pulseColor {
  0% {
    fill: #ffffff;
    stroke: #808080;
  }
  50% {
    fill: #f22539;
    stroke: #808080;
  }
  100% {
    fill: #ffffff;
    stroke: #808080;
  }
}
</style>
