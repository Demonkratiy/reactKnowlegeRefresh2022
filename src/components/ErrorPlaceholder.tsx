interface ErrorMessageProps {
  error: string;
}

export function ErrorPlaceholder({ error }: ErrorMessageProps) {
  return <p className='text-center text-red-700'>{error}</p>;
}
