import {
  Activity,
  ArrowRight,
  BarChart3,
  CircleDot,
  Compass,
  MapPin,
  Menu,
  Search,
  Shield,
  Sparkles,
  Star,
  Trophy,
  X
} from 'lucide-react';

const withDefaults = (Icon) => {
  const Wrapped = ({ size = 16, strokeWidth = 1.75, className, ...props }) => (
    <Icon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    />
  );
  Wrapped.displayName = Icon.displayName || Icon.name;
  return Wrapped;
};

export const SparklesIcon = withDefaults(Sparkles);
export const CompassIcon = withDefaults(Compass);
export const TrophyIcon = withDefaults(Trophy);
export const ShieldIcon = withDefaults(Shield);
export const RadarIcon = withDefaults(Activity);
export const BarChartIcon = withDefaults(BarChart3);
export const SearchIcon = withDefaults(Search);
export const StarIcon = withDefaults(Star);
export const ArrowRightIcon = withDefaults(ArrowRight);
export const CircleDotIcon = withDefaults(CircleDot);
export const MapPinIcon = withDefaults(MapPin);
export const MenuIcon = withDefaults(Menu);
export const CloseIcon = withDefaults(X);
