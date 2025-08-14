import { useEffect, useState } from 'react';
import '../styles/ErrorMessage.css';

function ErrorMessage({ message }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  if (!isVisible) return null;

  return (
    <div className="error">
      Error: {message}
    </div>
  );
}

export default ErrorMessage;