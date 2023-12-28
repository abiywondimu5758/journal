import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getEntryById } from '../queries'; // Implement this function to fetch a single entry by id

// interface User {
//   first_name: string;
//   last_name: string;
//   username: string;
//   email: string;
// }

// interface EntryProps {
//   id: number;
//   title: string;
//   content: string;
//   categories: string[];
//   tags: string[];
//   privacy: string;
//   user: User;
// }

const EntryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const entryId = parseInt(id || '0', 10);

  const { data: entry, isLoading, isError } = useQuery(['entry', entryId], () => getEntryById(entryId));

  if (isLoading) {
    return <div>Loading entry details...</div>;
  }

  if (isError) {
    return <div>Error fetching entry details</div>;
  }

  return (
    <div>
      <h2>{entry?.title}</h2>
      <p>{entry?.content}</p>
      {/* Render other details as needed */}
    </div>
  );
};

export default EntryDetail;
