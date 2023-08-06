interface NotFoundProps {
  className: string;
  text: string;
}
const NotFound = ({ className, text }: NotFoundProps) => {
  if (!text) return null;
  return <li className={className}>{text}</li>;
};

export default NotFound;
