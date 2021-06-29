interface LoaderProps {
  loading: boolean;
}

const Loader = ({ loading }: LoaderProps) => (
  loading
    ? <div>
      <img src="spinner.gif" className="spinner" alt="Loading" />
    </div>
    : <></>
)

export default Loader;
