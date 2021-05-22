// 2021-05-22T18:00:00.000Z -> 23.05.2021
export default function dateFormat(value) {
	if (!value) return "";
	value = value.toString();
	return new Date(Date.parse(value)).toLocaleDateString();
}
