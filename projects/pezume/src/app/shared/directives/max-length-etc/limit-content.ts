const limitContent = (value: string, len: number) => {
    if (value.length > len) {
        return `${value.substr(0, len)}...`;
    }
    return value;
}
export default limitContent;