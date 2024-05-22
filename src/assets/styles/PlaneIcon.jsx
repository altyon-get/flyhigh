const PlaneIcon = ({ color }) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(90deg)" }}
    >
      <path d="M10.18 9" />
      <path
        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
        fill={color}
      />
    </svg>
  );
  
  export default PlaneIcon;
  