const styles = ['%cMyExtension', 'color: white;background:#0401a4;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px']
export const printLine = (line) => {
  console.log(...styles, line);
};
