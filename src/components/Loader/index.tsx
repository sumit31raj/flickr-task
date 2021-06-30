interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => (
  loading ? <div className="spinner-grow text-primary" role="status"></div> : <></>
);

export default Loader;
