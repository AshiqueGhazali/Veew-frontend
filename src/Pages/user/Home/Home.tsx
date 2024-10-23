import UserNavbar from "../../../Components/user/UserNavbar/UserNavbar";
import "./Home.css";
import Banner from "../../../assets/hero-banner.jpg";

const Home = () => {
  return (
    <>
      <img src={Banner} alt="" className="hero-banner" />
      <UserNavbar />
      <div className="home-hero">
        <div className="hero-caption">
          <h1>
            Ready for Something New?
            <br />
            Start Searching!
          </h1>
          <p>Find the right plan to fuel your growth</p>
          <div className="hero-search-btn">
            <input type="text" className="search-input" placeholder="search..."/>
            <button className="btn search-btn">Search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
