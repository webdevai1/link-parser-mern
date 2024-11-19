import { Box } from '@mui/material';
import { LinkCard } from 'components';
import { AuthContext } from 'context';
import { useHttp, useNotification } from 'hooks';
import { useCallback, useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from 'layouts';

export const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const showNotification = useNotification();
  const { request } = useHttp();
  const [link, setLink] = useState();
  const { id: linkId } = useParams();

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, 'GET', null, {
        authorization: `Bearer ${token}`,
      });
      setLink(data);
    } catch (error) {
      showNotification(error);
    }
  }, [linkId, request, showNotification, token]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  return (
    <MainLayout loading={link ? false : true}>
      {link && (
        <Box mx={2} pt={10} display="flex" justifyContent="center">
          {link ? <LinkCard link={link} /> : null}
        </Box>
      )}
    </MainLayout>
  );
};
