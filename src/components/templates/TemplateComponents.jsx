// import { useEffect } from "react";
import "./templatecomponent.css";
import { useUserData } from "../../context/UserContext";
import { useTemplateContext } from "../../context/TemplateContext";
import { usePhotoUrl } from "../../hooks/usePhotoUrl";
import BackView from "./BackView";

export const MinimalTemplate = ({
  name,
  // photo,
  techStack,
  email,
  phone,
  group,
}) => {
  const { userData } = useUserData();
  const photoUrl = usePhotoUrl(userData.photo);
  const { backView } = useTemplateContext();

  return (
    <div className="template">
      {!backView && (
        <div className="minimal-template front">
          <img
            src="/images/logo.png"
            alt=""
            className="logo"
          />
          <img
            src={photoUrl}
            alt="User"
          />
          <h2>{name}</h2>
          <p className="niche">{techStack}</p>
          <div className="details">
            <div className="labels">
              <p>Email: </p>
              <p>Phone: </p>
              <p>Group: </p>
            </div>
            <div className="info">
              <p> {email}</p>
              <p> {phone}</p>
              <p> {group}</p>
            </div>
          </div>
        </div>
      )}
      {backView && (
        <div className="id-back">
          <BackView />
        </div>
      )}
    </div>
  );
};

// Another template
export const CorporateTemplate = ({
  name,
  // photo,
  techStack,
  email,
  phone,
  group,
  signaturePreview,
}) => {
  const { userData } = useUserData();
  const { backView } = useTemplateContext();
  const photoUrl = usePhotoUrl(userData.photo);

  return (
    <div className="template">
      {/* Front Side */}
      <div className="">
        <div className="photo-container">
          <img
            src={photoUrl}
            alt="User"
          />
        </div>
        <div className="details">
          <h2>{name}</h2>
          <p>Niche: {techStack}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Group: {group}</p>
        </div>
      </div>

      {/* Back Side */}
      {backView && (
        <div className="id-back">
          <BackView signaturePreview={signaturePreview} />
        </div>
      )}
    </div>
  );
};
