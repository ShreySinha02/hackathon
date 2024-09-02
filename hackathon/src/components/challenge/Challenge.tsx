import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Button, Box } from '@mui/material';

// Define the type for challenge props
interface ChallengeProps {
  challenge: {
    startDate: string;
    endDate: string;
    name: string;
    image: string;
  };
}

const Challenge: React.FC<ChallengeProps> = ({ challenge }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  // Function to determine the status and countdown
  const calculateStatusAndCountdown = () => {
    const now = new Date();
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);

    if (now < start) {
      setStatus('Upcoming');
      setTimeRemaining(getCountdown(start));
    } else if (now >= start && now <= end) {
      setStatus('Active');
      setTimeRemaining(getCountdown(end));
    } else {
      setStatus('Past');
      setTimeRemaining('Challenge ended');
    }
  };

  // Function to calculate the countdown timer
  const getCountdown = (targetDate: Date) => {
    const now = new Date();
    const timeDifference = targetDate.getTime() - now.getTime();

    if (timeDifference <= 0) return '00d : 00h : 00m : 00s';

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  };

  // Update countdown every second
  useEffect(() => {
    calculateStatusAndCountdown();
    const interval = setInterval(calculateStatusAndCountdown, 1000);

    return () => clearInterval(interval);
  }, [challenge.startDate, challenge.endDate]);

  return (
    <Card sx={{ maxWidth: 345, height: 380, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3 }}>
      <CardActionArea sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia component="img" height="140" image={challenge.image} alt={challenge.name || 'Challenge Image'} sx={{ width: '100%', objectFit: 'cover' }} />
        <CardContent className="space-y-2" sx={{ textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {challenge.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: status === 'Active' ? '#388e3c' : status === 'Upcoming' ? '#1976d2' : '#d32f2f',
              backgroundColor: status === 'Active' ? '#e8f5e9' : status === 'Upcoming' ? '#e3f2fd' : '#ffebee',
              padding: '4px 8px',
              borderRadius: '8px',
              fontWeight: 'medium',
              marginBottom: 2,
            }}
          >
            {status} - {timeRemaining}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button variant="contained" color="primary" size="medium" sx={{ textTransform: 'none', width: '80%', position: 'relative', marginTop: 'auto' }}>
            Participate Now
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Challenge;
