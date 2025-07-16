import { FC } from 'react';

interface UiSkeletonProps {
   width?: string;
   height?: string;
   className?: string;
   borderRadius?: string;
}

export const UiSkeleton: FC<UiSkeletonProps> = ({
      width = '100%',
      height = '20px',
      className = '',
      borderRadius = '4px',
   }) => {
   return (
      <div
         className={`animate-pulse bg-gray-300 inline-flex ${className}`}
         style={{
            width,
            height,
            borderRadius,
         }}
      />
   );
};