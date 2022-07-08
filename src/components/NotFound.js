import React from 'react';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '90vh',
      }}
    >
      <img
        src="../../assets/img/404.svg"
        alt="404"
        style={{
          width: '80vw',
          height: '80vh',
        }}
      />
    </div>
  );
}
