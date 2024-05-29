export function prettyPrint(obj: object) {
    const prettyJson = JSON.stringify(obj, null, '\t');
    console.log(prettyJson);
}