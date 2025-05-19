import "./homepage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <section className="hero">
      <img
        className="hero-img"
        src="/images/herocard.png"
      />
      <div className="hero-text-wrap">
        <h1 className="">Get an ID Card Instantly</h1>
        <p className="">
          Create a professional ID card in minutes with our easy-to-use online
          tool. No design skills required!
        </p>
        <Link to="/formpage">
          <button className="hero-btn">Create Now</button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
