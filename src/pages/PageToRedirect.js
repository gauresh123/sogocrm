import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PageToRedirect = () => {
  const { shortLink } = useParams();
  const functionToRedirect = async () => {
    await window.location.assign(`https://api.gosol.ink/api/crm/shortlink/${shortLink}`);
  };
  useEffect(() => {
    //const shortId = shortLink?.replace(/[0-9]/g, '');
    //const orgId = shortLink?.replace(/[^0-9]/g, '');
    functionToRedirect();
  }, [shortLink]);
  return null;
};

export default PageToRedirect;
