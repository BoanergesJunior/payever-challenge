import { v4 as uuid } from 'uuid';

const getUnsignedInt32Ranged = () => {
  const id = uuid();
  const buffer = Buffer.from(id);
  return buffer.readUInt32BE(0);
};

export default function generateNumberId() {
  let newId = 0;

  do {
    newId = getUnsignedInt32Ranged();
  } while (newId > 2147483648);

  return newId;
}
