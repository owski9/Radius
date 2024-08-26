document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('user-input');
    const output = document.getElementById('chat-output');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userMessage = input.value;
        output.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
        input.value = '';

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();
            output.innerHTML += `<div><strong>Assistant:</strong> ${data.response}</div>`;
            output.scrollTop = output.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
