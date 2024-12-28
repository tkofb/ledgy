import { NavLink } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";
import FAQ from "../../components/FAQ/FAQ";
import { Footer } from "../../components/Footer/Footer";

import {
  AcademicCapIcon,
  BeakerIcon,
  NewspaperIcon,
} from "@heroicons/react/24/solid";
import "./Home.css";

import robinhoodLogo from "../../assets/robinhood_icon.svg";
import charlesSchwabLogo from "../../assets/charlesSchwabLogo.svg";
import vanguardLogo from "../../assets/vanguard.svg";

import firstHeroPicture from "../../assets/financial_success_enhanced.png";
import secondHeroPicture from "../../assets/to_the_moon_enhanced.png";

const firstHeroMessage =
  "Join our interactive platform where learning about the stock market becomes \
   an exciting adventure. Whether you're a beginner or a seasoned trader, our \
   gamified approach offers engaging simulations, competitive challenges, and \
   rewarding achievements. Sharpen your trading skills, make informed decisions, \
   and climb the leaderboards. Start your journey to financial literacy and market \
   mastery today!";
const secondHeroMessage =
  "Seamlessly integrate your existing trading accounts to get real-time data, \
  personalized insights, and an enhanced trading experience.";

const firstFeatureCardMessage = "share and collaborate with others";
const secondFeatureCardMessage = "learn more about the stock market";
const thirdFeatureCardMessage = "track your investments and earn points";

export const Home = () => {
  return (
    <main className="home">
      <Navbar></Navbar>

      <div className="hero container-xl">
        <div className="leftSide">
          <h1 className="bold">
            take a <span className="highlight">leap.</span>
          </h1>
          <p className="firstText">{firstHeroMessage}</p>

          <div className="loginAndCreate">
            <NavLink
              to={"/login"}
              type="button"
              className="btn btn-primary btn-lg loginHero"
            >
              LOGIN
            </NavLink>
            <NavLink
              to={"/createAccount"}
              type="button"
              className="btn btn-primary btn-lg getStartedHero"
            >
              GET STARTED
            </NavLink>
          </div>
        </div>

        <div className="firstHeroPhoto">
          <img
            className="firstImage"
            src={firstHeroPicture}
            alt="to the moon picture"
          />
        </div>
      </div>

      <div id="features" className="features">
        <h1 className="bold featureText">features.</h1>
        <div className="featureCards">
          <FeatureCard
            message={firstFeatureCardMessage}
            icon={<AcademicCapIcon className="featureCard image" />}
          />
          <FeatureCard
            message={secondFeatureCardMessage}
            icon={<BeakerIcon className="featureCard image" />}
          />
          <FeatureCard
            message={thirdFeatureCardMessage}
            icon={<NewspaperIcon className="featureCard image" />}
          />
        </div>
      </div>

      <div id="benefits" className="hero container-xl">
        <div className="leftSide">
          <div className="topLeft">
            <h1 className="bold">how it works.</h1>
            <p className="firstText">{secondHeroMessage}</p>
          </div>

          <div className="bottomLeft">
            <h3 className="bold">supported platforms.</h3>
            <div className="logos">
              <div className="robinhoodHolder">
                <img
                  className="robinhoodLogo"
                  src={robinhoodLogo}
                  alt="robinhood logo"
                />
              </div>
              <div className="charlesSchwabHolder">
                <img
                  className="charlesSchwabLogo"
                  src={charlesSchwabLogo}
                  alt="robinhood logo"
                />
              </div>
              <div className="vanguardHolder">
                <img
                  className="vanguardLogo"
                  src={vanguardLogo}
                  alt="robinhood logo"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="secondHeroPhoto">
          <img
            className="secondImage"
            src={secondHeroPicture}
            alt="financial success picture"
          />
        </div>
      </div>

      <div id="faq" className="container my-5">
        <h1 className="faqText bold">FAQ.</h1>
        <div className="accordion" id="accordionExample">
          <FAQ
            title="Is my trading data secure?"
            message="Your data is encrypted and stored securely on our servers.
            We prioritize user privacy and do not share your data with third parties."
          ></FAQ>
          <FAQ
            title="What happens to my data if I stop using the journal?"
            message="You can download all your data before closing your account to
            ensure you retain your trade history."
          ></FAQ>
          <FAQ
            title="Is the trading journal free to use?"
            message="The platform offers a free tier with essential features, and premium 
            plans are available for users who need advanced tools and analytics."
          ></FAQ>
          <FAQ
            title="Can I manually enter trades into the journal?"
            message="Yes, you can manually input trades, including details like entry/exit 
            points, trade size, and additional notes."
          ></FAQ>
          <FAQ
            title="Is this platform suitable for beginners or experienced traders?"
            message="The platform is designed for both beginners and experienced traders, 
            offering basic trade logging for newcomers and advanced analytics for seasoned users."
          ></FAQ>
        </div>
      </div>
      <Footer></Footer>
    </main>
  );
};

export default Home;
