export const generateRandomEmoji = () => {
	const emojis = ['😎', '😁', '😆', '☺️', '🤑', '🤔', '🤠', '🫡', '😇', '😏', '🥳', '👻', '😘', '🥰'];
	const randomIndex = Math.floor(Math.random() * emojis.length);
	return emojis[randomIndex];
}