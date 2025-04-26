interface FieldErrorProps {
  message?: string;
}
const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;
  return (
    <>
      <p className="text-red-500 text-sm mt-1 ml-2 animate-fadeIn">{message}</p>
    </>
  );
};

export default FieldError;
