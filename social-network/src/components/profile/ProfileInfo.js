const ProfileInfo = props => {
  return (
    <div className="profileInfo">
      <h1 className="profileTitle">{props.profileTitle}</h1>
      <img className="profileImage" src={props.profileImage} alt="profile user" />
      <div className="profileFollowers">
        <span className="profileFollowers text">Followers</span>
	<span className="profileFollowers number">{props.profileFollowers}</span>
      </div>
      <div className="profileFollowing">
        <span className="profileFollowing text">Following</span>
	<span className="profileFollowing number">{props.profileFollowing}</span>
      </div>
    </div>
  );
}

export default ProfileInfo;
