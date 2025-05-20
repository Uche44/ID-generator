const BackView = ({ signaturePreview }) => {
  return (
    <>
      <div className="header">
        <h3>Sarcastic Geeks Trybe</h3>
        <p>Membership Card</p>
      </div>
      <div className="back-details">
        <p>This card is property of Sarcastic Geeks Trybe</p>
        {/* <p>If found, please return to:</p>
        <p>123 Business Rd, City</p> */}
        <div className="signature-container ">
          {signaturePreview && (
            <img
              src={signaturePreview}
              alt="Signature"
            />
          )}
          <div className="signature-line"></div>
          <p>Authorized Signature</p>
        </div>
      </div>
    </>
  );
};

export default BackView;
