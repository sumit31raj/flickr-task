interface ButtonProps {
  title: string;
  onClick?: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => (
  <button
    className="btn btn-primary custom-search-button"
    onClick={onClick}
  >
    {title}
  </button>
)

export default Button;
