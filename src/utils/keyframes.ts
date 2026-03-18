import { css } from "lit";

export const mushroomKeyframes = css`
  /* ALERT – blink makes any icon blink, ping makes its schadow blink */
  @keyframes blink {
    100% { opacity: 0; }
  }
  @keyframes ping {
    0%   { box-shadow: 0 0 0 0 var(--tile-color-rgba07); }
    100% { box-shadow: 0 0 5px 7px transparent; }
  }

  /* BATTERY CHARGING ANIMATION – use with mdi:battery-high */
  @keyframes charge {
    0%  { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 80%, 37% 80%, 37% 100%, 100% 100%, 100% 0%); }
    20% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 65%, 37% 64%, 37% 100%, 100% 100%, 100% 0%); }
    40% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 45%, 37% 45%, 37% 100%, 100% 100%, 100% 0%); }
    60% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 28%, 37% 28%, 37% 100%, 100% 100%, 100% 0%); }
  }
  
  /* SCREEN FLICKER EFFECT - use with :before-element and content:""; - adjust width, height and margin to your needs */
  @keyframes flicker { 
    0% { background: linear-gradient(180deg, rgba(166, 40, 235, 0.3) 0%, transparent 30%, transparent 100%); }
    25% { background: linear-gradient(180deg, transparent 0%, rgba(166, 40, 235, 0.3) 25%, transparent 55%, transparent 100%); }
    50% { background: linear-gradient(180deg, transparent 0%, transparent 20%, rgba(166, 40, 235, 0.3) 50%, transparent 80%, transparent 100%); }
    75% { background: linear-gradient(180deg, transparent 0%, transparent 45%, rgba(166, 40, 235, 0.3) 75%, transparent 100%); }
    100% { background: linear-gradient(180deg, transparent 0%, transparent 70%, rgba(166, 40, 235, 0.3) 100%); }
  }
  
  /* HEATING RADIATOR - use with mdi:radiator */
  @keyframes heat {
   0% {clip-path: inset(50% 0 0 0); }
   95%, 100% { clip-path: inset(0 0 0 0); }
  }
  
  /* OPENING DOOR – use with mdi:door */
  @keyframes open {
    0%, 66% { transform: rotateY(0deg); }
    33%     { transform: rotateY(-120deg); }
  }

  /* SEND ANIMATION – use with mdi:access-point */
  @keyframes send {
    0%   { clip-path: circle(13% at 50% 50%); }
    100% { clip-path: circle(50% at 50% 50%); }
  }
  
  /* RED GLOW FROM INSIDE OUT - radialflow = red glow from center to border - glow = overflow of radialflow
  @keyframes radialflow {
    0%   { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)   0%, var(--tile-color-rgba0)  10% ); }
    5%   { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)   0%, var(--tile-color-rgba0)  20% ); }
    10%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)   0%, var(--tile-color-rgba0)  30% ); }
    15%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  10%, var(--tile-color-rgba0)  40% ); }
    20%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  20%, var(--tile-color-rgba0)  50% ); }
    25%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  25%, var(--tile-color-rgba0)  55% ); }
    30%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  30%, var(--tile-color-rgba0)  60% ); }
    35%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  35%, var(--tile-color-rgba0)  65% ); }
    40%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  40%, var(--tile-color-rgba0)  70% ); }
    45%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  45%, var(--tile-color-rgba0)  75% ); }
    50%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  50%, var(--tile-color-rgba0)  80% ); }
    55%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  55%, var(--tile-color-rgba0)  85% ); }
    60%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  60%, var(--tile-color-rgba0)  90% ); }
    65%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  65%, var(--tile-color-rgba0)  95% ); }
    70%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  70%, var(--tile-color-rgba0) 100% ); }                
    75%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  75%, var(--tile-color-rgba0) 100% ); }
    80%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  80%, var(--tile-color-rgba0) 100% ); }
    85%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  85%, var(--tile-color-rgba0) 100% ); }
    90%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  90%, var(--tile-color-rgba0) 100% ); }
    95%  { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  95%, var(--tile-color-rgba0) 100% ); }                 
    100% { background: radial-gradient(circle, rgba(255, 33, 33, 0.2)  99%, var(--tile-color-rgba0) 100% ); }
  }
  @keyframes glow {
    0%, 60%   { box-shadow: 0 0 0px 0px transparent; }
    70%       { box-shadow: 0 0 0px 0px rgba(255, 33, 33, 0.0); }
    75%       { box-shadow: 0 0 1px 1px rgba(255, 33, 33, 0.1); }
    80%       { box-shadow: 0 0 2px 2px rgba(255, 33, 33, 0.2); }
    85%       { box-shadow: 0 0 3px 3px rgba(255, 33, 33, 0.3); }
    90%, 100% { box-shadow: 0 0 4px 4px rgba(255, 33, 33, 0.4); }
  } 
  
  /* RINGING BELL – use with mdi:bell-ring */
  @keyframes ring {
    0% { transform: rotate(0); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    2% { transform: rotate(30deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    6% { transform: rotate(-28deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    10% { transform: rotate(34deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    14% { transform: rotate(-32deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    18% { transform: rotate(30deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    22% { transform: rotate(-28deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    26% { transform: rotate(26deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    30% { transform: rotate(-24deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    34% { transform: rotate(22deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    38% { transform: rotate(-20deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    42% { transform: rotate(18deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    46% { transform: rotate(-16deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    50% { transform: rotate(14deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    54% { transform: rotate(-12deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    58% { transform: rotate(10deg); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
    62% { transform: rotate(-8deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    66% { transform: rotate(6deg); }
    70% { transform: rotate(-4deg); }
    74% { transform: rotate(2deg); }
    78% { transform: rotate(-1deg); }
    82% { transform: rotate(1deg); }
    86% { transform: rotate(0); }
    100% { transform: rotate(0); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
  }
  
  /* ANIMATED VACUUM – use with mdi:robot-vacuum */
  @keyframes vacuum {
    0%          { transform: translate(0, 0) rotate(0); }
    5%, 7%      { transform: rotate(-40deg); }
    12%, 14%    { transform: rotate(40deg); }
    17%, 20%    { transform: translate(0%, 0%) rotate(0); }
    30%, 39.99% { transform: translate(0%, -125%); }
    40%         { transform: translate(0%, -125%) rotate(180deg); }
    50%         { transform: translate(0%, 0%) rotate(180deg); }
    55%, 57%    { transform: rotate(140deg); }
    62%, 64%    { transform: rotate(220deg); }
    67%, 70%    { transform: rotate(180deg); }
    80%, 89.99% { transform: translate(0%, 125%) rotate(180deg); }
    90%         { transform: translate(0%, 125%) rotate(0); }
    100%        { transform: translate(0%, 0%) rotate(0); }
  }

  /* ANIMATED CEILING FAN – WIND */
  @keyframes wind-forward {
    0%        { clip-path: polygon(0% 60%, 50% 73%, 100% 60%, 100% 0%, 0% 0%); }
    50%       { clip-path: inset(0 0% 30% 0); }
    95%, 100% { clip-path: inset(0 0 0 0); }
  }
  @keyframes wind-reverse {
    0%, 5%  { clip-path: inset(0% 0% 0% 0%); }
    50%     { clip-path: inset(0 0% 30% 0); }
    100%    { clip-path: polygon(0% 60%, 50% 73%, 100% 60%, 100% 0%, 0% 0%); }
  }

  /* ANIMATED CEILING FAN – ROTATION */
  @keyframes blade-rotation {
    0%  { transform: rotateY(0deg); }
    25% { transform: rotateY(-90deg); }
    50% { transform: rotateY(-180deg); }
    75% { transform: rotateY(-90deg); }
  }
`;
