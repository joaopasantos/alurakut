import React from 'react';
import nookies from 'nookies';

export default function LogoutPage() {
  return (
    <p>Fazendo logout...</p>
  );
}

export async function getServerSideProps(context) {
  nookies.destroy(context, 'USER_TOKEN');

  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
