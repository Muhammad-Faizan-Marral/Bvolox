import PropTypes from 'prop-types';

export const OnlineBadge = ({ online }) => {
  if (!online) return null;
  
  return (
    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-900" />
  );
};

OnlineBadge.propTypes = {
  online: PropTypes.bool,
};

export default OnlineBadge;
