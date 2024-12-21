
const CustomToast = () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "16px",
        borderRadius: "12px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: "bold",
      }}
    >
      <img
        src="../public/giphy.gif"
        alt="Success"
        style={{ marginBottom: "10px", borderRadius: "50%" }}
      />
    </div>
  );


export default CustomToast
