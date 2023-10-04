import RequestLayout from "../RequestLayout"
import ContentProfile from "./Content_Profile/content-profile"

const Profile = () => {
    const profile = true;

    return (
        <RequestLayout profile={profile}>
            {() => (
                <ContentProfile />
            )}
        </RequestLayout>
    )
}

export default Profile