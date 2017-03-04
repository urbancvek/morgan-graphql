import gql from 'graphql-tag';

const morganGraphql = (req) => {
  const { query } = req.body;
  if (!query) return '\n';
  try {
    const ast = gql`${query}`;
    if (!ast) return '\n';

    const queries = ast.definitions[0].selectionSet.selections.map(sel => ({
      name: sel.name.value,
      args: sel.arguments.map(arg => ({
        name: arg.name.value,
        value: arg.value.value,
      })),
    }));

    let text = '\n';

    queries.forEach(({ name, args }) => {
      text += `\t${name}`;
      if (args.length === 0) return text += '\n';
      text += ' (';

      args.forEach((arg, i) => {
        if (i !== 0) text += ', ';
        text += `${arg.name}: ${arg.value}`;
      });

      return text += ')\n';
    });

    return text;
  } catch (error) {
    return '\n';
  }
};

export default morganGraphql;
