import React from 'react';

interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => (
  loading ? <h5>Loading!!!!</h5> : <></>
)

export default Loader;
