import ArrowBack from './ArrowBack';
import ArrowForward from './ArrowForward';
import HeartUnfilled from './HeatUnfilled';
import HeartFilled from './HeartFilled';

import { wrapIcons } from './wrapper';

const wrappedIcons = wrapIcons([
  ArrowBack,
  ArrowForward,
  HeartUnfilled,
  HeartFilled,
]);

export default wrappedIcons;
