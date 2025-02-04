import ArrowBackIcon from './ArrowBack';
import ArrowForwardIcon from './ArrowForward';
import HeartUnfilledIcon from './HeatUnfilled';
import HeartFilledIcon from './HeartFilled';
import FilterIcon from './Filter';

import { withIconWrapper } from './wrapper';

const icons = {
  ArrowBack: withIconWrapper(ArrowBackIcon),
  ArrowForward: withIconWrapper(ArrowForwardIcon),
  HeartUnfilled: withIconWrapper(HeartUnfilledIcon),
  HeartFilled: withIconWrapper(HeartFilledIcon),
  Filter: withIconWrapper(FilterIcon),
};

export default icons;
