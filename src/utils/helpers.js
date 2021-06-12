export function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  export const numberHandler = (number)=>{
      const str = number.toString()
      const result = `${str.slice(1,3)}-${str.slice(3,6)}-${str.slice(6,str.length)}`;
      return result
  }
  export const isNumberBetween = (val, min, max) => {
    return (val || val === 0) && Number(val) > min && Number(val) <= max;
}
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
export function dateStringify(t, a, s) {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);
  }
  return a.map(format).join(s);
}
export let defaultDateOption = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
