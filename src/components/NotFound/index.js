import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login')
  }, [])

  return (
    <div className="Register-header">
     <b> P A G E - N O T F O U N D </b>
    </div>
  );
}

export default NotFound;