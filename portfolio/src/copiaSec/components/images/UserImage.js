import imagePath from "./yo.png";

const UserImage = ({styles}) => {
  return (
    <>
      <img src={imagePath} style={ styles } />
    </>
  )
}

export default UserImage;
