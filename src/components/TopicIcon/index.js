import React from 'react';
import ICONS from './icons';

/**
 * A small, original line-icon per topic/course id. No external icon
 * library and no Salesforce marks — just simple shapes (see icons.js).
 * Falls back to a plain dot if an id has no icon registered.
 *
 * @param {{id: string, size?: number, className?: string}} props
 */
export default function TopicIcon({id, size = 24, className}) {
  const paths = ICONS[id];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true">
      {paths ?? <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />}
    </svg>
  );
}
