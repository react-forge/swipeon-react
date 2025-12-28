import { ActressProfile } from "./actress";
import './app.css';

export const Profile = ({ profile }: { profile: ActressProfile }) => {
  return (
    <div className="tinder-card" style={{ backgroundImage: `url(${profile.image})` }}>
      <div className="card-overlay">
        <div className="profile-info">
          <h2>{profile.name} <span className="age">{profile.age}</span></h2>
          <div className="gender">
            <span className="gender-icon">♀</span>
            <span>{profile.gender}</span>
          </div>
        </div>
      </div>
    </div>
  );
};