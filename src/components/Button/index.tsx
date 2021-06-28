interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => (
  <button
    className="btn btn-primary my-2 my-sm-0"
    onClick={onClick}
  >
    {title}
  </button>
)

export default Button;
