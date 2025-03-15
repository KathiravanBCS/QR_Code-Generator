import { useState } from "react";
import "./QrCode.css"

export const QrCode = () => {
  const [img,setImg]=useState("");
  const [loading,setLoading]=useState(false)
  const [qrData,setQrData]=useState("https://example.com");
  const [qrSize,setQrSize]=useState("150");

  
  async function generateQr(){
      setLoading(true);
      try{
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
        setImg(url);
      }catch(error){
        console.error("Error Generating QR CODE",error);
      }finally{
        setLoading(false)
      }

  }
  function downloadQr(){
      fetch(img).then((Response)=>Response.blob().then((blob)=>{
        const link=document.createElement("a");
        link.href=URL.createObjectURL(blob);
        link.download="QrCode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })).catch((error)=>{
      console.error("Error in Downloaging Qr",error);
      
      });
  }
  return (
    <div className="app-container">
      <h1>QR CODE GENERATOR</h1>
     {loading && <p>Please Wait...</p>}
      {img && <img src={img}  className="qr-code-image" alt="" />}
      <div>
        <label htmlFor="dataInput" className="input-label">
          Data for Qr Code:
        </label>
        <input type="text" value={qrData} id="dataInput" placeholder="Enter Data for QrCode"  onChange={(e)=>setQrData(e.target.value)}/>
        <br />
        <label htmlFor="sizeInput" className="input-label">
          Image Size(e.g., 150)
        </label>
        <input type="text" value={qrSize} id="sizeInput" placeholder="Enter Image Size" onChange={(e)=>setQrSize(e.target.value)} />
        <button className="generate-button" disabled={loading} onClick={generateQr}>Genarete Qr Code</button>
        <button className="download-button" onClick={downloadQr }>Download Qr Code</button>
      </div>
      <p className="footer">Desined by <a href="https://kathiravanv-60035411614.development.catalystserverless.in/app/index.html">Kathiravan v</a></p>
    </div>
  );
};
