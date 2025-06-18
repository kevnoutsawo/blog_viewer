import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post Detail</h1>
      <p>Post ID: {id}</p>
      {/* Post details will go here */}
    </div>
  );
};

export default PostDetailPage;
