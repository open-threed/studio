export default function getFunctionByName(text: string, func = 'main') {
  const lines = text.split('\n');
  let startIndex = -1;
  let endIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith(`function ${func}`)) {
      startIndex = i;
    }

    if (startIndex !== -1 && lines[i].trim() === '}') {
      endIndex = i;
      break;
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    const oneFuncCode = lines.slice(startIndex, endIndex + 1).join('\n');
    return oneFuncCode;
  } else {
    return null;
  }
}
