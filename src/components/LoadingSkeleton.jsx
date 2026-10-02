// placeholder with the same layout as ProductCard  (this is for bonous section )
function LoadingSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-box skeleton-image"></div>
      <div className="skeleton-box skeleton-line"></div>
      <div className="skeleton-box skeleton-line short"></div>
      <div className="skeleton-box skeleton-button"></div>
    </div>
  );
}

export default LoadingSkeleton;