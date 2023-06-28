type getEditorLangProps = {
  name: string
}

const getEditorLang = ({ name }: getEditorLangProps): string => {
  const extension = name.slice(name.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return 'javascript';
    case "css":
      return 'css';
    case "json":
      return 'json';
    case "npmignore":
      return 'markdown';
    default:
      return 'markdown';
  }
};

export default getEditorLang
