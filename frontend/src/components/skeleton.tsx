import '../styles/blog.css';

interface SkeletonProps {
  height?: number;
  width?: string;
}

export default function Skeleton({
  height = 16,
  width = '100%',
}: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{ height, width }}
    />
  );
}
