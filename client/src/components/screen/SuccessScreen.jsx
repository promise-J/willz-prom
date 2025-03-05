import React, { useEffect, useState } from 'react';

const SuccessScreen = () => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress over time (e.g., 3 seconds)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsComplete(true); // Mark as complete when progress reaches 100%
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30); // Update progress every 30ms

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.circleContainer}>
        <svg
          width="150"
          height="150"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle for background */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#e6e6e6"
            strokeWidth="10"
            fill="none"
          />
          {/* Circle for progress */}
          <circle
            cx="60"
            cy="60"
            r="50"
            stroke="#4caf50"
            strokeWidth="10"
            fill="none"
            strokeDasharray="314" // Circumference of the circle
            strokeDashoffset={314 - (314 * progress) / 100} // Adjust the stroke offset based on progress
            transform="rotate(-90 60 60)" // Rotate to start from top
            style={{ transition: 'stroke-dashoffset 0.3s ease' }}
          />
        </svg>
        {isComplete && (
          <div style={styles.checkmarkContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="#4caf50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
      <div style={styles.message}>Success!</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  circleContainer: {
    position: 'relative',
    marginBottom: '20px',
  },
  checkmarkContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  message: {
    fontSize: '24px',
    color: '#4caf50',
  },
};

export default SuccessScreen;
