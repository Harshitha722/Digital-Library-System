import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../assets/css/BookDetails.css";

const EBookDetails = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);

  useEffect(() => {
    const fetchEBook = async () => {
      try {
        const res = await API.get(`/ebooks/${id}`);
        setEbook(res.data);
      } catch (error) {
        console.error("Error fetching e-book:", error);
      }
    };
    fetchEBook();
  }, [id]);

  if (!ebook) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <div className="book-details">
          <h2>{ebook.title}</h2>

          <p>
            <strong>Author:</strong> {ebook.author}
          </p>

          <p>
            <strong>Category:</strong> {ebook.category?.categoryName || "N/A"}
          </p>

          <p>
            <strong>Description:</strong> {ebook.description || "N/A"}
          </p>

          <p>
            <strong>Uploaded By:</strong> {ebook.uploadedBy?.name || ebook.uploadedBy?.email}
          </p>

          <div className="ebook-viewer">
            <iframe
              src={`http://localhost:5000/${ebook.pdfFile}`}
              title={ebook.title}
              width="100%"
              height="700px"
            />
          </div>

          <button
            className="download-btn"
            onClick={async () => {
              try {
                const response = await API.get(`/ebooks/download/${ebook._id}`, {
                  responseType: "blob"
                });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `${ebook.title}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
              } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || "Failed to download e-book");
              }
            }}
          >
            Download PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default EBookDetails;
