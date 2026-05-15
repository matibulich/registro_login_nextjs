
export function FormError({ message }: { message?: string[] }) {
    if(!message) return null;
  return message.map((msj, index) => (
    <div key={index} className="text-pink-400  italic text-sm">
      {msj}
    </div>
  ));   
}