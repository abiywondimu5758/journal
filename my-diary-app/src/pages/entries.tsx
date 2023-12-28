// src/pages/Entries.tsx
import React from 'react';

import { Link } from 'react-router-dom';
import { useEntries } from '../queries';


interface User{
    first_name: string;
    last_name: string;
    username: string;
    email: string
}
interface props {
    id: number;
    title: string;
    content: string;
    categories: string[];
    tags: string[];
    privacy: string;
    user: User
}
const Entries: React.FC = () => {
  const { data: entries, isLoading, isError } = useEntries();

  if (isLoading) {
    return <div>Loading entries...</div>;
  }

  if (isError) {
    return <div>Error fetching entries</div>;
  }

  return (
    <div>
      <h2>Entries</h2>
      <ul>
        {entries?.map((entry:props) => (
          <li key={entry.id}><Link to={`/entries/${entry.id}`}>{entry.title} {entry.content} {entry.categories} {entry.tags} {entry.privacy} {entry.user.email}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default Entries;
