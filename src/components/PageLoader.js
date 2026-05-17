const PageLoader = ({ chunkName = "page" }) => (
  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    gap: "16px",
    fontFamily: "sans-serif"
  }}>
    <div style={{
      width: "52px",
      height: "52px",
      border: "5px solid #e5e7eb",
      borderTop: "5px solid #4f46e5",
      borderRadius: "50%",
      animation: "spin 0.8s linear infinite"
    }} />
    <p style={{ color: "#6b7280", fontSize: "15px", margin: 0 }}>
      Loading{" "}
      <code style={{
        background: "#f3f4f6",
        padding: "2px 8px",
        borderRadius: "4px",
        color: "#4f46e5",
        fontWeight: "bold"
      }}>
        {chunkName}.chunk.js
      </code>
    </p>
    <p style={{ color: "#9ca3af", fontSize: "12px", margin: 0 }}>
      This chunk is downloaded only once, then cached.
    </p>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default PageLoader;
