import React, { useState } from "react";
import AppBar from "../../components/AppBar";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchBooks } from "../../queries";
import AddIcon from "@mui/icons-material/Add";
import { pink } from "@mui/material/colors";

interface Book {
  title?: string;
  author_name?: string[];
  cover_i?: number;
}

interface props {
  mode: boolean;
  setMode: () => void;
}

const BookSearch = ({ mode, setMode }: props) => {
  const [searchInput, setSearchInput] = useState<string>("");
  // const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const { mutate, data, isLoading, isError, isSuccess } = useSearchBooks();

  const handleAdd = () => {
    setIsAdd(prev => !prev)
  }

  const searchBooks = async () => {
    try {
      await mutate(searchInput);
      console.log(data);
      // setSearchResults(data);
      // setSearchResults(await data?.docs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-10">
      <AppBar mode={mode} setMode={setMode} title={"Add Book"} />
      <div className="flex items-center justify-center space-x-2 w-full py-10 px-20">
        <TextField
          type="text"
          id="searchInput"
          placeholder="Enter book title"
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />

        <Button onClick={searchBooks}>Search</Button>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        {isLoading && <CircularProgress />}
        {isError && (
          <Alert severity="error" sx={{ width: "75%" }}>
            Error while fetching books!
          </Alert>
        )}
        {isSuccess && (
          <>
            {typeof data === "undefined" ? (
              <p>Check your internet connection please</p>
            ) : data?.docs.length === 0 ? (
              <p>No results found.</p>
            ) : (
              <>
                <div className="pl-24 flex flex-col justify-between w-full items-center">
                  <Grid
                    container
                    rowSpacing={4}
                    columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 5 }}
                    gap={4}
                  >
                    {data?.docs.map((book: Book, index: number) => (
                      // <div key={index} className="book">
                      <div
                        key={index}
                        className="max-w-sm w-[250px] h-[350px] shadow-lg rounded-lg overflow-hidden border-2"
                      >
                        <div className="h-[240px] flex items-center justify-center">
                          {book.cover_i ? (
                            <img
                              className="w-full h-full object-cover"
                              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                              alt={`${book.title} cover`}
                            />
                          ) : (
                            <p>{book.title}</p>
                          )}
                        </div>
                        <div className="flex flex-col h-[80px] justify-between px-2 py-2">
                          <div className="font-bold text-base flex justify-between">
                            {book.title?.slice(0, 50)}
                            <Avatar
                              onClick={handleAdd}
                              sx={{ bgcolor: pink[600] }}
                            >
                              <AddIcon />
                            </Avatar>
                          </div>
                          <p className="text-gray-600 text-xs">
                            {book.author_name
                              ? book.author_name?.slice(0, 1)
                              : "Author not found"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Grid>
                </div>
                <Modal
  open={isAdd}
  onClose={handleAdd}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
</Modal>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookSearch;
