import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

const CustomBox = styled(Box)({
  position: "relative",
  '& input[type="text"]': {
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
  },
  "& textarea": {
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "10px",
    width: "100%",
  },
  "& input": {
    paddingBottom: "10px",
  },
});
const ImageBox = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "100px",
  justifyContent: "center",
  gap: "20px",
  "& .container": {
    width: "250px",
    height: "250px",
    borderRadius: "10px",
    border: "1px solid lightgray",
    padding: "10px",
    "& img": {
      width: "100%",
      height: "160px",
    },
  },
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageData, setImageData] = useState([]);
  const [imgs, setImgs] = useState({});
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const fetchImage = async () => {
    try {
      const { data } = await axios.get("/fetch-upload");
      setImageData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/upload/" + id);
      fetchImage();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchImage();
  }, []);

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", imgs as any);
    formData.append("author", author);
    formData.append("description", description);
    try {
      await axios.post("/upload-data", formData);
      fetchImage();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ cursor: "pointer", position: "absolute", right: 50, top: 50 }}
      >
        Upload Image
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CustomBox sx={style}>
          <CloseIcon
            style={{
              position: "absolute",
              right: 20,
              top: 20,
              cursor: "pointer",
            }}
            onClick={handleClose}
          />
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Upload Image
            </Typography>
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => e?.target?.files && setImgs(e.target.files[0])}
            />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Author Name
          </Typography>
          <input
            type="text"
            name=""
            id=""
            placeholder="Author name"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Description
          </Typography>
          <textarea
            rows={5}
            name=""
            id=""
            placeholder="Write Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            onClick={() => uploadImage()}
            variant="contained"
            style={{ cursor: "pointer" }}
          >
            Submit
          </Button>
        </CustomBox>
      </Modal>
      <ImageBox>
        {imageData.map((ele: any) => {
          return (
            <Box className="container">
              <img src={ele?.image} alt={ele.author} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "230px" }}>
                  <p>Author Name:- {ele.author}</p>
                  <p>Description:- {ele.description}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <DeleteIcon
                    onClick={() => handleDelete(ele?.id)}
                    style={{ color: "#ff0000", cursor: "pointer" }}
                  />
                </div>
              </Box>
            </Box>
          );
        })}
      </ImageBox>
    </div>
  );
}

export default App;
