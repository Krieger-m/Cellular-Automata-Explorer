
interface Props{
    height: number
}

export function Spacing({height}:Props) {
  return <div style={{ height: `${height}em`, width: '100%' }}></div>;
}
