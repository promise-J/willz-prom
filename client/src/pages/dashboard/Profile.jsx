import React from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";

const Profile = () => {
  const { userInfo } = useAuth();
  return <div>{userInfo?.userType == "vendor" && <VendorProfile />}</div>;
};

export default Profile;

function VendorProfile() {
  return (
    <Container>
      <h1>Manage Categories</h1>
    </Container>
  );
}
