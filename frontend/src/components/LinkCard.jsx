import { Box, CardContent, Card, Typography } from '@mui/material';
import { format } from 'date-fns';

export const LinkCard = ({ link }) => {
  return (
    <Card>
      <CardContent>
        <Box>
          <Typography style={{ fontFamily: 'helvetica', fontSize: 18 }}>{link.title}</Typography>
          <p style={{ fontFamily: 'helvetica', fontSize: 18 }}>
            Link to:{' '}
            <a style={{ textDecoration: 'none' }} href={link.to} target="_blank" rel="noopener noreferrer">
              {link.to}{' '}
            </a>
          </p>
          <p style={{ fontFamily: 'helvetica', fontSize: 18 }}>
            Link from:{' '}
            <a style={{ textDecoration: 'none' }} href={link.from} target="_blank" rel="noopener noreferrer">
              {link.from}{' '}
            </a>
          </p>
          <p style={{ fontFamily: 'helvetica', fontSize: 18 }}>
            Clicks: <strong>{link.clicks}</strong>
          </p>
          <p style={{ fontFamily: 'helvetica', fontSize: 18 }}>
            Date of creation: <strong>{format(new Date(link.date), 'P')}</strong>
          </p>
        </Box>
      </CardContent>
    </Card>
  );
};
