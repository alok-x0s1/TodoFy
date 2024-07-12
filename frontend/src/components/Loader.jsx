import "../App.css"

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="loader">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
    </div>
  );
};

export default Loader;