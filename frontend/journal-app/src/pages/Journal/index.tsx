import Grid from "@mui/material/Grid";
import React, { useState } from "react";
// import { tw } from 'typewind';

import { useEntries, useDeleteEntry } from "../../queries";
import {
  Alert,
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
  const [isDelError,setIsDelError] = useState<boolean>(false);
  const [isSucError,setIsSucError] = useState<boolean>(false);

  const handleDelete = async (entryId: number) => {
    try {
      await (await deleteEntryMutation).mutateAsync(entryId).then(()=>{
        setIsSucError(true);

      });

      
    } catch (error) {
        setIsDelError(true);
        <Snackbar open={isDelError} autoHideDuration={6}>
        <Alert severity="error" sx={{ width: "100%" }}>
          Couldn't Delete Entry!
        </Alert>
      </Snackbar>
    }
  };

  if (isLoading) {
    return (
      <div className='flex flex-col items-center h-screen '>
        <CircularProgress size={30}/>
      </div>
    );
  }

  if (isError || !entries) {
    return (
        <>
        <div className='flex flex-col items-center h-screen '>
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
<div className='flex flex-col items-center h-screen '>
      <Grid
        container
        rowSpacing={4}
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}
      >
        {/* {entries.map((entry:props)=> <p>{entry.title}</p>)} */}
        {entries.map((entry: props) => (
            
          <Grid item xs={12} md={4} key={entry.id}>
            <Link to={`/entries/${entry.id}`}>
            <Card elevation={10}>
                <CardHeader action={
                    <IconButton onClick={()=>handleDelete(entry.id)}>
                        <DeleteOutline/>
                    </IconButton>
                }
                title={entry.title}
                subheader={entry.categories}
                />
                <CardContent>
                    <Typography variant="body2">
                        {entry.content}
                    </Typography>
                </CardContent>
            </Card>
            </Link>
          </Grid>
          
        ))}
      </Grid>
      <Snackbar open={isSucError} autoHideDuration={6000} onClose={()=>setIsSucError(false)}>
      <Alert severity="success" sx={{ width: "100%" }}>
         successfully deleted!
      </Alert>
    </Snackbar>
      </div>
    </>
  );
};

export default JournalContent;
