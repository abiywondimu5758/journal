import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

// import { tw } from 'typewind';

import { useEntries, useDeleteEntry } from "../../queries";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Divider } from "antd";

interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}
interface props {
  id: number;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  privacy: string;
  user: User;
}

const JournalContent = () => {
  const { data: entries, isLoading, isError } = useEntries();
  const deleteEntryMutation = useDeleteEntry();
  const [isDelError, setIsDelError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const parser = new DOMParser();

  const handleDelete = async (entryId: number) => {
    try {
      await (await deleteEntryMutation).mutateAsync(entryId).then(() => {
        setIsSuccess(true);
      });
    } catch (error) {
      setIsDelError(true);
      <Snackbar open={isDelError} autoHideDuration={6}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Couldn't Delete Entry!
        </Alert>
      </Snackbar>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center h-screen ">
        <CircularProgress size={30} />
      </div>
    );
  }

  if (isError || !entries) {
    return (
      <>
        <div className="flex flex-col items-center h-screen ">
          <Alert severity="error" sx={{ width: "100%" }}>
            Couldn't load Entries!
          </Alert>
        </div>
        <Snackbar open={isError} autoHideDuration={60}>
          <Alert severity="error" sx={{ width: "100%" }}>
            Couldn't load Entries!
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center h-screen ">
        <div className="w-full flex items-center justify-between">
        <Typography variant="h4">
            Journals
        </Typography>
        <Link to={'/createEntries'}><Avatar><AddIcon/></Avatar></Link>
        </div>
        <Divider/>
        <Grid
          container
          rowSpacing={4}
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        >
          {/* {entries.map((entry:props)=> <p>{entry.title}</p>)} */}
          {entries.map((entry: props) => (
            <Grid item xs={12} md={4} key={entry.id}>
              
                <Card elevation={10}>
                  <CardHeader
                    action={
                      <IconButton onClick={() => handleDelete(entry.id)}>
                        <DeleteOutline />
                      </IconButton>
                    }
                    title={entry.title}
                    subheader={entry.categories}
                  />
                  <Link to={`/entries/${entry.id}`}>
                  <CardContent>
                    <Typography variant="body2">
                      {(() => {
                        const doc = parser.parseFromString(
                          entry.content,
                          "text/html"
                        );
                        const textContent = doc.body.textContent || "";
                        const words = textContent.split(" ");

                        if (words.length <= 30) {
                          return textContent;
                        } else {
                          const trimmedContent =
                            words.slice(0, 30).join(" ") + "...";
                          return trimmedContent;
                        }
                      })()}
                    </Typography>
                  </CardContent>
                  </Link>
                </Card>
              
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={isSuccess}
          autoHideDuration={6000}
          onClose={() => setIsSuccess(false)}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            successfully deleted!
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default JournalContent;
