interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => (
  loading
    ?
    <div className="spinner-grow spinner" role="status">
    </div>
    : <></>
)

export default Loader;
