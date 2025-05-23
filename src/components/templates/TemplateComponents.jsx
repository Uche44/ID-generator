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
  signaturePreview,
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
            className="photo"
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
        <div className="m-back-view back-view">
          <BackView signaturePreview={signaturePreview} />
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
      {!backView && (
        <div className="corporate-template front">
          <img
            src="/images/logo.png"
            alt=""
            className="logo"
          />
          <img
            className="photo"
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
        <div className="c-back-view back-view">
          <BackView signaturePreview={signaturePreview} />
        </div>
      )}
    </div>
  );
};

// template

export const TemplateThree = ({
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
      {!backView && (
        <div className="template-three front">
          <img
            src="/images/logo.png"
            alt=""
            className="logo"
          />
          <img
            className="photo"
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
        <div className="three-back-view back-view">
          <BackView signaturePreview={signaturePreview} />
        </div>
      )}
    </div>
  );
};

// fourth template
export const TemplateFour = ({
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
      {!backView && (
        <div className="template-four front">
          <img
            src="/images/logo.png"
            alt=""
            className="logo"
          />
          <img
            className="photo"
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
        <div className="four-back-view back-view">
          <BackView signaturePreview={signaturePreview} />
        </div>
      )}
    </div>
  );
};
