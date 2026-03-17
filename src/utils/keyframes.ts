import { css } from "lit";

export const mushroomKeyframes = css`
  /* ALERT – makes any icon blink */
  @keyframes blink {
    100% { opacity: 0; }
  }

  /* ALERT – makes shadow of icon blink */
  @keyframes ping {
    0%   { box-shadow: 0 0 0 0 rgba(from var(--color) r g b / 0.7); }
    100% { box-shadow: 0 0 5px 7px transparent; }
  }

  /* BATTERY CHARGING ANIMATION – use with mdi:battery-high */
  @keyframes charge {
    0%  { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 80%, 37% 80%, 37% 100%, 100% 100%, 100% 0%); }
    20% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 65%, 37% 64%, 37% 100%, 100% 100%, 100% 0%); }
    40% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 45%, 37% 45%, 37% 100%, 100% 100%, 100% 0%); }
    60% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 28%, 37% 28%, 37% 100%, 100% 100%, 100% 0%); }
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

  /* ANIMATED VACUUM – use with mdi:vacuum-robot */
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
