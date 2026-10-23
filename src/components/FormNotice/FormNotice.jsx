import { Icon } from '@iconify/react/offline';
import circleAlertIcon from '@iconify-icons/lucide/circle-alert';
import circleCheckIcon from '@iconify-icons/lucide/circle-check';
import './FormNotice.scss';

export default function FormNotice({ children, success = false }) {
  if (!children) return null;
  return (
    <div
      className={`form-notice${success ? ' form-notice--success' : ''}`}
      role={success ? 'status' : 'alert'}
    >
      <Icon
        icon={success ? circleCheckIcon : circleAlertIcon}
        aria-hidden="true"
      />
      <div>{children}</div>
    </div>
  );
}
