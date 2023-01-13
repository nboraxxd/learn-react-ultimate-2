import homepageVideo from '../../assets/video-homepage.mp4'

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video className="homepage-video" autoPlay muted loop>
        <source src={homepageVideo} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <h1 className="homepage-title">There's a better way to ask</h1>
        <p className="homepage-description">
          You don't want to make a boring form. And your audience won't answer one. Create a
          typeform instead—and make everyone happy.
        </p>
        <button className="homepage-button">Get started - it's free</button>
        <ul className="homepage-list">
          <li className="homepage-benefit">
            <p className="homepage-icon">✓</p>
            <p className="homepage-text">No credit card required</p>
          </li>
          <li className="homepage-benefit">
            <p className="homepage-icon">✓</p>
            <p className="homepage-text">No time limit on Free plan</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HomePage
