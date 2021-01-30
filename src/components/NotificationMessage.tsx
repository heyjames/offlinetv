import React from 'react';
import { Notification } from '../types';

export interface NotificationMessageProps {
  notification: Notification
}
 
const NotificationMessage: React.FC<NotificationMessageProps> = ({ notification }) => {
  const { level, message } = notification;
  
  let iconClass = "";
  let color = "";

  if (level === "moderate") {
    iconClass = "fas fa-exclamation-triangle";
    color = "yellow";
  }

  if (level === "high") {
    iconClass = "fas fa-exclamation-circle";
    color = "red";
  }

  return (
    <div className="message">
      <i
        style={{ color }}
        id="notification-icon"
        className={iconClass}
        title={message}
      ></i> {message}
    </div>
  );
}
 
export default NotificationMessage;